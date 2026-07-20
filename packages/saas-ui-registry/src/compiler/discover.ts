import { promises as fs } from 'node:fs'
import path from 'node:path'

import type {
  CompilerRegistryItemType,
  DiscoverRegistryItemsOptions,
  DiscoveredRegistryItem,
  RegistryCompilerDiagnostic,
  RegistryConvention,
  RegistryItemConfig,
  RegistryItemMetadata,
  RegistrySourceRoot,
} from './model.js'
import {
  comparePaths,
  isPathInside,
  isRegistryAuxiliarySource,
  isRegistryExampleSource,
  isRegistryPreviewSource,
  isRegistryTypeTestSource,
  isSafeRelativePath,
  isTypeScriptDeclarationSource,
  isTypeScriptSource,
  matchesPathPattern,
  toPosixPath,
} from './path-utils.js'
import { parseStaticRegistryItemConfig } from './static-config.js'

export const DEFAULT_REGISTRY_CONVENTIONS: readonly RegistryConvention[] = [
  { directory: 'ui', type: 'registry:ui' },
  { directory: 'forms', type: 'registry:component' },
  { directory: 'icons', type: 'registry:icon' },
  { directory: 'hooks', type: 'registry:hook' },
  { directory: 'lib', type: 'registry:lib' },
  { directory: 'utils', type: 'registry:lib' },
  { directory: 'setup', type: 'registry:setup' },
  { directory: 'blocks', type: 'registry:block' },
  { directory: 'block', type: 'registry:block' },
  { directory: 'examples', type: 'registry:example' },
  { directory: 'example', type: 'registry:example' },
]

const defaultConfigFileNames = ['component.config.ts'] as const
const ignoredDirectoryNames = new Set([
  '__tests__',
  'test',
  'tests',
  'stories',
  '__stories__',
  'node_modules',
])
const nestedBlockConventionDirectories = new Set([
  'hooks',
  'lib',
  'setup',
  'utils',
])

interface NormalizedSourceRoot {
  path: string
  style: string
  sourceBasePath: string
  version?: string
  type?: CompilerRegistryItemType
}

interface DiscoveryContext {
  configFileNames: readonly string[]
  conventionMap: ReadonlyMap<string, CompilerRegistryItemType>
  diagnostics: RegistryCompilerDiagnostic[]
  items: DiscoveredRegistryItem[]
}

function isAlwaysExcluded(
  filePath: string,
  configFileNames: readonly string[],
) {
  const basename = path.basename(filePath)
  return (
    configFileNames.includes(basename) || isRegistryAuxiliarySource(filePath)
  )
}

function isExampleFile(filePath: string) {
  return isRegistryExampleSource(filePath)
}

async function exists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function listDirectory(directory: string) {
  return (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name, 'en'),
  )
}

async function findConfigPath(
  directory: string,
  configFileNames: readonly string[],
) {
  for (const fileName of configFileNames) {
    const configPath = path.join(directory, fileName)
    if (await exists(configPath)) {
      return configPath
    }
  }
  return undefined
}

async function readConfig(
  configPath: string | undefined,
  diagnostics: RegistryCompilerDiagnostic[],
) {
  if (!configPath) {
    return {}
  }
  const parsed = parseStaticRegistryItemConfig(
    configPath,
    await fs.readFile(configPath, 'utf8'),
  )
  diagnostics.push(...parsed.diagnostics)
  return parsed.config
}

async function collectSourceFiles(
  directory: string,
  configFileNames: readonly string[],
): Promise<string[]> {
  const result: string[] = []
  for (const entry of await listDirectory(directory)) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (!ignoredDirectoryNames.has(entry.name)) {
        result.push(...(await collectSourceFiles(entryPath, configFileNames)))
      }
    } else if (
      entry.isFile() &&
      isTypeScriptSource(entryPath) &&
      !isAlwaysExcluded(entryPath, configFileNames)
    ) {
      result.push(entryPath)
    }
  }
  return result.sort(comparePaths)
}

async function resolveConfiguredPath(
  value: string,
  sourceDirectory: string,
  sourceBasePath: string,
) {
  if (path.isAbsolute(value)) {
    return path.normalize(value)
  }
  const fromBase = path.resolve(sourceBasePath, value)
  if (await exists(fromBase)) {
    return fromBase
  }
  return path.resolve(sourceDirectory, value)
}

async function pathContainsSymlink(
  ownerDirectory: string,
  candidatePath: string,
) {
  const relativePath = path.relative(ownerDirectory, candidatePath)
  const segments = relativePath.split(path.sep).filter(Boolean)
  let currentPath = ownerDirectory
  for (const segment of segments) {
    currentPath = path.join(currentPath, segment)
    try {
      if ((await fs.lstat(currentPath)).isSymbolicLink()) {
        return true
      }
    } catch {
      return false
    }
  }
  return false
}

