import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const LEGACY_PACKAGES = ['@saas-ui/core'] as const

export type LegacyPackage = (typeof LEGACY_PACKAGES)[number]

export interface LegacyCheckScope {
  /** Stable label used in diagnostics. */
  name: string
  /** Repository-relative directory to inspect. */
  root: string
  /** Missing optional scopes are skipped; every other read failure is fatal. */
  optional?: boolean
  /** Installable modes exclude tests, stories, and examples by convention. */
  mode?: 'tree' | 'installable-tree' | 'pro-installable'
}

export interface LegacyCheckAllowlistEntry {
  /** Repository-relative file path. */
  path: string
  package: LegacyPackage
  reason: string
}

export interface LegacyReference {
  column: number
  line: number
  package: LegacyPackage
  path: string
  scope: string
  specifier: string
}

export interface LegacyCheckResult {
  files: number
  references: LegacyReference[]
  scopes: string[]
  skippedScopes: string[]
}

export interface LegacyCheckOptions {
  allowlist?: readonly LegacyCheckAllowlistEntry[]
  repositoryRoot?: string
  scopes?: readonly LegacyCheckScope[]
}

/**
 * These are deliberately migrated islands. Website and compositions joined
 * only after their Phase 8 write migrations and zero-reference audits.
 */
export const migratedLegacyCheckScopes: readonly LegacyCheckScope[] = [
  {
    name: 'public-registry-templates',
    root: 'apps/website/registry/default',
    mode: 'installable-tree',
  },
  { name: 'website', root: 'apps/website' },
  { name: 'compositions', root: 'apps/compositions' },
  { name: 'forms', root: 'packages/saas-ui-forms', optional: true },
  { name: 'modals', root: 'packages/saas-ui-modals', optional: true },
  {
    name: 'assets',
    root: 'packages/saas-ui-assets',
    mode: 'installable-tree',
  },
  {
    name: 'auth-provider',
    root: 'packages/saas-ui-auth-provider',
    optional: true,
    mode: 'installable-tree',
  },
  {
    name: 'chakra-preset',
    root: 'packages/saas-ui-chakra-preset',
    mode: 'installable-tree',
  },
  {
    name: 'cli',
    root: 'packages/saas-ui-cli',
    mode: 'installable-tree',
  },
  {
    name: 'hooks',
    root: 'packages/saas-ui-hooks',
    mode: 'installable-tree',
  },
  {
    name: 'modals-provider',
    root: 'packages/saas-ui-modals-provider',
    optional: true,
    mode: 'installable-tree',
  },
  {
    name: 'panda-preset',
    root: 'packages/saas-ui-panda-preset',
    mode: 'installable-tree',
  },
  {
    name: 'registry-compiler',
    root: 'packages/saas-ui-registry',
    mode: 'installable-tree',
  },
  {
    name: 'supabase',
    root: 'packages/saas-ui-supabase',
    optional: true,
    mode: 'installable-tree',
  },
  {
    name: 'tailwind-preset',
    root: 'packages/saas-ui-tailwind-preset',
    mode: 'installable-tree',
  },
  { name: 'test-utils', root: 'tooling/test-utils' },
  { name: 'next-workspaces', root: 'tooling/next-workspaces' },
  { name: 'storybook-addon', root: 'tooling/storybook-addon' },
  { name: 'storybook-package', root: 'packages/storybook' },
  { name: 'palette', root: 'apps/palette' },
  { name: 'panda-testing', root: 'apps/panda-testing' },
  { name: 'example-react-router', root: 'examples/react-router' },
  { name: 'example-remix', root: 'examples/remix-ts', optional: true },
  { name: 'example-tsrouter', root: 'examples/tsrouter' },
  { name: 'example-next-pages', root: 'examples/next-pages' },
  { name: 'example-next-app', root: 'examples/next-app' },
  { name: 'example-tanstack', root: 'examples/tanstack' },
]

/**
 * Exceptions must name one file and one legacy package. Keep this empty unless
 * a migrated runtime path has a time-bounded, reviewed compatibility need.
 * Migration fixtures and historical changelogs belong outside enforced input,
 * not in this allowlist.
 */
export const migratedLegacyCheckAllowlist: readonly LegacyCheckAllowlistEntry[] =
  [
    {
      path: 'packages/saas-ui-registry/src/compiler/validate.ts',
      package: '@saas-ui/core',
      reason:
        'The compiler rejects this retired package in installable templates.',
    },
  ]

const SOURCE_EXTENSIONS = new Set([
  '.cjs',
  '.cts',
  '.js',
  '.json',
  '.jsonc',
  '.jsx',
  '.mjs',
  '.mdx',
  '.mts',
  '.ts',
  '.tsx',
])

const IGNORED_DIRECTORIES = new Set([
  '.contentlayer',
  '.content-collections',
  '.git',
  '.next',
  '.output',
  '.tsup',
  '.turbo',
  '_next',
  'build',
  'coverage',
  'dist',
  'lib',
  'node_modules',
  'out',
  'storybook-static',
])

