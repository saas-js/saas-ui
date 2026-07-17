import { promises as fs } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

export interface EffectivePathMapping {
  targets: string[]
  sourcePath: string
}

export interface EffectiveTsConfig {
  configPath: string
  document: Record<string, unknown>
  baseUrl: string
  hasExplicitBaseUrl: boolean
  paths: Record<string, EffectivePathMapping>
}

interface LoadedConfig extends EffectiveTsConfig {
  inheritedConflicts: Map<string, Set<string>>
}

export async function loadEffectiveTsConfig(
  cwd: string,
  configName: 'tsconfig.json' | 'jsconfig.json',
): Promise<EffectiveTsConfig> {
  const configPath = path.resolve(cwd, configName)
  const loaded = await loadConfigFile(configPath, [], true)

  if (loaded.inheritedConflicts.size) {
    const conflicts = [...loaded.inheritedConflicts.keys()].sort().join(', ')
    throw new Error(
      `Conflicting inherited path mappings for ${conflicts} in ` +
        `${configName}; define an authoritative mapping in ${configName} ` +
        'before running init.',
    )
  }

  return loaded
}

async function loadConfigFile(
  configPath: string,
  ancestry: string[],
  allowMissing = false,
): Promise<LoadedConfig> {
  const normalizedPath = path.resolve(configPath)
  if (ancestry.includes(normalizedPath)) {
    throw new Error(
      'Circular TypeScript config extends chain: ' +
        [...ancestry, normalizedPath].join(' -> '),
    )
  }

  const source = await fs.readFile(normalizedPath, 'utf8').catch((error) => {
    if (
      allowMissing &&
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return null
    }
    throw error
  })
  if (source === null) {
    return {
      configPath: normalizedPath,
      document: {},
      baseUrl: path.dirname(normalizedPath),
      hasExplicitBaseUrl: false,
      paths: {},
      inheritedConflicts: new Map(),
    }
  }

  let document: Record<string, unknown>
  try {
    document = parseJsonConfig(source)
  } catch {
    throw new Error(
      `Unable to inspect ${normalizedPath}. Every config in the extends ` +
        'chain must contain valid JSON with comments and trailing commas allowed.',
    )
  }

  const extendsEntries = parseExtends(document['extends'], normalizedPath)
  const parents = await Promise.all(
    extendsEntries.map(async (entry) =>
      loadConfigFile(
        await resolveExtendsPath(entry, normalizedPath),
        [...ancestry, normalizedPath],
      ),
    ),
  )

  const inheritedPaths: Record<string, EffectivePathMapping> = {}
  const inheritedConflicts = new Map<string, Set<string>>()
  let inheritedBaseUrl: string | undefined
  let inheritedExplicitBaseUrl = false

  for (const parent of parents) {
    if (parent.hasExplicitBaseUrl) {
      inheritedBaseUrl = parent.baseUrl
      inheritedExplicitBaseUrl = true
    }
    for (const [pattern, variants] of parent.inheritedConflicts) {
      const conflict = inheritedConflicts.get(pattern) ?? new Set<string>()
      variants.forEach((variant) => conflict.add(variant))
      inheritedConflicts.set(pattern, conflict)
    }
    for (const [pattern, mapping] of Object.entries(parent.paths)) {
      const current = inheritedPaths[pattern]
      if (current && !sameTargets(current.targets, mapping.targets)) {
        const conflict = inheritedConflicts.get(pattern) ?? new Set<string>()
        conflict.add(current.targets.join('\u0000'))
        conflict.add(mapping.targets.join('\u0000'))
        inheritedConflicts.set(pattern, conflict)
      }
      inheritedPaths[pattern] = mapping
    }
  }

  const compilerOptions = parseCompilerOptions(
    document['compilerOptions'],
    normalizedPath,
  )
  const localBaseUrl = compilerOptions['baseUrl']
  if (localBaseUrl !== undefined && typeof localBaseUrl !== 'string') {
    throw new Error(
      `Invalid compilerOptions.baseUrl in ${normalizedPath}; expected a ` +
        'non-empty string.',
    )
  }
  if (localBaseUrl === '') {
    throw new Error(
      `Invalid compilerOptions.baseUrl in ${normalizedPath}; expected a ` +
        'non-empty string.',
    )
  }
  const baseUrl =
    typeof localBaseUrl === 'string'
      ? path.resolve(path.dirname(normalizedPath), localBaseUrl)
      : (inheritedBaseUrl ?? path.dirname(normalizedPath))

  const localPaths = parsePaths(
    compilerOptions['paths'],
    normalizedPath,
    baseUrl,
  )
  for (const [pattern, mapping] of Object.entries(localPaths)) {
    inheritedPaths[pattern] = mapping
    inheritedConflicts.delete(pattern)
  }

  return {
    configPath: normalizedPath,
    document,
    baseUrl,
    hasExplicitBaseUrl:
      typeof localBaseUrl === 'string' || inheritedExplicitBaseUrl,
    paths: inheritedPaths,
    inheritedConflicts,
  }
}