async function resolveOwnedConfiguredPath(args: {
  diagnostics: RegistryCompilerDiagnostic[]
  itemName: string
  kind: 'include' | 'preview' | 'primary-file'
  sourceBasePath: string
  sourceDirectory: string
  value: string
}) {
  const {
    diagnostics,
    itemName,
    kind,
    sourceBasePath,
    sourceDirectory,
    value,
  } = args
  const label = kind === 'primary-file' ? 'primary file' : kind
  if (!isSafeRelativePath(value)) {
    diagnostics.push({
      code: `configured-${kind}-unsafe-path`,
      message: `Configured ${label} "${value}" must be a safe relative path without traversal`,
      severity: 'error',
      stage: 'discovery',
      itemName,
      filePath: value,
    })
    return undefined
  }

  const candidatePath = await resolveConfiguredPath(
    value,
    sourceDirectory,
    sourceBasePath,
  )
  if (!(await exists(candidatePath))) {
    return candidatePath
  }
  if (!isPathInside(sourceDirectory, candidatePath)) {
    diagnostics.push({
      code: `configured-${kind}-outside-item`,
      message: `Configured ${label} "${value}" is not owned by registry item "${itemName}"`,
      severity: 'error',
      stage: 'discovery',
      itemName,
      filePath: candidatePath,
    })
    return undefined
  }
  if (await pathContainsSymlink(sourceDirectory, candidatePath)) {
    diagnostics.push({
      code: `configured-${kind}-symlink`,
      message: `Configured ${label} "${value}" resolves through a symbolic link`,
      severity: 'error',
      stage: 'discovery',
      itemName,
      filePath: candidatePath,
    })
    return undefined
  }

  const [realOwner, realCandidate, realBase] = await Promise.all([
    fs.realpath(sourceDirectory),
    fs.realpath(candidatePath),
    fs.realpath(sourceBasePath),
  ])
  if (
    !isPathInside(realOwner, realCandidate) ||
    !isPathInside(realBase, realCandidate)
  ) {
    diagnostics.push({
      code: `configured-${kind}-outside-item`,
      message: `Configured ${label} "${value}" resolves outside registry item "${itemName}"`,
      severity: 'error',
      stage: 'discovery',
      itemName,
      filePath: realCandidate,
    })
    return undefined
  }
  return candidatePath
}

function metadataFromConfig(
  config: RegistryItemConfig,
  defaultVersion?: string,
): RegistryItemMetadata {
  return {
    version: config.version ?? defaultVersion,
    description: config.description,
    private: config.private,
    category: config.category,
    subcategory: config.subcategory,
    categories: config.categories,
    docs: config.docs,
    source: config.source,
    order: config.order,
    preview: config.preview,
    primaryFile: config.primaryFile,
    chunks: config.chunks,
    canvas: config.canvas,
    // Runtime validation treats authored config as untrusted even though the
    // defineRegistryItem helper exposes the strict exclusivity contract.
    meta: config.meta as RegistryItemMetadata['meta'],
  }
}

async function selectItemFiles(args: {
  config: RegistryItemConfig
  configFileNames: readonly string[]
  diagnostics: RegistryCompilerDiagnostic[]
  itemName: string
  itemType: CompilerRegistryItemType
  sourceBasePath: string
  sourceDirectory: string
}): Promise<string[]> {
  const {
    config,
    configFileNames,
    diagnostics,
    itemName,
    itemType,
    sourceBasePath,
    sourceDirectory,
  } = args

  const filePaths = await collectSourceFiles(sourceDirectory, configFileNames)
  const authoredDeclarationPaths = new Set<string>()

  for (const include of config.include ?? []) {
    const includePath = await resolveOwnedConfiguredPath({
      diagnostics,
      itemName,
      kind: 'include',
      sourceBasePath,
      sourceDirectory,
      value: include,
    })
    if (!includePath) {
      continue
    }
    if (await exists(includePath)) {
      const stat = await fs.stat(includePath)
      if (stat.isFile() && isRegistryTypeTestSource(includePath)) {
        diagnostics.push({
          code: 'configured-include-type-test',
          message: `Configured include "${include}" is a type-test source and cannot be installed`,
          severity: 'error',
          stage: 'discovery',
          itemName,
          filePath: includePath,
        })
        continue
      }
      if (stat.isFile() && isTypeScriptDeclarationSource(includePath)) {
        authoredDeclarationPaths.add(path.normalize(includePath))
      }
      filePaths.push(
        ...(stat.isDirectory()
          ? await collectSourceFiles(includePath, configFileNames)
          : [includePath]),
      )
    } else {
      diagnostics.push({
        code: 'configured-include-not-found',
        message: `Configured include "${include}" does not exist`,
        severity: 'error',
        stage: 'discovery',
        itemName,
        filePath: includePath,
      })
    }
  }

  const includes = config.include ?? []
  return Array.from(new Set(filePaths))
    .filter(
      (filePath) =>
        isTypeScriptSource(filePath) ||
        (isTypeScriptDeclarationSource(filePath) &&
          authoredDeclarationPaths.has(path.normalize(filePath))),
    )
    .filter((filePath) => !isAlwaysExcluded(filePath, configFileNames))
    .filter((filePath) => {
      if (itemType === 'registry:example' || !isExampleFile(filePath)) {
        return true
      }
      const relativePath = toPosixPath(path.relative(sourceDirectory, filePath))
      return includes.some((pattern) =>
        matchesPathPattern(relativePath, pattern),
      )
    })
    .filter((filePath) => {
      const relativePath = toPosixPath(path.relative(sourceDirectory, filePath))
      return !(config.exclude ?? []).some((pattern) =>
        matchesPathPattern(relativePath, pattern),
      )
    })
    .sort(comparePaths)
}

