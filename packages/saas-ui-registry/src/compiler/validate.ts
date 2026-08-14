import { existsSync } from 'node:fs'
import path from 'node:path'

import {
  REGISTRY_SCHEMA_VERSION,
  isRegistryItemTypeInstallable,
  packageDependencySchema,
  registryDependencyReferenceSchema,
  registryItemNameSchema,
  registryItemSchema,
  registryItemVersionSchema,
} from '../schema.js'
import type {
  RegistryCompilerDiagnostic,
  RegistryDependencyGraph,
  RegistryValidationDiagnostic,
  RegistryValidationReport,
  RegistryValidationResult,
  ValidateRegistryOptions,
} from './model.js'
import {
  isPathInside,
  isRegistryNonInstallableSource,
  isRegistryPreviewSource,
  isRegistryTypeTestSource,
  isSafeRelativePath,
} from './path-utils.js'

const defaultForbiddenPackages = ['@saas-ui/core'] as const

function itemKey(style: string, name: string) {
  return `${style}:${name}`
}

function dependencyPackageName(dependency: string) {
  if (dependency.startsWith('@')) {
    return dependency.match(/^(@[^/]+\/[^@/]+)(?:@.+)?$/)?.[1] ?? dependency
  }
  return dependency.split('@')[0]
}

function presetBindingCandidates(binding: string) {
  return [
    binding,
    binding.startsWith('sui')
      ? binding
      : `sui${binding.charAt(0).toUpperCase()}${binding.slice(1)}`,
  ]
}

function diagnosticKey(diagnostic: RegistryCompilerDiagnostic) {
  return [
    diagnostic.severity,
    diagnostic.code,
    diagnostic.itemName ?? '',
    diagnostic.filePath ?? '',
    diagnostic.moduleSpecifier ?? '',
    diagnostic.dependency ?? '',
    diagnostic.message,
  ].join('\0')
}

const defaultValidationErrorLimit = 10

interface ValidatedExclusiveMetadata {
  group?: string
  isDefault: boolean
  conflicts: string[]
}

const conventionalInstallRoots = new Set([
  'components',
  'hooks',
  'icons',
  'lib',
  'ui',
])

function isPublicInstallableItem(
  item: RegistryDependencyGraph['items'][number],
) {
  return !item.metadata.private && isRegistryItemTypeInstallable(item.type)
}

function defaultInstallRoot(
  type: RegistryDependencyGraph['items'][number]['files'][number]['type'],
) {
  switch (type) {
    case 'registry:ui':
      return 'ui'
    case 'registry:lib':
      return 'lib'
    case 'registry:hook':
      return 'hooks'
    case 'registry:icon':
      return 'icons'
    default:
      return 'components'
  }
}

