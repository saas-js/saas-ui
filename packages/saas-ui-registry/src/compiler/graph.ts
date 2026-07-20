import path from 'node:path'

import type {
  AnalyzedRegistryItem,
  RegistryAnalysisResult,
  RegistryCompilerDiagnostic,
  RegistryDependencyEdge,
  RegistryDependencyGraph,
  ResolveDependencyGraphOptions,
  ResolvedRegistryItem,
} from './model.js'
import { packageRootFromSpecifier } from './path-utils.js'

function uniqueSorted(values: Iterable<string>) {
  return Array.from(new Set(values)).sort((left, right) =>
    left.localeCompare(right, 'en'),
  )
}

function applyDependencyVersion(
  packageName: string,
  version: string | undefined,
) {
  return version ? `${packageName}@${version}` : packageName
}

function edgeKey(edge: RegistryDependencyEdge) {
  return [
    edge.from,
    edge.to,
    edge.kind,
    edge.filePath ?? '',
    edge.moduleSpecifier ?? '',
  ].join('\0')
}

function itemKey(style: string, name: string) {
  return `${style}:${name}`
}

function findItemForSourcePath(
  owners: ReadonlyMap<string, AnalyzedRegistryItem>,
  sourcePath: string,
) {
  return owners.get(path.normalize(sourcePath))
}

export function resolveDependencyGraph(
  analysis: RegistryAnalysisResult,
  options: ResolveDependencyGraphOptions = {},
): RegistryDependencyGraph {
  const diagnostics: RegistryCompilerDiagnostic[] = [...analysis.diagnostics]
  const providedPackages = new Set(options.externalPackages ?? [])
  const sourceOwners = new Map<string, AnalyzedRegistryItem>()
  const itemsByKey = new Map<string, AnalyzedRegistryItem>()

  for (const item of analysis.items) {
    itemsByKey.set(itemKey(item.style, item.name), item)
    for (const file of item.files) {
      sourceOwners.set(path.normalize(file.sourcePath), item)
    }
  }

  const edges: RegistryDependencyEdge[] = []
  const resolvedItems: ResolvedRegistryItem[] = []

  for (const item of analysis.items) {
    const registryDependencies = new Set<string>()
    const dependencyByPackage = new Map<string, string>()
    for (const packageName of item.externalPackages) {
      if (
        !providedPackages.has(packageName) &&
        !dependencyByPackage.has(packageName)
      ) {
        dependencyByPackage.set(
          packageName,
          applyDependencyVersion(
            packageName,
            item.config.dependencyVersions?.[packageName],
          ),
        )
      }
    }

    for (const file of item.files) {
      for (const imported of file.imports) {
        if (imported.externalRegistry) {
          if (imported.externalRegistry.private) {
            diagnostics.push({
              code: 'external-registry-private-item',
              message: `External registry item "${imported.externalRegistry.item}" is private and cannot be consumed through a public catalog dependency`,
              severity: 'error',
              stage: 'graph',
              itemName: item.name,
              filePath: file.path,
              moduleSpecifier: imported.specifier,
              dependency: imported.externalRegistry.item,
            })
          } else {
            registryDependencies.add(imported.externalRegistry.baseUrl)
          }
          continue
        }
        if (imported.kind === 'external' && imported.packageName) {
          const packageName = packageRootFromSpecifier(imported.specifier)
          if (
            !providedPackages.has(packageName) &&
            !dependencyByPackage.has(packageName)
          ) {
            dependencyByPackage.set(
              packageName,
              applyDependencyVersion(
                packageName,
                item.config.dependencyVersions?.[packageName],
              ),
            )
          }
          continue
        }

        if (imported.kind !== 'relative' && imported.kind !== 'alias') {
          continue
        }

        if (!imported.resolvedPath) {
          diagnostics.push({
            code: 'module-not-found',
            message: `Import "${imported.specifier}" could not be resolved`,
            severity: 'error',
            stage: 'graph',
            itemName: item.name,
            filePath: file.path,
            moduleSpecifier: imported.specifier,
          })
          continue
        }

        const owner = findItemForSourcePath(sourceOwners, imported.resolvedPath)
        if (!owner) {
          diagnostics.push({
            code: 'import-outside-registry-item',
            message: `Import "${imported.specifier}" resolves to a file that is not installable in a registry item`,
            severity: 'error',
            stage: 'graph',
            itemName: item.name,
            filePath: file.path,
            moduleSpecifier: imported.specifier,
          })
          continue
        }
        if (owner.id === item.id) {
          continue
        }
        registryDependencies.add(owner.name)
        edges.push({
          from: item.id,
          to: owner.id,
          kind: 'import',
          filePath: file.path,
          moduleSpecifier: imported.specifier,
        })
      }
    }

    for (const iconName of item.iconDependencies) {
      const icon = itemsByKey.get(itemKey(item.style, iconName))
      if (!icon || icon.type !== 'registry:icon') {
        diagnostics.push({
          code: 'icon-dependency-not-found',
          message: `Icon dependency "${iconName}" does not exist in style "${item.style}"`,
          severity: 'error',
          stage: 'graph',
          itemName: item.name,
          dependency: iconName,
        })
        continue
      }
      if (icon.id !== item.id) {
        registryDependencies.add(iconName)
        edges.push({ from: item.id, to: icon.id, kind: 'icon' })
      }
    }

    for (const packageName of Object.keys(
      item.config.dependencyVersions ?? {},
    ).sort()) {
      if (dependencyByPackage.has(packageName)) {
        continue
      }
      diagnostics.push({
        code: 'unused-dependency-version',
        message: `Dependency version override "${packageName}" does not match an emitted external package`,
        severity: 'error',
        stage: 'graph',
        itemName: item.name,
        filePath: item.configPath,
        dependency: packageName,
      })
    }

    resolvedItems.push({
      ...item,
      dependencies: uniqueSorted(dependencyByPackage.values()),
      devDependencies: [],
      registryDependencies: uniqueSorted(registryDependencies),
    })
  }

  return {
    items: resolvedItems,
    edges: Array.from(
      new Map(edges.map((edge) => [edgeKey(edge), edge])).values(),
    ).sort((left, right) => edgeKey(left).localeCompare(edgeKey(right), 'en')),
    diagnostics,
    providedPackages: uniqueSorted(providedPackages),
  }
}
