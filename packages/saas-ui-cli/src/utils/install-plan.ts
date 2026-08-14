import { existsSync, promises as fs, lstatSync } from 'node:fs'
import path from 'node:path'

import type { Config } from '#utils/get-config'
import { acquireInstallTransactionLock } from '#utils/install-transaction-lock'
import {
  type SupportedPackageName,
  getSupportedPackagePolicy,
  normalizeSupportedPackageDeclaration,
  packageCompatibilityIssue,
  supportedPackageDeclaration,
} from '#utils/package-compatibility'
import {
  type ReconciledPackageDependencies,
  parsePackageDependency,
  reconcilePackageDependencies,
} from '#utils/package-dependencies'
import {
  hashContent,
  verifiedRegistryItemContentHash,
} from '#utils/registry-content-hash'
import {
  type RegistryClient,
  getDefaultRegistryClient,
} from '#utils/registry/client'
import { resolveRegistryGraph } from '#utils/registry/graph'
import { registryReferenceItemName } from '#utils/registry/namespaces'
import {
  REGISTRY_SCHEMA_VERSION,
  type RegistryItem,
  registryInstallableItemSchema,
} from '#utils/registry/schema'
import { transform } from '#utils/transformers'
import { transformImport } from '#utils/transformers/transform-import'
import { transformRsc } from '#utils/transformers/transform-rsc'
import {
  type DependencyInstallRequest,
  type DependencyInstaller,
  installDependencies,
} from '#utils/updaters/update-dependencies'

export type InstallMode = 'add' | 'update'
export type PlannedFileAction = 'create' | 'update' | 'unchanged' | 'conflict'

export interface InstallConflict {
  kind:
    | 'collision'
    | 'dependency-classification'
    | 'dependency-version'
    | 'existing'
    | 'exclusive-selection'
    | 'unsafe-path'
  target: string
  items: string[]
  message: string
}

export interface PlannedInstallFile {
  item: string
  source: string
  target: string
  absoluteTarget: string
  content: string
  hash: string
  previousHash?: string
  action: PlannedFileAction
}

export interface PlannedInstallItem {
  reference: string
  name: string
  version?: string
  contentHash: string
  exclusiveGroup?: string
  conflicts?: string[]
  registryDependencies: string[]
  files: PlannedInstallFile[]
}

export interface InstallPlan {
  schemaVersion: typeof REGISTRY_SCHEMA_VERSION
  style: string
  mode: InstallMode
  requestedItems: string[]
  transitiveItems: string[]
  replacedItems: string[]
  items: PlannedInstallItem[]
  dependencies: string[]
  devDependencies: string[]
  conflicts: InstallConflict[]
  files: PlannedInstallFile[]
  docs: string[]
}

export interface CreateInstallPlanOptions {
  client?: RegistryClient
  overwrite?: boolean
  force?: boolean
  mode?: InstallMode
  dependencies?: string[]
  devDependencies?: string[]
}

export interface ApplyInstallPlanOptions {
  /**
   * Dependency installers mutate package-manager state outside the file
   * transaction. A successful dependency install cannot be rolled back if a
   * later file commit fails. Implementations must be idempotent.
   */
  dependencyInstaller?: DependencyInstaller
  silent?: boolean
  transaction?: InstallTransactionOptions
  stagedProjectFiles?: readonly StagedProjectFile[]
}

export type ProjectFileExpectation =
  | { exists: false }
  | { exists: true; hash: string }

export interface StagedProjectFile {
  /** Absolute path inside the configured project root. */
  absoluteTarget: string
  content: string
  /** State captured before planning; apply rechecks it under the writer lock. */
  expected: ProjectFileExpectation
}

export interface AppliedProjectFile {
  absoluteTarget: string
  target: string
  hash: string
  action: Extract<PlannedFileAction, 'create' | 'update' | 'unchanged'>
}

