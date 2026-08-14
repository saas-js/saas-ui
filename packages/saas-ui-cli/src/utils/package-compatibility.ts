import fg from 'fast-glob'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { version as presetVersion } from '../../../saas-ui-chakra-preset/package.json'
import { version as reactVersion } from '../../../saas-ui-react/package.json'

/**
 * The preset is bundled into the CLI compatibility policy at build time. This
 * follows the workspace manifest after Changesets versions both packages, so a
 * release cannot silently install the preset version from the previous train.
 */
export const SUPPORTED_PRESET_VERSION = presetVersion

export interface SupportedPrereleasePolicy {
  channel: string
  minimum: string
}

export interface SupportedPackagePolicy {
  package: string
  /** Canonical specifier emitted for a clean install. */
  specifier: string
  major: number
  minimum: readonly [number, number, number]
  prerelease?: SupportedPrereleasePolicy
}

export const SUPPORTED_PACKAGE_POLICIES = {
  '@chakra-ui/react': {
    package: '@chakra-ui/react',
    specifier: '^3.28.0',
    major: 3,
    minimum: [3, 28, 0],
  },
  '@emotion/react': {
    package: '@emotion/react',
    specifier: '^11.0.0',
    major: 11,
    minimum: [11, 0, 0],
  },
  '@saas-ui/chakra-preset': {
    package: '@saas-ui/chakra-preset',
    // Pin the concrete workspace version so clean installs do not depend on a
    // moving dist-tag. When v3 becomes stable, only this canonical specifier
    // needs to move to ^3.0.0; supported stable v3 declarations already
    // validate.
    specifier: SUPPORTED_PRESET_VERSION,
    major: 3,
    minimum: [3, 0, 0],
    prerelease: {
      channel: 'rc',
      minimum: SUPPORTED_PRESET_VERSION,
    },
  },
  '@saas-ui/react': {
    package: '@saas-ui/react',
    specifier: reactVersion,
    major: 3,
    minimum: [3, 0, 0],
    prerelease: {
      channel: 'rc',
      minimum: reactVersion,
    },
  },
  'next-themes': {
    package: 'next-themes',
    specifier: '^0.4.6',
    major: 0,
    minimum: [0, 4, 6],
  },
} as const satisfies Record<string, SupportedPackagePolicy>

export type SupportedPackageName = keyof typeof SUPPORTED_PACKAGE_POLICIES

export const INIT_RUNTIME_PACKAGES = [
  '@chakra-ui/react',
  '@emotion/react',
  '@saas-ui/chakra-preset',
] as const satisfies readonly SupportedPackageName[]

export const COLOR_MODE_PACKAGE = 'next-themes' as const

export interface PackageCompatibilityContext {
  /** Project directory used to resolve workspace protocol declarations. */
  cwd?: string
}

export function supportedPackageDeclaration(name: SupportedPackageName) {
  const policy = SUPPORTED_PACKAGE_POLICIES[name]
  return `${name}@${policy.specifier}`
}

export function getSupportedPackagePolicy(name: string) {
  return Object.hasOwn(SUPPORTED_PACKAGE_POLICIES, name)
    ? SUPPORTED_PACKAGE_POLICIES[name as SupportedPackageName]
    : undefined
}

type VersionCore = readonly [number, number, number]

interface Version {
  core: VersionCore
  prerelease: readonly string[]
}

