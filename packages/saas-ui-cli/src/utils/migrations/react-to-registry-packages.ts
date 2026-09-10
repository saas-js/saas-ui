import { createHash } from 'node:crypto'
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

import {
  getSupportedPackagePolicy,
  packageCompatibilityIssue,
} from '#utils/package-compatibility'

export type MigrationPackageActionKind = 'add' | 'remove' | 'retain'
export type MigrationPackageActionStatus =
  | 'applied'
  | 'manual'
  | 'planned'
  | 'unchanged'

export interface MigrationPackageAction {
  package: string
  action: MigrationPackageActionKind
  status: MigrationPackageActionStatus
  section:
    | 'dependencies'
    | 'devDependencies'
    | 'optionalDependencies'
    | 'peerDependencies'
    | 'multiple'
    | 'none'
  specifier?: string
  required: boolean
  reason: string
}

export interface MigrationPackagePlan {
  cwd: string
  manifestPath: string
  before: string
  after: string
  beforeHash: string
  actions: MigrationPackageAction[]
  manualActions: MigrationPackageAction[]
  changed: boolean
  applied?: boolean
}

export interface MigrationPackagePlanRequest {
  cwd: string
  requiredPackages: readonly string[]
  removeLegacyPackage: boolean
  legacyReferences: readonly string[]
  primitiveReferences?: readonly string[]
}

/** Injectable boundary for package manifest/dependency mutations. */
export interface MigrationPackageAdapter {
  plan(request: MigrationPackagePlanRequest): Promise<MigrationPackagePlan>
  apply(plan: MigrationPackagePlan): Promise<void>
  rollback(plan: MigrationPackagePlan): Promise<void>
}

const dependencySections = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
] as const

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function packageDeclarations(
  manifest: Record<string, unknown>,
  packageName: string,
) {
  return dependencySections.flatMap((section) => {
    const values = manifest[section]
    if (!isRecord(values) || typeof values[packageName] !== 'string') return []
    return [{ section, specifier: values[packageName] as string }]
  })
}

function malformedPackageSections(
  manifest: Record<string, unknown>,
  packageName: string,
) {
  return dependencySections.filter((section) => {
    const values = manifest[section]
    return (
      isRecord(values) &&
      Object.hasOwn(values, packageName) &&
      typeof values[packageName] !== 'string'
    )
  })
}

function sortedRecord(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).sort(([left], [right]) => left.localeCompare(right)),
  )
}

function serializeManifest(manifest: Record<string, unknown>, before: string) {
  const indent = /\n([ \t]+)\S/.exec(before)?.[1] ?? '  '
  return `${JSON.stringify(manifest, null, indent)}\n`
}

async function writeAtomic(target: string, content: string) {
  const temporary = `${target}.saas-ui-migrate.${process.pid}.${Date.now()}.${Math.random()
    .toString(36)
    .slice(2)}`
  await fs.writeFile(temporary, content, 'utf8')
  try {
    await fs.rename(temporary, target)
  } catch (error) {
    await fs.rm(temporary, { force: true })
    throw error
  }
}