export interface InstallTransactionOptions {
  lockTimeoutMs?: number
  lockPollMs?: number
  staleLockMs?: number
  onPhase?: (
    phase:
      | 'locked'
      | 'dependencies-installed'
      | 'before-commit'
      | 'files-committed'
      | 'committed'
      | 'rollback',
  ) => void | Promise<void>
}

const conventionalRoots = {
  components: 'components',
  ui: 'ui',
  lib: 'lib',
  hooks: 'hooks',
  icons: 'icons',
} as const

type ConventionalRoot = keyof typeof conventionalRoots

function isWithin(root: string, target: string) {
  const relative = path.relative(root, target)
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  )
}

function pathExistsIncludingSymlink(target: string) {
  try {
    lstatSync(target)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false
    throw error
  }
}

function toPosix(value: string) {
  return value.split(path.sep).join('/')
}

function resolvedRoot(config: Config, root: ConventionalRoot) {
  return config.resolvedPaths[root]
}

function defaultRootForType(type: RegistryItem['type']): ConventionalRoot {
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

function splitConventionalPath(value: string) {
  const normalized = value.replace(/^\.\//, '').replaceAll('\\', '/')
  const [first, ...rest] = normalized.split('/')
  if (first && first in conventionalRoots) {
    return {
      root: first as ConventionalRoot,
      relative: rest.join('/'),
    }
  }
  return null
}

function convertExtension(filePath: string, tsx: boolean) {
  if (tsx) return filePath
  return filePath.replace(/\.tsx?$/, (extension) =>
    extension === '.tsx' ? '.jsx' : '.js',
  )
}

export function resolveRegistryFileTarget(
  file: NonNullable<RegistryItem['files']>[number],
  config: Config,
) {
  const source = file.path.replaceAll('\\', '/')
  if (source.startsWith('/') || source.split('/').includes('..')) {
    throw new Error(`Registry file path escapes its item: ${file.path}`)
  }

  let root: ConventionalRoot
  let relative: string
  if (file.target) {
    const target = file.target.replaceAll('\\', '/')
    if (target.startsWith('~/')) {
      const absolute = path.resolve(config.resolvedPaths.cwd, target.slice(2))
      return convertExtension(absolute, config.tsx)
    }
    if (target.startsWith('/') || target.split('/').includes('..')) {
      throw new Error(
        `Registry file target escapes the project: ${file.target}`,
      )
    }
    const conventional = splitConventionalPath(target)
    if (conventional) {
      root = conventional.root
      relative = conventional.relative
    } else {
      root = defaultRootForType(file.type)
      relative = target
    }
  } else {
    root = defaultRootForType(file.type)
    const conventional = splitConventionalPath(source)
    relative = conventional?.root === root ? conventional.relative : source
  }

  if (!relative || relative.endsWith('/')) {
    throw new Error(`Registry file has an invalid target path: ${file.path}`)
  }
  return convertExtension(
    path.resolve(resolvedRoot(config, root), relative),
    config.tsx,
  )
}

async function pathSafetyIssue(cwd: string, target: string) {
  const root = await fs.realpath(cwd)
  if (
    pathExistsIncludingSymlink(target) &&
    (await fs.lstat(target)).isSymbolicLink()
  ) {
    return 'target is a symbolic link'
  }
  const missing: string[] = []
  let existing = target
  while (!pathExistsIncludingSymlink(existing)) {
    const parent = path.dirname(existing)
    if (parent === existing) break
    missing.unshift(path.basename(existing))
    existing = parent
  }
  const canonicalTarget = path.join(await fs.realpath(existing), ...missing)
  if (!isWithin(root, canonicalTarget))
    return 'target is outside the project root'

  const relative = path.relative(root, canonicalTarget)
  let current = root
  for (const segment of relative.split(path.sep)) {
    current = path.join(current, segment)
    try {
      const stats = await fs.lstat(current)
      if (stats.isSymbolicLink()) {
        const resolved = await fs.realpath(current)
        if (!isWithin(root, resolved))
          return 'target traverses a symlink outside the project'
        if (current === canonicalTarget) return 'target is a symbolic link'
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') break
      throw error
    }
  }
  return null
}

async function canonicalTargetPath(target: string) {
  const missing: string[] = []
  let existing = target
  while (!pathExistsIncludingSymlink(existing)) {
    const parent = path.dirname(existing)
    if (parent === existing) break
    missing.unshift(path.basename(existing))
    existing = parent
  }
  return path.join(await fs.realpath(existing), ...missing)
}

/** Capture a project file's optimistic-CAS state without writing it. */
export async function prepareStagedProjectFile(
  cwd: string,
  absoluteTarget: string,
  content: string,
): Promise<StagedProjectFile> {
  if (!path.isAbsolute(absoluteTarget)) {
    throw new Error('Staged project file targets must be absolute paths.')
  }
  const safetyIssue = await pathSafetyIssue(cwd, absoluteTarget)
  if (safetyIssue) {
    throw new Error(
      `Unsafe staged project file "${absoluteTarget}": ${safetyIssue}.`,
    )
  }
  const expected: ProjectFileExpectation = existsSync(absoluteTarget)
    ? { exists: true, hash: hashContent(await fs.readFile(absoluteTarget)) }
    : { exists: false }
  return { absoluteTarget, content, expected }
}

function registryExclusivity(item: RegistryItem) {
  const exclusiveGroup = item.meta?.exclusiveGroup
  const declaredConflicts = item.meta?.conflicts
  return {
    exclusiveGroup:
      typeof exclusiveGroup === 'string' ? exclusiveGroup : undefined,
    conflicts: Array.isArray(declaredConflicts)
      ? declaredConflicts.filter(
          (value): value is string => typeof value === 'string',
        )
      : [],
  }
}

async function reconcileProjectPackageDependencies(
  cwd: string,
  incoming: ReconciledPackageDependencies,
) {
  // Known framework packages use their shared supported-range policy. Other
  // packages keep the conservative exact-spec policy below.
  const packagePath = path.join(cwd, 'package.json')
  let manifest: {
    dependencies?: Record<string, unknown>
    devDependencies?: Record<string, unknown>
    optionalDependencies?: Record<string, unknown>
    peerDependencies?: Record<string, unknown>
  } = {}
  if (existsSync(packagePath)) {
    manifest = JSON.parse(
      await fs.readFile(packagePath, 'utf8'),
    ) as typeof manifest
  }
  const issues = [...incoming.issues]
  const sections = {
    dependencies: manifest.dependencies ?? {},
    devDependencies: manifest.devDependencies ?? {},
    optionalDependencies: manifest.optionalDependencies ?? {},
    peerDependencies: manifest.peerDependencies ?? {},
  }

  const reconcile = (
    declarations: readonly string[],
    classification: 'runtime' | 'development',
  ) => {
    const accepted: string[] = []
    for (const declaration of declarations) {
      const parsed = parsePackageDependency(declaration)
      const knownPolicy = getSupportedPackagePolicy(parsed.name)
      const normalizedDeclaration = knownPolicy
        ? supportedPackageDeclaration(parsed.name as SupportedPackageName)
        : declaration
      const requestedCompatibilityIssue = parsed.specifier
        ? packageCompatibilityIssue(parsed.name, parsed.specifier, { cwd })
        : null
      if (requestedCompatibilityIssue) {
        issues.push({
          kind: 'dependency-version' as const,
          name: parsed.name,
          declarations: [declaration],
          message: requestedCompatibilityIssue,
        })
        continue
      }
      const expectedSection =
        classification === 'runtime' ? 'dependencies' : 'devDependencies'
      const existingEntries = Object.entries(sections).flatMap(
        ([section, values]) =>
          Object.hasOwn(values, parsed.name)
            ? [{ section, value: values[parsed.name] }]
            : [],
      )
      if (existingEntries.some((entry) => typeof entry.value !== 'string')) {
        issues.push({
          kind: 'dependency-version' as const,
          name: parsed.name,
          declarations: [declaration],
          message: `Dependency "${parsed.name}" has a non-string package.json declaration.`,
        })
        continue
      }
      const declarations = existingEntries.map((entry) => ({
        section: entry.section,
        specifier: entry.value as string,
      }))
      if (declarations.length > 1) {
        issues.push({
          kind: 'dependency-classification' as const,
          name: parsed.name,
          declarations: [
            declaration,
            ...declarations.map(
              (entry) => `${entry.section}:${parsed.name}@${entry.specifier}`,
            ),
          ].sort(),
          message: `Dependency "${parsed.name}" is declared in multiple package.json dependency sections: ${declarations.map((entry) => entry.section).join(', ')}.`,
        })
        continue
      }
      const existing = declarations[0]
      if (existing && existing.section !== expectedSection) {
        issues.push({
          kind: 'dependency-classification' as const,
          name: parsed.name,
          declarations: [
            declaration,
            `${existing.section}:${parsed.name}@${existing.specifier}`,
          ].sort(),
          message: `Dependency "${parsed.name}" is requested as ${classification} but is already declared in ${existing.section} in package.json.`,
        })
        continue
      }
      const sameSpec = existing?.specifier
      if (typeof sameSpec !== 'string') {
        accepted.push(normalizedDeclaration)
        continue
      }
      const existingCompatibilityIssue = packageCompatibilityIssue(
        parsed.name,
        sameSpec,
        { cwd },
      )
      if (existingCompatibilityIssue) {
        issues.push({
          kind: 'dependency-version' as const,
          name: parsed.name,
          declarations: [declaration, `${parsed.name}@${sameSpec}`].sort(),
          message: existingCompatibilityIssue,
        })
        continue
      }
      // Registry requirements for known framework packages are canonicalized
      // to the centralized compatibility policy. Any existing declaration
      // proven compatible with that policy satisfies the request; this avoids
      // incorrectly assuming two arbitrary compatible-looking ranges overlap.
      if (knownPolicy) continue
      if (parsed.specifier !== undefined && parsed.specifier !== sameSpec) {
        issues.push({
          kind: 'dependency-version' as const,
          name: parsed.name,
          declarations: [declaration, `${parsed.name}@${sameSpec}`].sort(),
          message: `Dependency "${parsed.name}" requests "${parsed.specifier}" but package.json declares "${sameSpec}".`,
        })
      }
      // An unversioned request accepts the installed declaration. Exact
      // explicit matches are already satisfied and need no package mutation.
    }
    return accepted
  }

  return {
    dependencies: reconcile(incoming.dependencies, 'runtime'),
    devDependencies: reconcile(incoming.devDependencies, 'development'),
    issues,
  } satisfies ReconciledPackageDependencies
}

export async function createInstallPlan(
  requested: readonly string[],
  config: Config,
  options: CreateInstallPlanOptions = {},
): Promise<InstallPlan> {
  const client = options.client ?? getDefaultRegistryClient()
  const graph = await resolveRegistryGraph(
    requested,
    config.style,
    client,
    config.registries,
  )
  const mode = options.mode ?? 'add'
  const conflicts: InstallConflict[] = []
  const files: PlannedInstallFile[] = []
  const targets = new Map<string, PlannedInstallFile>()
  const items: PlannedInstallItem[] = []
  const graphNames = new Set(graph.items.map((item) => item.name))
  const incomingGroups = new Map<string, string[]>()
  const incomingGroupByName = new Map<string, string>()
  const replacements = new Set<string>()
  const incomingConflictPairs = new Set<string>()

  for (const item of graph.items) {
    const exclusivity = registryExclusivity(item)
    if (exclusivity.exclusiveGroup) {
      const group = incomingGroups.get(exclusivity.exclusiveGroup) ?? []
      group.push(item.name)
      incomingGroups.set(exclusivity.exclusiveGroup, group)
      incomingGroupByName.set(item.name, exclusivity.exclusiveGroup)
    }
    for (const conflictName of exclusivity.conflicts) {
      if (!graphNames.has(conflictName)) continue
      incomingConflictPairs.add([item.name, conflictName].sort().join('\0'))
    }
    for (const installedName of config.installed ?? []) {
      const installedItemName =
        registryReferenceItemName(installedName) ?? installedName
      if (
        installedItemName !== item.name &&
        !graphNames.has(installedItemName) &&
        exclusivity.conflicts.includes(installedItemName)
      ) {
        replacements.add(installedName)
      }
    }
  }

  for (const [group, names] of incomingGroups) {
    if (names.length < 2) continue
    conflicts.push({
      kind: 'exclusive-selection',
      target: group,
      items: names,
      message:
        `Registry items ${names.map((name) => `"${name}"`).join(', ')}` +
        ` are mutually exclusive alternatives in group "${group}".`,
    })
  }
  for (const pair of incomingConflictPairs) {
    const names = pair.split('\0')
    if (
      incomingGroupByName.get(names[0]!) === incomingGroupByName.get(names[1]!)
    ) {
      continue
    }
    conflicts.push({
      kind: 'exclusive-selection',
      target: names.join(','),
      items: names,
      message:
        `Registry items ${names.map((name) => `"${name}"`).join(' and ')}` +
        ' declare an exclusive conflict and cannot be installed together.',
    })
  }

  for (const [itemIndex, unresolvedItem] of graph.items.entries()) {
    const itemReference = graph.itemReferences[itemIndex]!
    const parsedItem = registryInstallableItemSchema.safeParse(unresolvedItem)
    if (!parsedItem.success) {
      throw new Error(
        `Registry item "${unresolvedItem.name}" is not a complete install payload: ${parsedItem.error.issues
          .map((issue) => `${issue.path.join('.') || 'item'}: ${issue.message}`)
          .join('; ')}`,
      )
    }
    const item = parsedItem.data
    const contentHash = verifiedRegistryItemContentHash(item)
    const exclusivity = registryExclusivity(item)
    const itemFiles: PlannedInstallFile[] = []
    for (const file of item.files ?? []) {
      let absoluteTarget: string
      try {
        absoluteTarget = resolveRegistryFileTarget(file, config)
      } catch (error) {
        const target = file.target ?? file.path
        conflicts.push({
          kind: 'unsafe-path',
          target,
          items: [itemReference],
          message: error instanceof Error ? error.message : String(error),
        })
        continue
      }

      const target = toPosix(
        path.relative(config.resolvedPaths.cwd, absoluteTarget),
      )
      const safetyIssue = await pathSafetyIssue(
        config.resolvedPaths.cwd,
        absoluteTarget,
      )
      if (safetyIssue) {
        conflicts.push({
          kind: 'unsafe-path',
          target,
          items: [itemReference],
          message: `Unsafe install target "${target}": ${safetyIssue}.`,
        })
        continue
      }

      const content = await transform(
        {
          filename: file.path,
          raw: file.content,
          config,
          transformJsx: !config.tsx,
        },
        [transformImport, transformRsc],
      )
      const hash = hashContent(content)
      let previousHash: string | undefined
      let action: PlannedFileAction = 'create'
      if (existsSync(absoluteTarget)) {
        previousHash = hashContent(await fs.readFile(absoluteTarget))
        if (previousHash === hash) {
          action = 'unchanged'
        } else if (mode === 'update' || options.overwrite || options.force) {
          action = 'update'
        } else {
          action = 'conflict'
          conflicts.push({
            kind: 'existing',
            target,
            items: [itemReference],
            message: `File "${target}" already exists with different content. Use --overwrite to replace it.`,
          })
        }
      }

      const plannedFile: PlannedInstallFile = {
        item: itemReference,
        source: file.path,
        target,
        absoluteTarget,
        content,
        hash,
        previousHash,
        action,
      }
      const collisionKey = await canonicalTargetPath(absoluteTarget)
      const collision = targets.get(collisionKey)
      if (collision) {
        plannedFile.action = 'conflict'
        collision.action = 'conflict'
        conflicts.push({
          kind: 'collision',
          target,
          items: [collision.item, itemReference],
          message: `Registry files "${collision.source}" and "${file.path}" both target "${target}".`,
        })
      } else {
        targets.set(collisionKey, plannedFile)
      }
      files.push(plannedFile)
      itemFiles.push(plannedFile)
    }
    items.push({
      reference: itemReference,
      name: item.name,
      ...(item.version ? { version: item.version } : {}),
      contentHash,
      ...(exclusivity.exclusiveGroup
        ? { exclusiveGroup: exclusivity.exclusiveGroup }
        : {}),
      ...(exclusivity.conflicts.length
        ? { conflicts: exclusivity.conflicts }
        : {}),
      registryDependencies: graph.dependenciesByReference[itemReference] ?? [],
      files: itemFiles,
    })
  }

  const packageDependencies = await reconcileProjectPackageDependencies(
    config.resolvedPaths.cwd,
    reconcilePackageDependencies(
      [
        ...(options.dependencies ?? []),
        ...graph.items.flatMap((item) => item.dependencies ?? []),
      ].map((declaration) =>
        normalizeSupportedPackageDeclaration(declaration, {
          cwd: config.resolvedPaths.cwd,
        }),
      ),
      [
        ...(options.devDependencies ?? []),
        ...graph.items.flatMap((item) => item.devDependencies ?? []),
      ].map((declaration) =>
        normalizeSupportedPackageDeclaration(declaration, {
          cwd: config.resolvedPaths.cwd,
        }),
      ),
    ),
  )
  for (const issue of packageDependencies.issues) {
    conflicts.push({
      kind: issue.kind,
      target: issue.name,
      items: issue.declarations,
      message: issue.message,
    })
  }

  return {
    schemaVersion: REGISTRY_SCHEMA_VERSION,
    style: config.style,
    mode,
    requestedItems: [...graph.requestedReferences],
    transitiveItems: [...graph.transitiveReferences],
    replacedItems: [...replacements].sort(),
    items,
    dependencies: packageDependencies.dependencies,
    devDependencies: packageDependencies.devDependencies,
    conflicts,
    files,
    docs: graph.items.flatMap((item) => (item.docs ? [item.docs] : [])),
  }
}

interface TransactionEntry {
  file: PlannedInstallFile
  staged: string
  backup?: string
  installed: boolean
}

type NormalizedProjectFile = PlannedInstallFile & {
  action: AppliedProjectFile['action']
}

async function assertFileCas(file: PlannedInstallFile, cwd: string) {
  const safetyIssue = await pathSafetyIssue(cwd, file.absoluteTarget)
  if (safetyIssue) {
    throw new Error(`Unsafe install target "${file.target}": ${safetyIssue}.`)
  }
  const exists = existsSync(file.absoluteTarget)
  if (file.previousHash === undefined) {
    if (exists) {
      throw new Error(
        `Install target "${file.target}" changed after planning (expected it to be absent).`,
      )
    }
    return
  }
  if (!exists) {
    throw new Error(
      `Install target "${file.target}" changed after planning (expected an existing file).`,
    )
  }
  const actualHash = hashContent(await fs.readFile(file.absoluteTarget))
  if (actualHash !== file.previousHash) {
    throw new Error(
      `Install target "${file.target}" changed after planning (content hash mismatch).`,
    )
  }
}

async function assertFilesCas(
  files: readonly PlannedInstallFile[],
  cwd: string,
) {
  for (const file of files) await assertFileCas(file, cwd)
}

async function assertCommittedFiles(
  files: readonly PlannedInstallFile[],
  cwd: string,
) {
  for (const file of files) {
    const safetyIssue = await pathSafetyIssue(cwd, file.absoluteTarget)
    if (safetyIssue) {
      throw new Error(`Unsafe install target "${file.target}": ${safetyIssue}.`)
    }
    if (!existsSync(file.absoluteTarget)) {
      throw new Error(
        `Install target "${file.target}" changed before commit (file is missing).`,
      )
    }
    const actualHash = hashContent(await fs.readFile(file.absoluteTarget))
    if (actualHash !== file.hash) {
      throw new Error(
        `Install target "${file.target}" changed before commit (content hash mismatch).`,
      )
    }
  }
}

async function normalizeStagedProjectFiles(
  cwd: string,
  stagedFiles: readonly StagedProjectFile[],
  registryFiles: readonly PlannedInstallFile[],
) {
  const claims = new Map<string, string>()
  for (const file of registryFiles) {
    const safetyIssue = await pathSafetyIssue(cwd, file.absoluteTarget)
    if (safetyIssue) {
      throw new Error(`Unsafe install target "${file.target}": ${safetyIssue}.`)
    }
    claims.set(
      await canonicalTargetPath(file.absoluteTarget),
      `registry item "${file.item}"`,
    )
  }

  const metadataDir = path.resolve(cwd, '.saas-ui')
  const result: NormalizedProjectFile[] = []
  for (const staged of stagedFiles) {
    if (!path.isAbsolute(staged.absoluteTarget)) {
      throw new Error('Staged project file targets must be absolute paths.')
    }
    const absoluteTarget = path.resolve(staged.absoluteTarget)
    const safetyIssue = await pathSafetyIssue(cwd, absoluteTarget)
    if (safetyIssue) {
      throw new Error(
        `Unsafe staged project file "${absoluteTarget}": ${safetyIssue}.`,
      )
    }
    if (isWithin(metadataDir, absoluteTarget)) {
      throw new Error(
        `Staged project file "${absoluteTarget}" collides with installer metadata.`,
      )
    }
    if (
      staged.expected.exists &&
      !/^[a-f0-9]{64}$/.test(staged.expected.hash)
    ) {
      throw new Error(
        `Staged project file "${absoluteTarget}" has an invalid expected SHA-256 hash.`,
      )
    }
    const canonical = await canonicalTargetPath(absoluteTarget)
    const target = toPosix(path.relative(cwd, absoluteTarget))
    const owner = claims.get(canonical)
    if (owner) {
      throw new Error(`Staged project file "${target}" collides with ${owner}.`)
    }
    claims.set(canonical, `staged project file "${target}"`)

    const hash = hashContent(staged.content)
    const previousHash = staged.expected.exists
      ? staged.expected.hash
      : undefined
    result.push({
      item: '$project',
      source: target,
      target,
      absoluteTarget,
      content: staged.content,
      hash,
      previousHash,
      action:
        previousHash === hash
          ? 'unchanged'
          : staged.expected.exists
            ? 'update'
            : 'create',
    })
  }
  return result
}

function missingDirectories(directory: string, cwd: string) {
  const result: string[] = []
  let current = directory
  while (isWithin(cwd, current) && current !== cwd && !existsSync(current)) {
    result.push(current)
    current = path.dirname(current)
  }
  return result
}

export async function applyInstallPlan(
  plan: InstallPlan,
  config: Config,
  options: ApplyInstallPlanOptions = {},
) {
  if (plan.conflicts.length) {
    throw new Error(
      `Install plan has ${plan.conflicts.length} conflict(s):\n${plan.conflicts
        .map((conflict) => `- ${conflict.message}`)
        .join('\n')}`,
    )
  }

  const projectFiles = await normalizeStagedProjectFiles(
    config.resolvedPaths.cwd,
    options.stagedProjectFiles ?? [],
    plan.files,
  )
  const transactionFiles = [...plan.files, ...projectFiles]
  const actionable = transactionFiles.filter(
    (file) => file.action === 'create' || file.action === 'update',
  )
  const metadataDir = path.join(config.resolvedPaths.cwd, '.saas-ui')
  const metadataDirExisted = existsSync(metadataDir)
  const releaseWriter = await acquireInstallTransactionLock(
    config.resolvedPaths.cwd,
    options.transaction,
  )
  const workspace = path.join(
    metadataDir,
    `.install.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}`,
  )
  const entries: TransactionEntry[] = []
  const createdDirectories = new Set<string>()
  try {
    await options.transaction?.onPhase?.('locked')
    await assertFilesCas(transactionFiles, config.resolvedPaths.cwd)
    await fs.mkdir(path.join(workspace, 'stage'), { recursive: true })
    for (const [index, file] of actionable.entries()) {
      const safetyIssue = await pathSafetyIssue(
        config.resolvedPaths.cwd,
        file.absoluteTarget,
      )
      if (safetyIssue) {
        throw new Error(
          `Unsafe install target "${file.target}": ${safetyIssue}.`,
        )
      }
      const staged = path.join(workspace, 'stage', String(index))
      await fs.writeFile(staged, file.content, 'utf8')
      entries.push({ file, staged, installed: false })
    }

    const dependencyRequest: DependencyInstallRequest = {
      cwd: config.resolvedPaths.cwd,
      dependencies: plan.dependencies,
      devDependencies: plan.devDependencies,
    }
    await installDependencies(dependencyRequest, {
      installer: options.dependencyInstaller,
      silent: options.silent,
    })

    await options.transaction?.onPhase?.('dependencies-installed')
    await assertFilesCas(transactionFiles, config.resolvedPaths.cwd)
    await options.transaction?.onPhase?.('before-commit')

    for (const [index, entry] of entries.entries()) {
      await assertFileCas(entry.file, config.resolvedPaths.cwd)
      for (const directory of missingDirectories(
        path.dirname(entry.file.absoluteTarget),
        config.resolvedPaths.cwd,
      )) {
        createdDirectories.add(directory)
      }
      await fs.mkdir(path.dirname(entry.file.absoluteTarget), {
        recursive: true,
      })
      await assertFileCas(entry.file, config.resolvedPaths.cwd)
      if (existsSync(entry.file.absoluteTarget)) {
        entry.backup = path.join(workspace, 'backup', String(index))
        await fs.mkdir(path.dirname(entry.backup), { recursive: true })
        await fs.rename(entry.file.absoluteTarget, entry.backup)
      }
      try {
        await fs.rename(entry.staged, entry.file.absoluteTarget)
        entry.installed = true
      } catch (error) {
        if (entry.backup) {
          await fs.rename(entry.backup, entry.file.absoluteTarget)
          entry.backup = undefined
        }
        throw error
      }
    }

    await options.transaction?.onPhase?.('files-committed')
    await assertCommittedFiles(transactionFiles, config.resolvedPaths.cwd)
  } catch (error) {
    try {
      await options.transaction?.onPhase?.('rollback')
    } catch {
      // A transaction hook must not prevent restoration of prior file state.
    }
    for (const entry of [...entries].reverse()) {
      if (entry.installed) {
        await fs.rm(entry.file.absoluteTarget, { force: true })
      }
      if (entry.backup && existsSync(entry.backup)) {
        await fs.mkdir(path.dirname(entry.file.absoluteTarget), {
          recursive: true,
        })
        await fs.rename(entry.backup, entry.file.absoluteTarget)
      }
    }
    for (const directory of [...createdDirectories].sort(
      (left, right) => right.length - left.length,
    )) {
      await fs.rmdir(directory).catch(() => undefined)
    }
    throw error
  } finally {
    const workspaceSafetyIssue = await pathSafetyIssue(
      config.resolvedPaths.cwd,
      workspace,
    )
    if (!workspaceSafetyIssue) {
      await fs.rm(workspace, { force: true, recursive: true })
    }
    await releaseWriter()
    if (!metadataDirExisted) {
      await fs.rmdir(metadataDir).catch(() => undefined)
    }
  }

  await options.transaction?.onPhase?.('committed')

  return {
    created: plan.files.filter((file) => file.action === 'create'),
    updated: plan.files.filter((file) => file.action === 'update'),
    unchanged: plan.files.filter((file) => file.action === 'unchanged'),
    projectFiles: projectFiles.map(
      ({ absoluteTarget, target, hash, action }): AppliedProjectFile => ({
        absoluteTarget,
        target,
        hash,
        action,
      }),
    ),
  }
}