/** Mirrors the CLI's logical target resolution without requiring a project. */
function logicalInstallTarget(
  item: RegistryDependencyGraph['items'][number],
  file: RegistryDependencyGraph['items'][number]['files'][number],
) {
  const source = file.path.replace(/^\.\//, '').replaceAll('\\', '/')
  const root = defaultInstallRoot(file.type ?? item.type)

  if (file.target) {
    const target = file.target.replace(/^\.\//, '').replaceAll('\\', '/')
    if (target.startsWith('~/')) return target
    const firstSegment = target.split('/')[0]
    return conventionalInstallRoots.has(firstSegment)
      ? target
      : `${root}/${target}`
  }

  const firstSegment = source.split('/')[0]
  return firstSegment === root ? source : `${root}/${source}`
}

function readExclusiveMetadata(
  item: RegistryDependencyGraph['items'][number],
  diagnostics: RegistryCompilerDiagnostic[],
): ValidatedExclusiveMetadata {
  const meta = item.metadata.meta
  if (!meta) {
    return { isDefault: false, conflicts: [] }
  }

  let group: string | undefined
  const groupPresent = Object.hasOwn(meta, 'exclusiveGroup')
  if (groupPresent) {
    const value = meta.exclusiveGroup
    const parsed = registryItemNameSchema.safeParse(value)
    if (typeof value !== 'string' || !parsed.success || parsed.data !== value) {
      diagnostics.push({
        code: 'invalid-exclusive-group',
        message:
          'meta.exclusiveGroup must be a non-empty normalized URL-safe string',
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
      })
    } else {
      group = value
    }
  }

  const defaultPresent = Object.hasOwn(meta, 'exclusiveDefault')
  const defaultValue = meta.exclusiveDefault
  if (defaultPresent && typeof defaultValue !== 'boolean') {
    diagnostics.push({
      code: 'invalid-exclusive-default',
      message: 'meta.exclusiveDefault must be a boolean when present',
      severity: 'error',
      stage: 'validation',
      itemName: item.name,
    })
  }
  if (defaultPresent && !group) {
    diagnostics.push({
      code: 'exclusive-default-without-group',
      message: 'meta.exclusiveDefault is only valid with meta.exclusiveGroup',
      severity: 'error',
      stage: 'validation',
      itemName: item.name,
    })
  }

  const isDefault = defaultValue === true
  if (isDefault && !isPublicInstallableItem(item)) {
    diagnostics.push({
      code: 'exclusive-default-not-public-installable',
      message:
        'An exclusive default must be a public item with an installable ' +
        'registry type',
      severity: 'error',
      stage: 'validation',
      itemName: item.name,
    })
  }

  const conflictsPresent = Object.hasOwn(meta, 'conflicts')
  if (!conflictsPresent) {
    return { group, isDefault, conflicts: [] }
  }
  if (!Array.isArray(meta.conflicts)) {
    diagnostics.push({
      code: 'invalid-exclusive-conflicts',
      message: 'meta.conflicts must be an array of normalized item names',
      severity: 'error',
      stage: 'validation',
      itemName: item.name,
    })
    return { group, isDefault, conflicts: [] }
  }

  const conflicts: string[] = []
  const seen = new Set<string>()
  for (const value of meta.conflicts) {
    const parsed = registryItemNameSchema.safeParse(value)
    if (typeof value !== 'string' || !parsed.success || parsed.data !== value) {
      diagnostics.push({
        code: 'invalid-exclusive-conflict',
        message: 'Every meta.conflicts entry must be a normalized item name',
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
        dependency: typeof value === 'string' ? value : String(value),
      })
      continue
    }
    if (seen.has(value)) {
      diagnostics.push({
        code: 'duplicate-exclusive-conflict',
        message: `meta.conflicts contains duplicate item "${value}"`,
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
        dependency: value,
      })
      continue
    }
    seen.add(value)
    conflicts.push(value)
  }

  return { group, isDefault, conflicts }
}

function diagnosticLocation(diagnostic: RegistryValidationDiagnostic) {
  const item = diagnostic.itemName ?? diagnostic.item
  const file = diagnostic.filePath ?? diagnostic.file

  if (item && file) return `${item} (${file})`
  return item ?? file
}

/** Format validation failures for CLI output without dumping every diagnostic. */
export function formatRegistryValidationError(
  report: RegistryValidationResult,
  limit = defaultValidationErrorLimit,
) {
  const errors = report.diagnostics.filter(
    (diagnostic) => diagnostic.severity === 'error',
  )
  const displayed = errors.slice(0, Math.max(0, limit))
  const lines = [
    `Registry validation failed with ${errors.length} error(s).`,
    ...displayed.map((diagnostic) => {
      const location = diagnosticLocation(diagnostic)
      return `- [${diagnostic.code}]${location ? ` ${location}:` : ''} ${diagnostic.message}`
    }),
  ]
  const remaining = errors.length - displayed.length
  if (remaining > 0) {
    lines.push(`- ...and ${remaining} more error(s).`)
  }
  if (errors.length === 0) {
    lines.push('- The report was marked invalid without an error diagnostic.')
  }
  return lines.join('\n')
}

/** Typed error raised before invalid registry artifacts may be published. */
export class RegistryValidationError extends Error {
  readonly report: RegistryValidationResult

  constructor(report: RegistryValidationResult) {
    super(formatRegistryValidationError(report))
    this.name = 'RegistryValidationError'
    this.report = report
  }
}

/** Narrow a validation result or fail before crossing a publication boundary. */
export function assertRegistryValid<TReport extends RegistryValidationResult>(
  report: TReport,
): asserts report is TReport & { valid: true } {
  if (!report.valid) {
    throw new RegistryValidationError(report)
  }
}

function findConfiguredPath(
  value: string,
  sourceDirectory: string,
  sourceBasePath: string,
) {
  if (path.isAbsolute(value)) {
    return value
  }
  const fromBase = path.resolve(sourceBasePath, value)
  return existsSync(fromBase) ? fromBase : path.resolve(sourceDirectory, value)
}

function findCycle(
  adjacency: ReadonlyMap<string, readonly string[]>,
  nodes: readonly string[],
) {
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const stack: string[] = []

  const visit = (node: string): string[] | undefined => {
    if (visiting.has(node)) {
      const index = stack.indexOf(node)
      return [...stack.slice(index), node]
    }
    if (visited.has(node)) {
      return undefined
    }
    visiting.add(node)
    stack.push(node)
    for (const target of adjacency.get(node) ?? []) {
      const cycle = visit(target)
      if (cycle) {
        return cycle
      }
    }
    stack.pop()
    visiting.delete(node)
    visited.add(node)
    return undefined
  }

  for (const node of nodes) {
    const cycle = visit(node)
    if (cycle) {
      return cycle
    }
  }
  return undefined
}

export function validateRegistry(
  graph: RegistryDependencyGraph,
  options: ValidateRegistryOptions = {},
): RegistryValidationReport {
  const diagnostics = [...graph.diagnostics]
  const forbiddenPackages = new Set(
    options.forbiddenPackages ?? defaultForbiddenPackages,
  )
  const presetRecipeKeys = options.presetRecipeKeys
    ? new Set(options.presetRecipeKeys)
    : undefined
  const providedPackages = new Set([
    ...graph.providedPackages,
    ...(options.providedPackages ?? []),
  ])
  const itemsByKey = new Map<string, (typeof graph.items)[number]>()
  const exclusiveMetadataByItem = new Map<
    (typeof graph.items)[number],
    ValidatedExclusiveMetadata
  >()

  for (const item of graph.items) {
    const key = itemKey(item.style, item.name)
    const previous = itemsByKey.get(key)
    if (previous) {
      diagnostics.push({
        code: 'duplicate-item-name',
        message: `Registry style "${item.style}" contains more than one item named "${item.name}"`,
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
        filePath: item.sourceDirectory,
      })
    } else {
      itemsByKey.set(key, item)
    }
  }

  for (const item of graph.items) {
    exclusiveMetadataByItem.set(item, readExclusiveMetadata(item, diagnostics))
  }

  for (const item of graph.items) {
    const normalizedItem = registryItemSchema.safeParse({
      schemaVersion: REGISTRY_SCHEMA_VERSION,
      name: item.name,
      type: item.type,
      version: item.metadata.version,
      private: item.metadata.private,
      description: item.metadata.description,
      dependencies: item.dependencies,
      devDependencies: item.devDependencies,
      registryDependencies: item.registryDependencies,
      source: item.metadata.source,
      categories: item.metadata.categories,
      category: item.metadata.category,
      subcategory: item.metadata.subcategory,
      chunks: item.metadata.chunks,
      meta: item.metadata.meta,
      canvas: item.metadata.canvas,
      docs: item.metadata.docs,
      files: item.files.map((file) => ({
        path: file.path,
        content: file.content,
        type: file.type ?? item.type,
        target: file.target,
      })),
    })
    if (!normalizedItem.success) {
      for (const issue of normalizedItem.error.issues) {
        diagnostics.push({
          code: 'normalized-item-schema-invalid',
          message: `${issue.path.map(String).join('.') || 'item'}: ${issue.message}`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
        })
      }
    }
    const parsedName = registryItemNameSchema.safeParse(item.name)
    if (!parsedName.success || parsedName.data !== item.name) {
      diagnostics.push({
        code: 'invalid-item-name',
        message: `Registry item name "${item.name}" must be a normalized URL-safe name`,
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
      })
    }
    if (
      item.metadata.version &&
      !registryItemVersionSchema.safeParse(item.metadata.version).success
    ) {
      diagnostics.push({
        code: 'invalid-item-version',
        message: `Registry item version "${item.metadata.version}" must use SemVer`,
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
      })
    }
    if (item.type !== 'registry:example' && item.files.length === 0) {
      diagnostics.push({
        code: 'item-has-no-installable-files',
        message: `Registry item "${item.name}" has no installable files`,
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
      })
    }

    for (const file of item.files) {
      if (!isSafeRelativePath(file.path)) {
        diagnostics.push({
          code: 'unsafe-source-file-path',
          message: `Source file path "${file.path}" must be safe and relative`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          filePath: file.path,
        })
      }
      if (file.target && !isSafeRelativePath(file.target)) {
        diagnostics.push({
          code: 'unsafe-file-target',
          message: `File target "${file.target}" must be safe and relative`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          filePath: file.path,
        })
      }
      if (
        isRegistryNonInstallableSource(file.path, {
          allowExample: item.type === 'registry:example',
        })
      ) {
        diagnostics.push({
          code: 'non-installable-file-in-payload',
          message: `Non-installable file "${file.path}" entered the registry payload`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          filePath: file.path,
        })
      }
      if (!isPathInside(item.sourceBasePath, file.sourcePath)) {
        diagnostics.push({
          code: 'source-file-outside-root',
          message: `Source file "${file.sourcePath}" is outside its registry source root`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          filePath: file.sourcePath,
        })
      }
    }

    for (const field of ['preview', 'primaryFile'] as const) {
      const configuredPath = item.metadata[field]
      if (
        field === 'preview' &&
        configuredPath &&
        !isRegistryPreviewSource(configuredPath)
      ) {
        continue
      }
      if (configuredPath && isRegistryTypeTestSource(configuredPath)) {
        const label = field === 'primaryFile' ? 'primary file' : 'preview'
        diagnostics.push({
          code: `configured-${field === 'primaryFile' ? 'primary-file' : field}-type-test`,
          message: `Configured ${label} "${configuredPath}" is a type-test source and cannot be rendered`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          filePath: configuredPath,
        })
        continue
      }
      if (
        configuredPath &&
        (!isSafeRelativePath(configuredPath) ||
          !existsSync(
            findConfiguredPath(
              configuredPath,
              item.sourceDirectory,
              item.sourceBasePath,
            ),
          ))
      ) {
        diagnostics.push({
          code: `configured-${field === 'primaryFile' ? 'primary-file' : field}-not-found`,
          message: `Configured ${field} "${configuredPath}" does not exist`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          filePath: configuredPath,
        })
      }
    }

    const generatedPackages = new Set(
      item.dependencies.map(dependencyPackageName),
    )
    for (const dependency of item.dependencies) {
      if (!packageDependencySchema.safeParse(dependency).success) {
        diagnostics.push({
          code: 'invalid-package-dependency',
          message: `Package dependency "${dependency}" is invalid`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency,
        })
      }
    }
    for (const dependency of item.devDependencies) {
      if (!packageDependencySchema.safeParse(dependency).success) {
        diagnostics.push({
          code: 'invalid-package-dev-dependency',
          message: `Package dev dependency "${dependency}" is invalid`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency,
        })
      }
    }
    const dependencyPackages = new Set(
      item.dependencies.map(dependencyPackageName),
    )
    for (const dependency of item.devDependencies) {
      const packageName = dependencyPackageName(dependency)
      if (dependencyPackages.has(packageName)) {
        diagnostics.push({
          code: 'package-in-dependencies-and-dev-dependencies',
          message: `Package "${packageName}" is declared in both dependencies and devDependencies`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency: packageName,
        })
      }
    }
    for (const packageName of item.externalPackages) {
      if (
        !generatedPackages.has(packageName) &&
        !providedPackages.has(packageName)
      ) {
        diagnostics.push({
          code: 'external-package-not-generated',
          message: `External package "${packageName}" is missing from generated dependencies`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency: packageName,
        })
      }
    }
    for (const forbiddenPackage of forbiddenPackages) {
      if (item.externalPackages.includes(forbiddenPackage)) {
        diagnostics.push({
          code: 'forbidden-template-package',
          message: `Installable template "${item.name}" imports forbidden package "${forbiddenPackage}"`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency: forbiddenPackage,
        })
      }
    }

    for (const dependency of item.registryDependencies) {
      if (!registryDependencyReferenceSchema.safeParse(dependency).success) {
        diagnostics.push({
          code: 'invalid-registry-dependency',
          message: `Registry dependency "${dependency}" must be an item name or an HTTP(S) URL`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency,
        })
        continue
      }
      if (URL.canParse(dependency)) {
        continue
      }
      const target = itemsByKey.get(itemKey(item.style, dependency))
      if (!target) {
        diagnostics.push({
          code: 'registry-dependency-not-found',
          message: `Registry dependency "${dependency}" does not exist in style "${item.style}"`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency,
        })
      } else if (!item.metadata.private && target.metadata.private) {
        diagnostics.push({
          code: 'public-item-depends-on-private-item',
          message: `Public registry item "${item.name}" cannot depend on private item "${dependency}"`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency,
        })
      }
    }

    if (presetRecipeKeys) {
      const directlyBoundRecipeKeys = new Set(
        item.presetRecipeBindings.flatMap(presetBindingCandidates),
      )
      for (const recipe of item.recipeReferences) {
        if (!presetRecipeKeys.has(recipe)) {
          diagnostics.push({
            code: 'preset-recipe-not-found',
            message: `Recipe "${recipe}" referenced by "${item.name}" is not exported by the preset`,
            severity: 'error',
            stage: 'validation',
            itemName: item.name,
            dependency: recipe,
          })
        } else if (
          recipe.startsWith('sui') &&
          !directlyBoundRecipeKeys.has(recipe)
        ) {
          diagnostics.push({
            code: 'preset-recipe-not-directly-bound',
            message: `Custom recipe "${recipe}" referenced by "${item.name}" must be imported from @saas-ui/chakra-preset and passed directly to its recipe context`,
            severity: 'error',
            stage: 'validation',
            itemName: item.name,
            dependency: recipe,
          })
        }
      }
      for (const binding of item.presetRecipeBindings) {
        const candidates = presetBindingCandidates(binding)
        if (!candidates.some((candidate) => presetRecipeKeys.has(candidate))) {
          diagnostics.push({
            code: 'preset-recipe-binding-not-found',
            message: `Preset recipe import "${binding}" referenced by "${item.name}" does not match an exported preset recipe key`,
            severity: 'error',
            stage: 'validation',
            itemName: item.name,
            dependency: binding,
          })
        }
      }
    }
  }

  for (const item of graph.items) {
    const exclusive = exclusiveMetadataByItem.get(item)!
    for (const conflict of exclusive.conflicts) {
      if (conflict === item.name) {
        diagnostics.push({
          code: 'exclusive-conflict-with-self',
          message: 'A registry item cannot conflict with itself',
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency: conflict,
        })
        continue
      }

      const target = itemsByKey.get(itemKey(item.style, conflict))
      if (!target) {
        diagnostics.push({
          code: 'exclusive-conflict-not-found',
          message:
            `Conflict target "${conflict}" does not exist in style ` +
            `"${item.style}"`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency: conflict,
        })
        continue
      }

      const reciprocal = exclusiveMetadataByItem.get(target)
      if (!reciprocal?.conflicts.includes(item.name)) {
        diagnostics.push({
          code: 'exclusive-conflict-not-reciprocal',
          message:
            `Conflict "${item.name}" -> "${conflict}" must be declared by ` +
            `"${conflict}" as well`,
          severity: 'error',
          stage: 'validation',
          itemName: item.name,
          dependency: conflict,
        })
      }
    }
  }

  const groups = new Map<
    string,
    Array<{
      item: (typeof graph.items)[number]
      metadata: ValidatedExclusiveMetadata
    }>
  >()
  for (const item of graph.items) {
    const metadata = exclusiveMetadataByItem.get(item)!
    if (!metadata.group || !isPublicInstallableItem(item)) continue
    const key = `${item.style}\0${metadata.group}`
    const alternatives = groups.get(key) ?? []
    alternatives.push({ item, metadata })
    groups.set(key, alternatives)
  }

  const installAllItems = new Set<(typeof graph.items)[number]>()
  for (const item of graph.items) {
    const metadata = exclusiveMetadataByItem.get(item)!
    if (isPublicInstallableItem(item) && !metadata.group) {
      installAllItems.add(item)
    }
  }

  for (const [key, alternatives] of groups) {
    const separator = key.indexOf('\0')
    const style = key.slice(0, separator)
    const group = key.slice(separator + 1)
    const defaults = alternatives.filter(({ metadata }) => metadata.isDefault)

    if (alternatives.length > 1 && defaults.length === 0) {
      diagnostics.push({
        code: 'exclusive-group-missing-default',
        message:
          `Exclusive group "${group}" in style "${style}" must have exactly ` +
          `one public installable default; alternatives: ${alternatives
            .map(({ item }) => item.name)
            .sort()
            .join(', ')}`,
        severity: 'error',
        stage: 'validation',
        dependency: group,
      })
    } else if (alternatives.length > 1 && defaults.length > 1) {
      diagnostics.push({
        code: 'exclusive-group-multiple-defaults',
        message:
          `Exclusive group "${group}" in style "${style}" has multiple ` +
          `public installable defaults: ${defaults
            .map(({ item }) => item.name)
            .sort()
            .join(', ')}`,
        severity: 'error',
        stage: 'validation',
        dependency: group,
      })
    }

    if (alternatives.length === 1) {
      installAllItems.add(alternatives[0]!.item)
    } else if (defaults.length === 1) {
      installAllItems.add(defaults[0]!.item)
    }
  }

  const reportedConflictPairs = new Set<string>()
  for (const item of installAllItems) {
    const metadata = exclusiveMetadataByItem.get(item)!
    for (const conflict of metadata.conflicts) {
      const target = itemsByKey.get(itemKey(item.style, conflict))
      if (!target || !installAllItems.has(target)) continue
      const pair = `${item.style}\0${[item.name, target.name]
        .sort()
        .join('\0')}`
      if (reportedConflictPairs.has(pair)) continue
      reportedConflictPairs.add(pair)
      diagnostics.push({
        code: 'install-all-exclusive-conflict',
        message:
          `Install-all would select conflicting items "${item.name}" and ` +
          `"${target.name}" in style "${item.style}"`,
        severity: 'error',
        stage: 'validation',
        itemName: item.name,
        dependency: target.name,
      })
    }
  }

  const targetsByStyle = new Map<
    string,
    Map<
      string,
      Array<{
        item: (typeof graph.items)[number]
      }>
    >
  >()
  for (const item of installAllItems) {
    const targets = targetsByStyle.get(item.style) ?? new Map()
    targetsByStyle.set(item.style, targets)
    for (const file of item.files) {
      const target = logicalInstallTarget(item, file)
      const owners = targets.get(target) ?? []
      owners.push({ item })
      targets.set(target, owners)
    }
  }
  for (const [style, targets] of targetsByStyle) {
    for (const [target, owners] of targets) {
      if (owners.length < 2) continue
      diagnostics.push({
        code: 'install-all-target-collision',
        message:
          `Install-all target "${target}" in style "${style}" is claimed by ` +
          `${owners
            .map(({ item }) => item.name)
            .sort()
            .join(', ')}`,
        severity: 'error',
        stage: 'validation',
        filePath: target,
      })
    }
  }

  const adjacency = new Map<string, string[]>()
  for (const edge of graph.edges) {
    const targets = adjacency.get(edge.from) ?? []
    targets.push(edge.to)
    adjacency.set(edge.from, targets)
  }
  const cycle = findCycle(
    adjacency,
    graph.items.map((item) => item.id),
  )
  if (cycle) {
    diagnostics.push({
      code: 'registry-dependency-cycle',
      message: `Registry dependency cycle detected: ${cycle.join(' -> ')}`,
      severity: 'error',
      stage: 'validation',
    })
  }

  const uniqueDiagnostics = Array.from(
    new Map(
      diagnostics.map((diagnostic) => [diagnosticKey(diagnostic), diagnostic]),
    ).values(),
  ).sort((left, right) =>
    diagnosticKey(left).localeCompare(diagnosticKey(right), 'en'),
  )
  const errorCount = uniqueDiagnostics.filter(
    (diagnostic) => diagnostic.severity === 'error',
  ).length
  const warningCount = uniqueDiagnostics.filter(
    (diagnostic) => diagnostic.severity === 'warning',
  ).length

  if (errorCount === 0) {
    return {
      valid: true,
      diagnostics: uniqueDiagnostics,
      errorCount: 0,
      warningCount,
    }
  }

  return {
    valid: false,
    diagnostics: uniqueDiagnostics,
    errorCount,
    warningCount,
  }
}