export const fileMigrationPackageAdapter: MigrationPackageAdapter = {
  async plan(request) {
    const manifestPath = path.join(request.cwd, 'package.json')
    if (!existsSync(manifestPath)) {
      throw new Error(`Package manifest is missing at ${manifestPath}.`)
    }
    const before = await fs.readFile(manifestPath, 'utf8')
    let parsed: unknown
    try {
      parsed = JSON.parse(before)
    } catch (error) {
      throw new Error(
        `Invalid package manifest at ${manifestPath}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
    if (!isRecord(parsed)) {
      throw new Error(`Package manifest at ${manifestPath} must be an object.`)
    }
    const manifest = structuredClone(parsed)
    const actions: MigrationPackageAction[] = []
    let mutated = false
    const requiredPackages = [...new Set(request.requiredPackages)].sort()

    for (const packageName of requiredPackages) {
      const malformed = malformedPackageSections(manifest, packageName)
      if (malformed.length) {
        throw new Error(
          `Package "${packageName}" has a non-string declaration in ${malformed.join(', ')}. Migration cannot validate it safely.`,
        )
      }
      const declarations = packageDeclarations(manifest, packageName)
      if (declarations.length > 1) {
        throw new Error(
          `Package "${packageName}" is declared in multiple dependency sections: ${declarations.map((entry) => entry.section).join(', ')}. Migration cannot choose a classification safely.`,
        )
      }
      for (const declaration of declarations) {
        const issue = packageCompatibilityIssue(
          packageName,
          declaration.specifier,
          { cwd: request.cwd },
        )
        if (issue) {
          throw new Error(
            `${issue} Migration cannot retain the ${declaration.section} declaration.`,
          )
        }
      }
    }

    for (const packageName of requiredPackages) {
      const declarations = packageDeclarations(manifest, packageName)
      const runtime = declarations.find(
        (entry) => entry.section === 'dependencies',
      )
      if (runtime && declarations.length === 1) {
        actions.push({
          package: packageName,
          action: 'retain',
          status: 'unchanged',
          section: 'dependencies',
          specifier: runtime.specifier,
          required: true,
          reason: 'Required runtime dependency is already declared.',
        })
        continue
      }

      const previous = runtime ?? declarations[0]
      for (const declaration of declarations) {
        const section = manifest[declaration.section] as Record<string, unknown>
        delete section[packageName]
        manifest[declaration.section] = sortedRecord(section)
      }
      const dependencies = isRecord(manifest.dependencies)
        ? manifest.dependencies
        : {}
      const specifier =
        previous?.specifier ?? getSupportedPackagePolicy(packageName)?.specifier
      if (!specifier) {
        throw new Error(
          `No dependency specifier is configured for required package ${packageName}.`,
        )
      }
      dependencies[packageName] = specifier
      manifest.dependencies = sortedRecord(dependencies)
      mutated = true
      actions.push({
        package: packageName,
        action: runtime ? 'retain' : 'add',
        status: 'planned',
        section: 'dependencies',
        specifier,
        required: true,
        reason: previous
          ? 'Normalize the required runtime dependency in dependencies.'
          : 'Add a runtime dependency required by migrated imports.',
      })
    }

    const legacyDeclarations = packageDeclarations(manifest, '@saas-ui/react')
    const primitiveReferences = request.primitiveReferences ?? []
    if (legacyDeclarations.length) {
      if (request.legacyReferences.length > 0) {
        actions.push({
          package: '@saas-ui/react',
          action: 'retain',
          status: 'manual',
          section:
            legacyDeclarations.length === 1
              ? legacyDeclarations[0]!.section
              : 'multiple',
          required: true,
          reason: `Manual migration is required while legacy references remain: ${
            request.legacyReferences.join(', ') ||
            'the complete project was not verified'
          }.`,
        })
      } else if (primitiveReferences.length > 0) {
        const runtime = legacyDeclarations.find(
          (entry) => entry.section === 'dependencies',
        )
        actions.push({
          package: '@saas-ui/react',
          action: 'retain',
          status: 'unchanged',
          section:
            legacyDeclarations.length === 1
              ? legacyDeclarations[0]!.section
              : 'multiple',
          specifier: runtime?.specifier,
          required: true,
          reason:
            'Installed templates still import unstyled primitives from @saas-ui/react.',
        })
      } else if (request.removeLegacyPackage) {
        for (const declaration of legacyDeclarations) {
          const section = manifest[declaration.section] as Record<
            string,
            unknown
          >
          delete section['@saas-ui/react']
          manifest[declaration.section] = sortedRecord(section)
        }
        mutated = true
        actions.push({
          package: '@saas-ui/react',
          action: 'remove',
          status: 'planned',
          section:
            legacyDeclarations.length === 1
              ? legacyDeclarations[0]!.section
              : 'multiple',
          required: false,
          reason: 'No static project references remain after migration.',
        })
      }
    } else if (request.legacyReferences.length > 0) {
      actions.push({
        package: '@saas-ui/react',
        action: 'retain',
        status: 'manual',
        section: 'none',
        required: true,
        reason: `Manual migration is required while legacy references remain: ${request.legacyReferences.join(
          ', ',
        )}.`,
      })
    }

    const after = mutated ? serializeManifest(manifest, before) : before
    const manualActions = actions.filter((action) => action.status === 'manual')
    return {
      cwd: request.cwd,
      manifestPath,
      before,
      after,
      beforeHash: hash(before),
      actions,
      manualActions,
      changed: after !== before,
    }
  },

  async apply(plan) {
    if (!plan.changed) return
    const current = await fs.readFile(plan.manifestPath, 'utf8')
    if (hash(current) !== plan.beforeHash) {
      throw new Error('Package manifest changed after migration planning.')
    }
    await writeAtomic(plan.manifestPath, plan.after)
    plan.applied = true
  },

  async rollback(plan) {
    if (!plan.changed || !plan.applied) return
    await writeAtomic(plan.manifestPath, plan.before)
    plan.applied = false
  },
}