async function createDirectoryItem(args: {
  context: DiscoveryContext
  name: string
  root: NormalizedSourceRoot
  sourceDirectory: string
  type: CompilerRegistryItemType
}) {
  const { context, name, root, sourceDirectory, type } = args
  const configPath = await findConfigPath(
    sourceDirectory,
    context.configFileNames,
  )
  const config = await readConfig(configPath, context.diagnostics)

  const filePaths = await selectItemFiles({
    config,
    configFileNames: context.configFileNames,
    diagnostics: context.diagnostics,
    itemName: name,
    itemType: type,
    sourceBasePath: root.sourceBasePath,
    sourceDirectory,
  })

  // A preview may be a local source file for the public registry or a stable
  // Storybook story id for an external preview runtime.
  const previewPath =
    config.preview && isRegistryPreviewSource(config.preview)
      ? await resolveOwnedConfiguredPath({
          diagnostics: context.diagnostics,
          itemName: name,
          kind: 'preview',
          sourceBasePath: root.sourceBasePath,
          sourceDirectory,
          value: config.preview,
        })
      : undefined
  const primaryFilePath = config.primaryFile
    ? await resolveOwnedConfiguredPath({
        diagnostics: context.diagnostics,
        itemName: name,
        kind: 'primary-file',
        sourceBasePath: root.sourceBasePath,
        sourceDirectory,
        value: config.primaryFile,
      })
    : undefined

  let keepPreviewPath = previewPath
  if (keepPreviewPath && isRegistryTypeTestSource(keepPreviewPath)) {
    context.diagnostics.push({
      code: 'configured-preview-type-test',
      message: `Configured preview "${config.preview}" is a type-test source and cannot be rendered`,
      severity: 'error',
      stage: 'discovery',
      itemName: name,
      filePath: keepPreviewPath,
    })
    keepPreviewPath = undefined
  }
  let keepPrimaryFilePath = primaryFilePath
  if (keepPrimaryFilePath && isRegistryTypeTestSource(keepPrimaryFilePath)) {
    context.diagnostics.push({
      code: 'configured-primary-file-type-test',
      message: `Configured primary file "${config.primaryFile}" is a type-test source and cannot be rendered`,
      severity: 'error',
      stage: 'discovery',
      itemName: name,
      filePath: keepPrimaryFilePath,
    })
    keepPrimaryFilePath = undefined
  }

  context.items.push({
    id: `${root.style}:${name}`,
    name,
    type,
    style: root.style,
    sourceRoot: root.path,
    sourceBasePath: root.sourceBasePath,
    sourceDirectory,
    relativeDirectory: toPosixPath(
      path.relative(root.sourceBasePath, sourceDirectory),
    ),
    filePaths,
    configPath,
    previewPath:
      keepPreviewPath && (await exists(keepPreviewPath))
        ? keepPreviewPath
        : undefined,
    primaryFilePath:
      keepPrimaryFilePath && (await exists(keepPrimaryFilePath))
        ? keepPrimaryFilePath
        : undefined,
    config,
    metadata: metadataFromConfig(config, root.version),
  })
}