const IGNORED_FILES = new Set([
  'CHANGELOG.md',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
])

const IGNORED_SOURCE_PATTERN =
  /(?:^|\.)(?:example|spec|stories|story|test)\.(?:[cm]?[jt]sx?|mdx)$/

const STATIC_SPECIFIER_PATTERN =
  /(['"`])(@saas-ui\/core(?:\/[^'"`\r\n$\\]*)?)\1/g

function toPosix(value: string) {
  return value.split(path.sep).join('/')
}

function packageFromSpecifier(_specifier: string): LegacyPackage {
  return '@saas-ui/core'
}

function location(source: string, offset: number) {
  const before = source.slice(0, offset)
  const lines = before.split('\n')
  return {
    column: lines.at(-1)!.length + 1,
    line: lines.length,
  }
}

function shouldReadFile(file: string, installableOnly: boolean) {
  const basename = path.basename(file)
  if (IGNORED_FILES.has(basename)) return false
  if (installableOnly && IGNORED_SOURCE_PATTERN.test(basename)) return false
  return SOURCE_EXTENSIONS.has(path.extname(basename))
}

async function statDirectory(
  absolute: string,
  scope: LegacyCheckScope,
): Promise<'directory' | 'missing'> {
  try {
    const stats = await fs.lstat(absolute)
    if (!stats.isDirectory()) {
      throw new Error(
        `Legacy-check scope "${scope.name}" is not a directory: ${scope.root}`,
      )
    }
    return 'directory'
  } catch (error) {
    if (scope.optional && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return 'missing'
    }
    throw new Error(
      `Cannot read legacy-check scope "${scope.name}" at ${scope.root}: ${
        error instanceof Error ? error.message : String(error)
      }`,
      { cause: error },
    )
  }
}

async function collectTree(
  root: string,
  files: Set<string>,
  installableOnly = false,
) {
  const visit = async (directory: string): Promise<void> => {
    let entries
    try {
      entries = await fs.readdir(directory, { withFileTypes: true })
    } catch (error) {
      throw new Error(
        `Cannot read migrated path ${directory}: ${
          error instanceof Error ? error.message : String(error)
        }`,
        { cause: error },
      )
    }

    for (const entry of entries.sort((left, right) =>
      left.name.localeCompare(right.name, 'en'),
    )) {
      if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue
      const target = path.join(directory, entry.name)
      if (entry.isSymbolicLink()) {
        throw new Error(`Migrated scope contains a symbolic link: ${target}`)
      }
      if (entry.isDirectory()) await visit(target)
      else if (entry.isFile() && shouldReadFile(target, installableOnly)) {
        files.add(target)
      }
    }
  }
  await visit(root)
}

async function configuredProDirectories(root: string) {
  const configured = new Set<string>()
  const visit = async (directory: string): Promise<void> => {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    for (const entry of entries.sort((left, right) =>
      left.name.localeCompare(right.name, 'en'),
    )) {
      if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue
      const target = path.join(directory, entry.name)
      if (entry.isSymbolicLink()) {
        throw new Error(`Pro blocks scope contains a symbolic link: ${target}`)
      }
      if (entry.isDirectory()) await visit(target)
      else if (entry.isFile() && entry.name === 'component.config.ts') {
        configured.add(directory)
      }
    }
  }
  await visit(root)
  return [...configured].sort((left, right) => left.localeCompare(right, 'en'))
}

async function collectScopeFiles(
  root: string,
  scope: LegacyCheckScope,
  files: Set<string>,
) {
  if (scope.mode !== 'pro-installable') {
    await collectTree(root, files, scope.mode === 'installable-tree')
    return
  }

  const configured = await configuredProDirectories(root)
  if (!configured.length) {
    throw new Error(
      'Pro submodule exists but no installable component.config.ts was found ' +
        `in ${scope.root}.`,
    )
  }
  for (const directory of configured) {
    await collectTree(directory, files, true)
  }

  const hooks = path.join(root, 'hooks')
  try {
    if ((await fs.lstat(hooks)).isDirectory()) {
      await collectTree(hooks, files, true)
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

function normalizeAllowlist(
  repositoryRoot: string,
  allowlist: readonly LegacyCheckAllowlistEntry[],
) {
  const result = new Map<string, LegacyCheckAllowlistEntry>()
  for (const entry of allowlist) {
    if (!entry.reason.trim()) {
      throw new Error(`Legacy-check allowlist reason is empty: ${entry.path}`)
    }
    const absolute = path.resolve(repositoryRoot, entry.path)
    const relative = toPosix(path.relative(repositoryRoot, absolute))
    if (relative.startsWith('../') || path.isAbsolute(relative)) {
      throw new Error(
        `Legacy-check allowlist escapes the repository: ${entry.path}`,
      )
    }
    const key = `${relative}\0${entry.package}`
    if (result.has(key)) {
      throw new Error(
        `Duplicate legacy-check allowlist entry: ${relative} (${entry.package})`,
      )
    }
    result.set(key, { ...entry, path: relative })
  }
  return result
}

export async function scanLegacyReferences(
  options: LegacyCheckOptions = {},
): Promise<LegacyCheckResult> {
  const repositoryRoot = path.resolve(options.repositoryRoot ?? process.cwd())
  const scopes = options.scopes ?? migratedLegacyCheckScopes
  if (!scopes.length)
    throw new Error('Legacy-check requires at least one scope.')
  const scopeNames = new Set<string>()
  const scopeRoots = new Set<string>()
  const allowlist = normalizeAllowlist(
    repositoryRoot,
    options.allowlist ??
      (options.scopes === undefined ? migratedLegacyCheckAllowlist : []),
  )
  const usedAllowlist = new Set<string>()
  const references: LegacyReference[] = []
  const scannedScopes: string[] = []
  const skippedScopes: string[] = []
  const filesByScope = new Map<string, Set<string>>()

  for (const scope of scopes) {
    const absolute = path.resolve(repositoryRoot, scope.root)
    const relative = toPosix(path.relative(repositoryRoot, absolute))
    if (relative.startsWith('../') || path.isAbsolute(relative)) {
      throw new Error(
        `Legacy-check scope escapes the repository: ${scope.root}`,
      )
    }
    if (scopeNames.has(scope.name)) {
      throw new Error(`Duplicate legacy-check scope name: ${scope.name}`)
    }
    if (scopeRoots.has(relative)) {
      throw new Error(`Duplicate legacy-check scope root: ${scope.root}`)
    }
    scopeNames.add(scope.name)
    scopeRoots.add(relative)
    const status = await statDirectory(absolute, scope)
    if (status === 'missing') {
      skippedScopes.push(scope.name)
      continue
    }
    const files = new Set<string>()
    await collectScopeFiles(absolute, scope, files)
    if (!files.size) {
      if (scope.optional) {
        skippedScopes.push(scope.name)
        continue
      }
      throw new Error(
        `Legacy-check scope "${scope.name}" contains no enforceable files: ${scope.root}`,
      )
    }
    filesByScope.set(scope.name, files)
    scannedScopes.push(scope.name)
  }

  for (const [scope, files] of filesByScope) {
    for (const file of [...files].sort((left, right) =>
      left.localeCompare(right, 'en'),
    )) {
      let source
      try {
        source = await fs.readFile(file, 'utf8')
      } catch (error) {
        throw new Error(
          `Cannot read migrated source ${file}: ${
            error instanceof Error ? error.message : String(error)
          }`,
          { cause: error },
        )
      }
      const relative = toPosix(path.relative(repositoryRoot, file))
      for (const match of source.matchAll(STATIC_SPECIFIER_PATTERN)) {
        const specifier = match[2]!
        const legacyPackage = packageFromSpecifier(specifier)
        const key = `${relative}\0${legacyPackage}`
        if (allowlist.has(key)) {
          usedAllowlist.add(key)
          continue
        }
        const position = location(source, (match.index ?? 0) + 1)
        references.push({
          ...position,
          package: legacyPackage,
          path: relative,
          scope,
          specifier,
        })
      }
    }
  }

  const staleAllowlist = [...allowlist.keys()].filter(
    (key) => !usedAllowlist.has(key),
  )
  if (staleAllowlist.length) {
    throw new Error(
      `Stale legacy-check allowlist entries:\n${staleAllowlist
        .map((key) => {
          const entry = allowlist.get(key)!
          return `- ${entry.path} (${entry.package}): ${entry.reason}`
        })
        .join('\n')}`,
    )
  }

  references.sort(
    (left, right) =>
      left.path.localeCompare(right.path, 'en') ||
      left.line - right.line ||
      left.column - right.column ||
      left.package.localeCompare(right.package, 'en'),
  )

  return {
    files: new Set([...filesByScope.values()].flatMap((files) => [...files]))
      .size,
    references,
    scopes: scannedScopes,
    skippedScopes,
  }
}

function isDirectExecution() {
  const script = process.argv[1]
  return Boolean(
    script && pathToFileURL(path.resolve(script)).href === import.meta.url,
  )
}

if (isDirectExecution()) {
  try {
    const result = await scanLegacyReferences()
    if (result.references.length) {
      console.error('Legacy package references found in migrated scopes:')
      for (const reference of result.references) {
        console.error(
          `- ${reference.path}:${reference.line}:${reference.column} ` +
            `[${reference.scope}] ${reference.specifier}`,
        )
      }
      process.exitCode = 1
    } else {
      console.log(
        `Legacy package check passed: ${result.files} files in ` +
          `${result.scopes.length} migrated scope(s).`,
      )
      if (result.skippedScopes.length) {
        console.log(
          `Skipped optional scope(s): ${result.skippedScopes.join(', ')}.`,
        )
      }
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