function version(value: string): Version | null {
  const match =
    /^(\d+)(?:\.(\d+|x|\*))?(?:\.(\d+|x|\*))?(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(
      value,
    )
  if (!match) return null
  return {
    core: [
      Number(match[1]),
      match[2] && !['x', '*'].includes(match[2]) ? Number(match[2]) : 0,
      match[3] && !['x', '*'].includes(match[3]) ? Number(match[3]) : 0,
    ],
    prerelease: match[4]?.split('.') ?? [],
  }
}

function compareCore(left: VersionCore, right: VersionCore) {
  for (let index = 0; index < left.length; index++) {
    const difference = left[index]! - right[index]!
    if (difference) return difference
  }
  return 0
}

function compareIdentifiers(left: string, right: string) {
  const leftNumber = /^\d+$/.test(left) ? Number(left) : null
  const rightNumber = /^\d+$/.test(right) ? Number(right) : null
  if (leftNumber !== null && rightNumber !== null)
    return leftNumber - rightNumber
  if (leftNumber !== null) return -1
  if (rightNumber !== null) return 1
  return left.localeCompare(right)
}

function compareVersion(left: Version, right: Version) {
  const core = compareCore(left.core, right.core)
  if (core) return core
  if (!left.prerelease.length && !right.prerelease.length) return 0
  if (!left.prerelease.length) return 1
  if (!right.prerelease.length) return -1
  const length = Math.max(left.prerelease.length, right.prerelease.length)
  for (let index = 0; index < length; index++) {
    if (left.prerelease[index] === undefined) return -1
    if (right.prerelease[index] === undefined) return 1
    const difference = compareIdentifiers(
      left.prerelease[index]!,
      right.prerelease[index]!,
    )
    if (difference) return difference
  }
  return 0
}

function seriesUpper(policy: SupportedPackagePolicy): VersionCore {
  if (policy.major === 0) {
    return [0, policy.minimum[1] + 1, 0]
  }
  return [policy.major + 1, 0, 0]
}

function prereleaseFitsPolicy(parsed: Version, policy: SupportedPackagePolicy) {
  if (!parsed.prerelease.length) return true
  const prerelease = policy.prerelease
  if (!prerelease || parsed.prerelease[0] !== prerelease.channel) return false
  const minimum = version(prerelease.minimum)
  return !!minimum && compareVersion(parsed, minimum) >= 0
}

function versionFitsPolicy(parsed: Version, policy: SupportedPackagePolicy) {
  if (parsed.core[0] !== policy.major) return false
  if (compareCore(parsed.core, seriesUpper(policy)) >= 0) return false
  if (parsed.prerelease.length) return prereleaseFitsPolicy(parsed, policy)
  return compareCore(parsed.core, policy.minimum) >= 0
}

function intervalFitsPolicy(
  lower: Version,
  upper: Version,
  policy: SupportedPackagePolicy,
) {
  const supportedUpper = seriesUpper(policy)
  return (
    versionFitsPolicy(lower, policy) &&
    !upper.prerelease.length &&
    compareCore(upper.core, supportedUpper) <= 0 &&
    compareVersion(upper, lower) > 0 &&
    compareCore(lower.core, supportedUpper) < 0
  )
}

function workspacePatterns(root: string) {
  const pnpmWorkspace = path.join(root, 'pnpm-workspace.yaml')
  if (existsSync(pnpmWorkspace)) {
    const lines = readFileSync(pnpmWorkspace, 'utf8').split(/\r?\n/)
    const start = lines.findIndex((line) => /^packages:\s*$/.test(line))
    if (start !== -1) {
      const patterns: string[] = []
      for (const line of lines.slice(start + 1)) {
        if (/^\S/.test(line)) break
        const entry = /^\s+-\s+(.+?)\s*$/.exec(line)?.[1]
        if (entry) patterns.push(entry.replace(/^['"]|['"]$/g, ''))
      }
      return patterns
    }
  }

  const packagePath = path.join(root, 'package.json')
  if (!existsSync(packagePath)) return []
  const manifest = JSON.parse(readFileSync(packagePath, 'utf8')) as {
    workspaces?: string[] | { packages?: string[] }
  }
  return Array.isArray(manifest.workspaces)
    ? manifest.workspaces
    : (manifest.workspaces?.packages ?? [])
}

function findWorkspaceRoot(cwd: string) {
  let current = path.resolve(cwd)
  for (;;) {
    if (
      existsSync(path.join(current, 'pnpm-workspace.yaml')) ||
      workspacePatterns(current).length
    ) {
      return current
    }
    const parent = path.dirname(current)
    if (parent === current) return null
    current = parent
  }
}

export function resolveWorkspacePackageVersion(
  cwd: string,
  packageName: string,
) {
  const root = findWorkspaceRoot(cwd)
  if (!root) return null
  const patterns = workspacePatterns(root)
  for (const pattern of patterns) {
    const unsigned = pattern.startsWith('!') ? pattern.slice(1) : pattern
    if (path.isAbsolute(unsigned) || unsigned.split(/[\\/]/).includes('..')) {
      throw new Error(
        `Workspace pattern "${pattern}" escapes the workspace root at ${root}.`,
      )
    }
  }
  const manifests = [
    'package.json',
    ...fg.sync(
      patterns.map((pattern) => `${pattern.replace(/\/$/, '')}/package.json`),
      {
        absolute: true,
        cwd: root,
        ignore: ['**/node_modules/**'],
        onlyFiles: true,
        unique: true,
      },
    ),
  ].map((manifest) =>
    path.isAbsolute(manifest) ? manifest : path.join(root, manifest),
  )
  const packages = manifests.flatMap((manifestPath) => {
    if (!existsSync(manifestPath)) return []
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      name?: unknown
      version?: unknown
    }
    return manifest.name === packageName && typeof manifest.version === 'string'
      ? [{ manifestPath, version: manifest.version }]
      : []
  })
  if (packages.length > 1) {
    throw new Error(
      `Workspace package "${packageName}" is declared by multiple manifests: ${packages.map((entry) => entry.manifestPath).join(', ')}.`,
    )
  }
  return packages[0]?.version ?? null
}

function resolveWorkspaceSpecifier(
  packageName: string,
  specifier: string,
  context: PackageCompatibilityContext,
) {
  if (!specifier.startsWith('workspace:')) return { specifier }
  if (!context.cwd) {
    return {
      issue: `Workspace specifier "${specifier}" for "${packageName}" cannot be validated without a project directory.`,
    }
  }
  const localVersion = resolveWorkspacePackageVersion(context.cwd, packageName)
  if (!localVersion) {
    return {
      issue: `Workspace specifier "${specifier}" for "${packageName}" does not resolve to a local workspace package.`,
    }
  }
  const selector = specifier.slice('workspace:'.length)
  if (
    !['*', '^', '~'].includes(selector) &&
    !specifierAcceptsVersion(selector, localVersion)
  ) {
    return {
      issue: `Workspace specifier "${specifier}" for "${packageName}" does not accept local version "${localVersion}".`,
    }
  }
  return { specifier: localVersion }
}

function specifierAcceptsVersion(specifier: string, candidate: string) {
  const parsedCandidate = version(candidate)
  if (!parsedCandidate) return false
  const operator =
    specifier[0] === '^' || specifier[0] === '~' ? specifier[0] : undefined
  const raw = operator ? specifier.slice(1) : specifier
  const base = version(raw)
  if (!base) return false
  if (!operator) return compareVersion(parsedCandidate, base) === 0

  // Semver ranges do not opt into arbitrary prereleases. A prerelease
  // candidate must be named by the selector on the same release tuple.
  if (
    parsedCandidate.prerelease.length &&
    (!base.prerelease.length ||
      compareCore(parsedCandidate.core, base.core) !== 0)
  ) {
    return false
  }
  let upper: Version
  if (operator === '~') {
    const segments = raw.replace(/-(.*)$/, '').split('.')
    upper = {
      core:
        segments.length === 1
          ? [base.core[0] + 1, 0, 0]
          : [base.core[0], base.core[1] + 1, 0],
      prerelease: [],
    }
  } else if (base.core[0] > 0) {
    upper = { core: [base.core[0] + 1, 0, 0], prerelease: [] }
  } else if (base.core[1] > 0) {
    upper = { core: [0, base.core[1] + 1, 0], prerelease: [] }
  } else {
    upper = { core: [0, 0, base.core[2] + 1], prerelease: [] }
  }
  return (
    compareVersion(parsedCandidate, base) >= 0 &&
    compareVersion(parsedCandidate, upper) < 0
  )
}

/**
 * Conservative manifest compatibility check. It recognizes exact, major/x,
 * caret, tilde, and bounded comparator ranges. Tags and unbounded ranges are
 * rejected because they cannot prove the supported release series. A
 * prerelease is accepted only when the package policy names that channel.
 */
export function isSupportedPackageSpecifier(
  policy: SupportedPackagePolicy,
  input: string,
): boolean {
  const specifier = input.trim()
  if (!specifier || ['*', 'latest', 'next', '^', '~'].includes(specifier)) {
    return false
  }
  if (specifier.startsWith('workspace:')) return false
  if (specifier.includes('||')) {
    return specifier
      .split('||')
      .every((part) => isSupportedPackageSpecifier(policy, part))
  }

  const comparator = /^>=(\d+(?:\.\d+){0,2})\s+<(\d+(?:\.\d+){0,2})$/.exec(
    specifier,
  )
  if (comparator) {
    const lower = version(comparator[1]!)
    const upper = version(comparator[2]!)
    return !!lower && !!upper && intervalFitsPolicy(lower, upper, policy)
  }

  const operator =
    specifier[0] === '^' || specifier[0] === '~' ? specifier[0] : undefined
  const raw = operator ? specifier.slice(1) : specifier
  const parsed = version(raw)
  if (!parsed || parsed.core[0] !== policy.major) return false

  const hasWildcard = /(?:^|\.)(?:x|\*)$/i.test(raw)
  const segments = raw.replace(/-(.*)$/, '').split('.')
  if (!operator && !hasWildcard && segments.length === 3) {
    return versionFitsPolicy(parsed, policy)
  }

  if (parsed.prerelease.length && !prereleaseFitsPolicy(parsed, policy)) {
    return false
  }
  let upper: Version
  if (operator === '^' && policy.major === 0 && segments.length < 2) {
    return false
  }
  if (!operator) {
    upper = {
      core:
        segments.length === 1 || ['x', '*'].includes(segments[1] ?? '')
          ? [parsed.core[0] + 1, 0, 0]
          : [parsed.core[0], parsed.core[1] + 1, 0],
      prerelease: [],
    }
  } else if (operator === '~' && segments.length === 1) {
    upper = { core: [parsed.core[0] + 1, 0, 0], prerelease: [] }
  } else if (operator === '~' || (policy.major === 0 && operator === '^')) {
    upper = {
      core: [parsed.core[0], parsed.core[1] + 1, 0],
      prerelease: [],
    }
  } else {
    upper = { core: seriesUpper(policy), prerelease: [] }
  }
  return intervalFitsPolicy(parsed, upper, policy)
}

export function normalizeSupportedPackageDeclaration(
  declaration: string,
  context: PackageCompatibilityContext = {},
) {
  const scopeSeparator = declaration.indexOf('/')
  const separator =
    declaration.startsWith('@') && scopeSeparator !== -1
      ? declaration.indexOf('@', scopeSeparator + 1)
      : declaration.startsWith('@')
        ? -1
        : declaration.indexOf('@')
  const name = separator === -1 ? declaration : declaration.slice(0, separator)
  const policy = getSupportedPackagePolicy(name)
  if (!policy) return declaration
  const specifier =
    separator === -1 ? undefined : declaration.slice(separator + 1)
  if (
    specifier !== undefined &&
    packageCompatibilityIssue(name, specifier, context)
  ) {
    return declaration
  }
  return `${name}@${policy.specifier}`
}

export function packageCompatibilityIssue(
  name: string,
  specifier: string,
  context: PackageCompatibilityContext = {},
) {
  const policy = getSupportedPackagePolicy(name)
  if (!policy) return null
  const resolved = resolveWorkspaceSpecifier(name, specifier.trim(), context)
  if (resolved.issue) return resolved.issue
  if (isSupportedPackageSpecifier(policy, resolved.specifier!)) return null
  return `Package "${name}" declares incompatible specifier "${specifier}"; Saas UI requires ${name}@${policy.specifier}.`
}