function parseExtends(value: unknown, configPath: string): string[] {
  if (value === undefined) return []
  const entries = typeof value === 'string' ? [value] : value
  if (
    !Array.isArray(entries) ||
    entries.length === 0 ||
    entries.some((entry) => typeof entry !== 'string' || entry.length === 0)
  ) {
    throw new Error(
      `Invalid extends declaration in ${configPath}; expected a string or ` +
        'non-empty string array.',
    )
  }
  return entries
}

async function resolveExtendsPath(specifier: string, ownerPath: string) {
  const ownerDirectory = path.dirname(ownerPath)
  if (specifier.startsWith('.') || path.isAbsolute(specifier)) {
    const base = path.resolve(ownerDirectory, specifier)
    for (const candidate of [
      base,
      `${base}.json`,
      path.join(base, 'tsconfig.json'),
    ]) {
      try {
        const stat = await fs.stat(candidate)
        if (stat.isFile()) return candidate
      } catch {
        // Try the next TypeScript-compatible config filename.
      }
    }
    throw new Error(
      `Unable to resolve extended config "${specifier}" from ${ownerPath}.`,
    )
  }

  try {
    const require = createRequire(ownerPath)
    const packageName = getPackageName(specifier)
    const packageSubpath = specifier
      .slice(packageName.length)
      .replace(/^\//, '')
    const packageDirectory = await findPackageDirectory(
      path.dirname(ownerPath),
      packageName,
    )
    if (packageSubpath) {
      if (packageDirectory) {
        const base = path.resolve(packageDirectory, packageSubpath)
        for (const candidate of [base, `${base}.json`]) {
          try {
            if ((await fs.stat(candidate)).isFile()) return candidate
          } catch {
            // Fall through to Node package resolution.
          }
        }
      }
      for (const candidate of [specifier, `${specifier}.json`]) {
        try {
          const resolved = require.resolve(candidate)
          if (path.extname(resolved) === '.json') return resolved
        } catch {
          // Try the next package subpath form.
        }
      }
    } else {
      const packageJsonPath = packageDirectory
        ? path.join(packageDirectory, 'package.json')
        : require.resolve(`${packageName}/package.json`)
      const packageJson = JSON.parse(
        await fs.readFile(packageJsonPath, 'utf8'),
      ) as Record<string, unknown>
      const tsconfig = packageJson['tsconfig']
      if (tsconfig !== undefined && typeof tsconfig !== 'string') {
        throw new Error(
          `Invalid tsconfig field in ${packageJsonPath}; expected a string.`,
        )
      }
      const candidate = path.resolve(
        path.dirname(packageJsonPath),
        typeof tsconfig === 'string' ? tsconfig : 'tsconfig.json',
      )
      if ((await fs.stat(candidate)).isFile()) return candidate
    }
    throw new Error('No package tsconfig entry found.')
  } catch {
    throw new Error(
      `Unable to resolve extended config "${specifier}" from ${ownerPath}.`,
    )
  }
}

function getPackageName(specifier: string) {
  if (!specifier.startsWith('@')) return specifier.split('/')[0]!
  return specifier.split('/').slice(0, 2).join('/')
}

async function findPackageDirectory(start: string, packageName: string) {
  let directory = path.resolve(start)
  while (true) {
    const candidate = path.join(directory, 'node_modules', packageName)
    try {
      if ((await fs.stat(path.join(candidate, 'package.json'))).isFile()) {
        return candidate
      }
    } catch {
      // Continue toward the filesystem root.
    }
    const parent = path.dirname(directory)
    if (parent === directory) return null
    directory = parent
  }
}

function parseCompilerOptions(value: unknown, configPath: string) {
  if (value === undefined) return {} as Record<string, unknown>
  if (!isRecord(value)) {
    throw new Error(
      `Invalid compilerOptions in ${configPath}; expected an object.`,
    )
  }
  return value
}

function parsePaths(value: unknown, configPath: string, baseUrl: string) {
  if (value === undefined) return {} as Record<string, EffectivePathMapping>
  if (!isRecord(value)) {
    throw new Error(
      `Invalid compilerOptions.paths in ${configPath}; expected an object.`,
    )
  }

  const result: Record<string, EffectivePathMapping> = {}
  for (const [pattern, targets] of Object.entries(value)) {
    if (
      !pattern ||
      countWildcards(pattern) > 1 ||
      !Array.isArray(targets) ||
      targets.length === 0 ||
      targets.some(
        (target) =>
          typeof target !== 'string' ||
          target.length === 0 ||
          countWildcards(target) > 1,
      )
    ) {
      throw new Error(
        `Existing mapping for "${pattern}" in ${configPath} is not a ` +
          'non-empty string array; refusing to replace it.',
      )
    }
    result[pattern] = {
      targets: targets.map((target) => path.resolve(baseUrl, target)),
      sourcePath: configPath,
    }
  }
  return result
}

function countWildcards(value: string) {
  return [...value].filter((character) => character === '*').length
}

export function serializePathTarget(baseUrl: string, absoluteTarget: string) {
  const relative = path
    .relative(baseUrl, absoluteTarget)
    .replaceAll(path.sep, '/')
  if (!relative) return './'
  return relative.startsWith('.') ? relative : `./${relative}`
}

export function resolveEffectiveAlias(
  alias: string,
  config: Pick<EffectiveTsConfig, 'paths'>,
): string | null {
  const candidates = Object.entries(config.paths)
    .map(([pattern, mapping]) => {
      const wildcard = pattern.indexOf('*')
      if (wildcard === -1) {
        return alias === pattern
          ? {
              pattern,
              mapping,
              substitution: '',
              score: pattern.length + 10_000,
            }
          : null
      }
      const prefix = pattern.slice(0, wildcard)
      const suffix = pattern.slice(wildcard + 1)
      if (!alias.startsWith(prefix) || !alias.endsWith(suffix)) return null
      return {
        pattern,
        mapping,
        substitution: alias.slice(prefix.length, alias.length - suffix.length),
        score: prefix.length + suffix.length,
      }
    })
    .filter(
      (candidate): candidate is NonNullable<typeof candidate> => !!candidate,
    )
    .sort(
      (left, right) =>
        right.score - left.score || left.pattern.localeCompare(right.pattern),
    )

  const candidate = candidates[0]
  const target = candidate?.mapping.targets[0]
  if (!candidate || !target) return null
  return path.resolve(target.replace('*', candidate.substitution))
}

function sameTargets(left: readonly string[], right: readonly string[]) {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function parseJsonConfig(source: string): Record<string, unknown> {
  const withoutComments = stripJsonComments(source.replace(/^\uFEFF/, ''))
  const withoutTrailingCommas = stripTrailingCommas(withoutComments)
  const parsed = JSON.parse(withoutTrailingCommas) as unknown
  if (!isRecord(parsed)) throw new Error('Expected a JSON object.')
  return parsed
}

function stripJsonComments(source: string) {
  let result = ''
  let inString = false
  let escaped = false

  for (let index = 0; index < source.length; index++) {
    const character = source[index]!
    const next = source[index + 1]
    if (inString) {
      result += character
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === '"') inString = false
      continue
    }
    if (character === '"') {
      inString = true
      result += character
      continue
    }
    if (character === '/' && next === '/') {
      result += '  '
      index += 2
      while (index < source.length && source[index] !== '\n') {
        result += ' '
        index++
      }
      if (source[index] === '\n') result += '\n'
      continue
    }
    if (character === '/' && next === '*') {
      result += '  '
      index += 2
      while (
        index < source.length &&
        !(source[index] === '*' && source[index + 1] === '/')
      ) {
        result += source[index] === '\n' ? '\n' : ' '
        index++
      }
      if (index < source.length) {
        result += '  '
        index++
      }
      continue
    }
    result += character
  }
  return result
}

function stripTrailingCommas(source: string) {
  let result = ''
  let inString = false
  let escaped = false
  for (let index = 0; index < source.length; index++) {
    const character = source[index]!
    if (inString) {
      result += character
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === '"') inString = false
      continue
    }
    if (character === '"') {
      inString = true
      result += character
      continue
    }
    if (character === ',') {
      let next = index + 1
      while (next < source.length && /\s/.test(source[next]!)) next++
      if (source[next] === '}' || source[next] === ']') continue
    }
    result += character
  }
  return result
}
