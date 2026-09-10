import path from 'node:path'

const sourceExtensions = ['.ts', '.tsx'] as const
const registryAuxiliaryDirectories = new Set([
  '__stories__',
  '__tests__',
  'stories',
  'test',
  'tests',
])

export function toPosixPath(value: string) {
  return value.split(path.sep).join('/')
}

export function comparePaths(left: string, right: string) {
  return toPosixPath(left).localeCompare(toPosixPath(right), 'en')
}

export function isTypeScriptSource(filePath: string) {
  return (
    sourceExtensions.some((extension) => filePath.endsWith(extension)) &&
    !filePath.endsWith('.d.ts')
  )
}

export function isTypeScriptDeclarationSource(filePath: string) {
  return /\.d\.[cm]?ts$/i.test(filePath)
}

/** Type-level test conventions used by Vitest, tsd and expect-type projects. */
export function isRegistryTypeTestSource(filePath: string) {
  const basename = filePath.replaceAll('\\', '/').split('/').at(-1) ?? ''
  return /(?:^|\.)(?:test-d|spec-d|type-tests?)\.[cm]?[jt]sx?$/i.test(basename)
}

/** Whether a preview value identifies a local JavaScript/TypeScript module. */
export function isRegistryPreviewSource(value: string) {
  return /\.[cm]?[jt]sx?$/i.test(value)
}

/** Test, story and preview support files that must never enter a payload. */
export function isRegistryAuxiliarySource(filePath: string) {
  const normalized = filePath.replaceAll('\\', '/')
  const segments = normalized.toLowerCase().split('/')
  const basename = segments.at(-1) ?? ''
  return (
    segments.some((segment) => registryAuxiliaryDirectories.has(segment)) ||
    /^component\.config\.[cm]?[jt]s$/i.test(basename) ||
    /^(?:story|storybook)-(?:canvas|helpers?|utils?)\.[cm]?[jt]sx?$/i.test(
      basename,
    ) ||
    /\.(?:test|spec|stories|story|preview)\.[cm]?[jt]sx?$/i.test(basename) ||
    isRegistryTypeTestSource(basename)
  )
}

export function isRegistryExampleSource(filePath: string) {
  const normalized = filePath.replaceAll('\\', '/')
  const segments = normalized.toLowerCase().split('/')
  const basename = segments.at(-1) ?? ''
  return (
    segments.includes('examples') ||
    segments.includes('__examples__') ||
    /\.(?:example|examples)\.[cm]?[jt]sx?$/i.test(basename)
  )
}

export function isRegistryNonInstallableSource(
  filePath: string,
  options: { allowExample?: boolean } = {},
) {
  return (
    isRegistryAuxiliarySource(filePath) ||
    (!options.allowExample && isRegistryExampleSource(filePath))
  )
}

export function isPathInside(parentPath: string, candidatePath: string) {
  const relativePath = path.relative(
    path.resolve(parentPath),
    path.resolve(candidatePath),
  )
  return (
    relativePath === '' ||
    (!relativePath.startsWith(`..${path.sep}`) &&
      relativePath !== '..' &&
      !path.isAbsolute(relativePath))
  )
}

/**
 * Registry source references and emitted targets must be relative and may not
 * traverse their owning item. A leading `~/` is an alias, not an absolute
 * filesystem path, and is intentionally supported for CLI targets.
 */
export function isSafeRelativePath(value: string) {
  if (!value || value.includes('\0') || value.includes('\\')) {
    return false
  }
  const normalized = value.replaceAll('\\', '/')
  if (
    path.isAbsolute(value) ||
    path.win32.isAbsolute(value) ||
    normalized.startsWith('/')
  ) {
    return false
  }
  return !normalized.split('/').some((segment) => segment === '..')
}

function escapeRegex(value: string) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
}

export function matchesPathPattern(filePath: string, pattern: string) {
  const normalizedPath = toPosixPath(filePath)
  const normalizedPattern = toPosixPath(pattern).replace(/^\.\//, '')
  const expression = normalizedPattern
    .split('**')
    .map((part) => escapeRegex(part).replaceAll('*', '[^/]*'))
    .join('.*')
  return new RegExp(`^${expression}$`).test(normalizedPath)
}

export function packageRootFromSpecifier(specifier: string) {
  if (specifier.startsWith('@')) {
    return specifier.split('/').slice(0, 2).join('/')
  }
  return specifier.split('/')[0]
}

export function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