async function discoverInTypeRoot(
  root: NormalizedSourceRoot,
  type: CompilerRegistryItemType,
  context: DiscoveryContext,
) {
  async function visit(directory: string) {
    const entries = await listDirectory(directory)
    const configPath = await findConfigPath(directory, context.configFileNames)
    const directFiles = entries.filter(
      (entry) =>
        entry.isFile() &&
        isTypeScriptSource(entry.name) &&
        !isAlwaysExcluded(entry.name, context.configFileNames) &&
        entry.name !== 'index.ts' &&
        entry.name !== 'index.tsx',
    )

    if (directory === root.path && configPath) {
      await createDirectoryItem({
        context,
        name: path.basename(directory),
        root,
        sourceDirectory: directory,
        type,
      })
      return
    }

    if (directory !== root.path && (configPath || directFiles.length > 0)) {
      await createDirectoryItem({
        context,
        name: path.basename(directory),
        root,
        sourceDirectory: directory,
        type,
      })
      return
    }

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name)
      if (
        entry.isFile() &&
        directory === root.path &&
        isTypeScriptSource(entry.name) &&
        !isAlwaysExcluded(entry.name, context.configFileNames) &&
        entry.name !== 'index.ts' &&
        entry.name !== 'index.tsx'
      ) {
        const name = entry.name.replace(/\.(?:ts|tsx)$/, '')
        context.items.push({
          id: `${root.style}:${name}`,
          name,
          type,
          style: root.style,
          sourceRoot: root.path,
          sourceBasePath: root.sourceBasePath,
          sourceDirectory: root.path,
          relativeDirectory: toPosixPath(
            path.relative(root.sourceBasePath, root.path),
          ),
          filePaths: [entryPath],
          config: {},
          metadata: root.version ? { version: root.version } : {},
        })
      } else if (
        entry.isDirectory() &&
        !ignoredDirectoryNames.has(entry.name) &&
        !(type !== 'registry:example' && entry.name === 'examples')
      ) {
        const nestedType =
          type === 'registry:block' &&
          nestedBlockConventionDirectories.has(entry.name)
            ? context.conventionMap.get(entry.name)
            : undefined
        if (nestedType && nestedType !== type) {
          await discoverInTypeRoot(
            { ...root, path: entryPath, type: nestedType },
            nestedType,
            context,
          )
        } else {
          await visit(entryPath)
        }
      }
    }
  }

  await visit(root.path)
}

function normalizeSourceRoot(
  sourceRoot: string | RegistrySourceRoot,
  conventionMap: ReadonlyMap<string, CompilerRegistryItemType>,
): NormalizedSourceRoot {
  const input =
    typeof sourceRoot === 'string' ? { path: sourceRoot } : sourceRoot
  const absolutePath = path.resolve(input.path)
  const inferredType = conventionMap.get(path.basename(absolutePath))
  const isConventionRoot = Boolean(input.type ?? inferredType)
  const sourceBasePath = path.resolve(
    input.basePath ??
      (isConventionRoot ? path.dirname(absolutePath) : absolutePath),
  )
  return {
    path: absolutePath,
    style:
      input.style ??
      path.basename(isConventionRoot ? sourceBasePath : absolutePath),
    sourceBasePath,
    version: input.version,
    type: input.type ?? inferredType,
  }
}

export async function discoverRegistryItems(
  options: DiscoverRegistryItemsOptions,
): Promise<import('./model.js').RegistryDiscoveryResult> {
  const conventions = options.conventions ?? DEFAULT_REGISTRY_CONVENTIONS
  const conventionMap = new Map(
    conventions.map((convention) => [convention.directory, convention.type]),
  )
  const context: DiscoveryContext = {
    configFileNames: options.configFileNames ?? defaultConfigFileNames,
    conventionMap,
    diagnostics: [],
    items: [],
  }

  for (const input of options.sourceRoots) {
    const root = normalizeSourceRoot(input, conventionMap)
    if (!(await exists(root.path))) {
      context.diagnostics.push({
        code: 'source-root-not-found',
        message: `Registry source root "${root.path}" does not exist`,
        severity: 'error',
        stage: 'discovery',
        filePath: root.path,
      })
      continue
    }

    if (root.type) {
      await discoverInTypeRoot(root, root.type, context)
      continue
    }

    for (const convention of conventions) {
      const conventionPath = path.join(root.path, convention.directory)
      if (!(await exists(conventionPath))) {
        continue
      }
      await discoverInTypeRoot(
        { ...root, path: conventionPath, type: convention.type },
        convention.type,
        context,
      )
    }
  }

  return {
    items: context.items.sort(
      (left, right) =>
        left.style.localeCompare(right.style, 'en') ||
        left.name.localeCompare(right.name, 'en') ||
        left.sourceDirectory.localeCompare(right.sourceDirectory, 'en'),
    ),
    diagnostics: context.diagnostics,
  }
}
