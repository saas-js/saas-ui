import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { z } from 'zod'

import { SCHEMA_URL } from '#constants'
import type { LocalContext } from '#context'
import { preFlightInit } from '#preflights/preflight-init'
import { withInstalledRegistryItems } from '#utils/components-config'
import { createMonorepoProject } from '#utils/create-project'
import {
  type EffectiveTsConfig,
  loadEffectiveTsConfig,
  serializePathTarget,
} from '#utils/effective-tsconfig'
import {
  type Config,
  type RawConfig,
  getRawConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '#utils/get-config'
import { getPackageManager } from '#utils/get-package-manager'
import { type ProjectInfo, getProjectInfo } from '#utils/get-project-info'
import { handleError } from '#utils/handle-error'
import { highlighter } from '#utils/highlighter'
import {
  type ApplyInstallPlanOptions,
  type InstallPlan,
  applyInstallPlan,
  createInstallPlan,
  prepareStagedProjectFile,
} from '#utils/install-plan'
import { logger } from '#utils/logger'
import {
  COLOR_MODE_PACKAGE,
  INIT_RUNTIME_PACKAGES,
  supportedPackageDeclaration,
} from '#utils/package-compatibility'
import { getRegistryStyles } from '#utils/registry'
import type { RegistryClient } from '#utils/registry/client'
import type { DependencyInstaller } from '#utils/updaters/update-dependencies'

export const INIT_DEPENDENCIES = INIT_RUNTIME_PACKAGES.map(
  supportedPackageDeclaration,
)

export const COLOR_MODE_DEPENDENCY =
  supportedPackageDeclaration(COLOR_MODE_PACKAGE)
export const DEFAULT_STARTER_COMPONENTS = ['sidebar'] as const

export const colorModeOptionSchema = z.enum(['on', 'off'])

export const initOptionsFlagsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean().default(false),
  defaults: z.boolean().default(false),
  force: z.boolean().default(false),
  silent: z.boolean().default(false),
  colorMode: colorModeOptionSchema.optional(),
  starter: z.boolean().default(false),
  style: z.string().min(1).optional(),
  system: z.literal('chakra').optional(),
  componentsAlias: z.string().min(1).optional(),
  utilsAlias: z.string().min(1).optional(),
  uiAlias: z.string().min(1).optional(),
  libAlias: z.string().min(1).optional(),
  hooksAlias: z.string().min(1).optional(),
  iconsAlias: z.string().min(1).optional(),
})

export type InitCommandFlags = z.infer<typeof initOptionsFlagsSchema>

const initOptionsSchema = initOptionsFlagsSchema.extend({
  components: z.array(z.string()).optional(),
})

export type InitOptions = z.input<typeof initOptionsSchema> & {
  isNewProject?: boolean
  skipPreflight?: boolean
  name?: string
  createMonorepo?: boolean
}

type ResolvedInitOptions = z.output<typeof initOptionsSchema> &
  Pick<
    InitOptions,
    'isNewProject' | 'skipPreflight' | 'name' | 'createMonorepo'
  >

export interface InitAdapters {
  preflight?: typeof preFlightInit
  getProjectInfo?: typeof getProjectInfo
  getRawConfig?: typeof getRawConfig
  resolveConfigPaths?: typeof resolveConfigPaths
  getRegistryStyles?: typeof getRegistryStyles
  prompt?: typeof prompts
  createInstallPlan?: typeof createInstallPlan
  applyInstallPlan?: typeof applyInstallPlan
  registryClient?: RegistryClient
  dependencyInstaller?: DependencyInstaller
  transaction?: ApplyInstallPlanOptions['transaction']
}

export interface InitResult {
  config: Config
  rawConfig: RawConfig
  components: string[]
  dependencies: string[]
  colorMode: boolean
  plan: InstallPlan
  configWritten: boolean
  aliasWritten: boolean
}

export class InitConflictError extends Error {
  constructor(readonly conflicts: readonly unknown[]) {
    super(formatConflicts(conflicts))
    this.name = 'InitConflictError'
  }
}

export class InitUnsupportedSystemError extends Error {
  constructor(readonly system: string) {
    super(
      `Cannot initialize the "${system}" system. Phase 5 init installs Chakra, Emotion, ` +
        'the Saas UI Chakra preset, and Chakra setup templates; a Panda project requires a separate setup plan. Use --system chakra --force to replace the existing system explicitly.',
    )
    this.name = 'InitUnsupportedSystemError'
  }
}

export async function init(
  this: LocalContext,
  flags: InitCommandFlags,
  ...components: Array<string>
): Promise<void> {
  try {
    const options = initOptionsSchema.parse({
      ...flags,
      cwd: path.resolve(flags.cwd ?? process.cwd()),
      components,
    })

    const result = await runInitWithResult(options)

    if (result === null) {
      return
    }

    logger.break()
    logger.log(
      `${highlighter.success(
        'Success!',
      )} Project initialization completed.\nYou may now add components.`,
    )
    logger.break()
  } catch (error) {
    logger.break()
    handleError(error)
  }
}

/**
 * Compatibility wrapper used by `add` when it needs to initialize a project.
 * Call `runInitWithResult` when the install plan or write result is needed.
 */
export async function runInit(
  options: InitOptions,
  adapters: InitAdapters = {},
): Promise<Config | null> {
  const result = await runInitWithResult(options, adapters)
  return result?.config ?? null
}

export async function runInitWithResult(
  input: InitOptions,
  adapters: InitAdapters = {},
): Promise<InitResult | null> {
  const parsed = initOptionsSchema.parse({
    ...input,
    cwd: path.resolve(input.cwd),
  })
  const options: ResolvedInitOptions = {
    ...input,
    ...parsed,
  }

  if (options.createMonorepo) {
    const { packageManager, version } = await getPackageManager(options.cwd)

    await createMonorepoProject({
      cwd: options.cwd,
      name: options.name || 'my-app',
      packageManager,
      packageManagerVersion: version,
      typescript: true,
      skipInstall: false,
    })

    return null
  }

  if (!existsSync(path.resolve(options.cwd, 'package.json'))) {
    return await maybeCreateProject(options, adapters.prompt ?? prompts)
  }

  const preflight = options.skipPreflight
    ? {
        errors: {},
        projectInfo: await (adapters.getProjectInfo ?? getProjectInfo)(
          options.cwd,
        ),
      }
    : await (adapters.preflight ?? preFlightInit)(options)

  const projectInfo = preflight.projectInfo
  if (!projectInfo) {
    throw new Error(`Unable to inspect the project at ${options.cwd}.`)
  }

  const readConfig = adapters.getRawConfig ?? getRawConfig
  const existingConfig = await readConfig(options.cwd)
  const defaultConfig = createDefaultConfig(projectInfo)
  const rawConfig = await selectConfig(
    existingConfig,
    defaultConfig,
    options,
    adapters,
  )
  const preparedAlias = await prepareImportAlias(
    options.cwd,
    rawConfig,
    projectInfo,
  )
  const resolvePaths = adapters.resolveConfigPaths ?? resolveConfigPaths
  const config = await resolvePaths(
    options.cwd,
    rawConfig,
    preparedAlias.effectiveConfig,
  )
  const colorMode = await selectColorMode(options, adapters.prompt ?? prompts)
  const components = await selectComponents(
    options,
    adapters.prompt ?? prompts,
    colorMode,
  )
  const dependencies = [
    ...INIT_DEPENDENCIES,
    ...(colorMode ? [COLOR_MODE_DEPENDENCY] : []),
  ]

  const createPlan = adapters.createInstallPlan ?? createInstallPlan
  const plan = await createPlan(components, config, {
    client: adapters.registryClient,
    dependencies,
    force: options.force,
    overwrite: true,
  })

  if (plan.conflicts?.length) {
    throw new InitConflictError(plan.conflicts)
  }

  if (!options.yes && !options.defaults) {
    const { proceed } = await (adapters.prompt ?? prompts)({
      type: 'confirm',
      name: 'proceed',
      message: `Install ${components.length} setup/component item(s) and write ${highlighter.info(
        'components.json',
      )}?`,
      initial: true,
    })

    if (!proceed) {
      return null
    }
  }

  const nextRawConfig = withInstalledRegistryItems(
    rawConfig,
    plan.requestedItems,
    plan.replacedItems,
  )
  const preparedConfig = await prepareConfig(options.cwd, nextRawConfig)
  const stagedProjectFiles = await Promise.all(
    [preparedAlias.update, preparedConfig]
      .filter((update): update is PreparedProjectUpdate => update !== null)
      .map((update) =>
        prepareStagedProjectFile(
          options.cwd,
          update.targetPath,
          update.content,
        ),
      ),
  )
  const nextConfig = await resolvePaths(
    options.cwd,
    nextRawConfig,
    preparedAlias.effectiveConfig,
  )

  const applyPlan = adapters.applyInstallPlan ?? applyInstallPlan
  await applyPlan(plan, nextConfig, {
    dependencyInstaller: adapters.dependencyInstaller,
    silent: options.silent,
    stagedProjectFiles,
    transaction: adapters.transaction,
  })

  return {
    config: nextConfig,
    rawConfig: nextRawConfig,
    components,
    dependencies,
    colorMode,
    plan,
    configWritten: preparedConfig !== null,
    aliasWritten: preparedAlias.update !== null,
  }
}

async function maybeCreateProject(
  options: InitOptions,
  prompt: typeof prompts,
): Promise<null> {
  if (options.yes || options.defaults) {
    throw new Error(
      `No package.json found in ${options.cwd}. Run init in an existing React project.`,
    )
  }

  const { createMonorepo } = await prompt({
    type: 'confirm',
    name: 'createMonorepo',
    message: 'No project found. Would you like to create a new monorepo?',
    initial: false,
  })

  if (!createMonorepo) {
    throw new Error(
      `No package.json found in ${options.cwd}. Run init in an existing React project.`,
    )
  }

  const { projectName, typescript } = await prompt([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (value: string) =>
        /^[a-z0-9-]+$/.test(value)
          ? true
          : 'Use lowercase letters, numbers, and hyphens.',
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use TypeScript?',
      initial: true,
    },
  ])
  const packageManager = await getPackageManager(options.cwd)

  await createMonorepoProject({
    cwd: options.cwd,
    name: projectName || 'my-app',
    packageManager: packageManager.packageManager,
    packageManagerVersion: packageManager.version,
    typescript,
    skipInstall: false,
  })

  return null
}

export function createDefaultConfig(projectInfo: ProjectInfo): RawConfig {
  const prefix = projectInfo.aliasPrefix ?? '@/'

  return rawConfigSchema.parse({
    $schema: SCHEMA_URL,
    system: projectInfo.system?.name ?? 'chakra',
    style: 'default',
    rsc: projectInfo.isRSC,
    tsx: projectInfo.isTsx,
    aliases: {
      components: `${prefix}components`,
      ui: `${prefix}components/ui`,
      utils: `${prefix}lib/utils`,
      lib: `${prefix}lib`,
      hooks: `${prefix}hooks`,
      icons: `${prefix}components/icons`,
    },
  })
}

async function selectConfig(
  existingConfig: RawConfig | null,
  defaultConfig: RawConfig,
  options: ResolvedInitOptions,
  adapters: InitAdapters,
): Promise<RawConfig> {
  const useDefaults = options.defaults && options.force
  let selected = useDefaults
    ? {
        ...defaultConfig,
        installed: existingConfig?.installed ?? [],
      }
    : (existingConfig ?? defaultConfig)

  if (!options.yes && !options.defaults) {
    selected = await promptForConfig(
      selected,
      adapters.prompt ?? prompts,
      adapters.getRegistryStyles ?? getRegistryStyles,
    )
  }

  const overrides = getConfigOverrides(options)
  const conflicts = existingConfig
    ? findConfigConflicts(existingConfig, overrides)
    : []

  if (conflicts.length && !options.force) {
    throw new InitConflictError(conflicts)
  }

  const config = rawConfigSchema.parse(mergeConfig(selected, overrides))
  if (config.system !== 'chakra') {
    throw new InitUnsupportedSystemError(config.system)
  }
  return config
}

async function promptForConfig(
  config: RawConfig,
  prompt: typeof prompts,
  getStyles: typeof getRegistryStyles,
): Promise<RawConfig> {
  const styles = await getStyles()
  const response = await prompt([
    {
      type: 'toggle',
      name: 'typescript',
      message: `Would you like to use ${highlighter.info('TypeScript')}?`,
      initial: config.tsx,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'select',
      name: 'style',
      message: `Which ${highlighter.info('style')} would you like to use?`,
      choices: styles.map((style) => ({
        title: style.label,
        value: style.name,
      })),
      initial: Math.max(
        0,
        styles.findIndex((style) => style.name === config.style),
      ),
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlighter.info(
        'components',
      )}:`,
      initial: config.aliases.components,
    },
    {
      type: 'text',
      name: 'utils',
      message: `Configure the import alias for ${highlighter.info('utils')}:`,
      initial: config.aliases.utils,
    },
    {
      type: 'toggle',
      name: 'rsc',
      message: `Are you using ${highlighter.info('React Server Components')}?`,
      initial: config.rsc,
      active: 'yes',
      inactive: 'no',
    },
  ])

  const aliases = deriveAliases(response.components, response.utils, config)

  return rawConfigSchema.parse({
    ...config,
    style: response.style ?? config.style,
    rsc: response.rsc ?? config.rsc,
    tsx: response.typescript ?? config.tsx,
    aliases,
  })
}

type ConfigOverrides = Omit<Partial<RawConfig>, 'aliases'> & {
  aliases?: Partial<RawConfig['aliases']>
}

function getConfigOverrides(options: ResolvedInitOptions): ConfigOverrides {
  const aliases: Partial<RawConfig['aliases']> = {}
  if (options.componentsAlias) aliases.components = options.componentsAlias
  if (options.utilsAlias) aliases.utils = options.utilsAlias
  if (options.uiAlias) aliases.ui = options.uiAlias
  if (options.libAlias) aliases.lib = options.libAlias
  if (options.hooksAlias) aliases.hooks = options.hooksAlias
  if (options.iconsAlias) aliases.icons = options.iconsAlias

  return {
    ...(options.style ? { style: options.style } : {}),
    ...(options.system ? { system: options.system } : {}),
    ...(Object.keys(aliases).length ? { aliases } : {}),
  }
}

function mergeConfig(base: RawConfig, overrides: ConfigOverrides): RawConfig {
  const aliases = {
    ...base.aliases,
    ...(overrides.aliases ?? {}),
  }

  if (overrides.aliases?.components && !overrides.aliases.ui) {
    aliases.ui = `${overrides.aliases.components}/ui`
  }

  return {
    ...base,
    ...overrides,
    aliases,
  }
}

function findConfigConflicts(
  existing: RawConfig,
  overrides: ConfigOverrides,
): string[] {
  const conflicts: string[] = []

  if (overrides.style && overrides.style !== existing.style) {
    conflicts.push(`style: ${existing.style} -> ${overrides.style}`)
  }
  if (overrides.system && overrides.system !== existing.system) {
    conflicts.push(`system: ${existing.system} -> ${overrides.system}`)
  }

  for (const [name, value] of Object.entries(overrides.aliases ?? {})) {
    const current = existing.aliases[name as keyof RawConfig['aliases']]
    if (value && current !== value) {
      conflicts.push(`aliases.${name}: ${current ?? '(unset)'} -> ${value}`)
    }
  }

  return conflicts
}

function deriveAliases(
  components: string,
  utils: string,
  fallback: RawConfig,
): RawConfig['aliases'] {
  const componentRoot = components.replace(/\/components$/, '')
  const utilsRoot = utils.replace(/\/utils$/, '')

  return {
    ...fallback.aliases,
    components,
    ui: `${components}/ui`,
    utils,
    lib: utilsRoot,
    hooks: `${componentRoot}/hooks`,
    icons: `${components}/icons`,
  }
}

async function selectColorMode(
  options: ResolvedInitOptions,
  prompt: typeof prompts,
): Promise<boolean> {
  if (options.colorMode) {
    return options.colorMode === 'on'
  }

  if (options.yes || options.defaults) {
    return true
  }

  const result = await prompt({
    type: 'confirm',
    name: 'colorMode',
    message: 'Install color-mode support with next-themes?',
    initial: true,
  })
  return result.colorMode !== false
}

async function selectComponents(
  options: ResolvedInitOptions,
  prompt: typeof prompts,
  colorMode: boolean,
): Promise<string[]> {
  let includeStarter = options.starter
  const managedSetupItems = new Set([
    'provider',
    'provider-no-color-mode',
    'color-mode',
  ])
  const conflictingSetupItems = (options.components ?? []).filter((item) =>
    managedSetupItems.has(item),
  )

  if (conflictingSetupItems.length) {
    throw new InitConflictError(
      conflictingSetupItems.map(
        (item) =>
          `The "${item}" setup item is selected by --color-mode and cannot be passed as a starter component.`,
      ),
    )
  }

  if (
    !includeStarter &&
    !options.components?.length &&
    !options.yes &&
    !options.defaults
  ) {
    const result = await prompt({
      type: 'confirm',
      name: 'starter',
      message: `Install the documented starter set (${DEFAULT_STARTER_COMPONENTS.join(
        ', ',
      )})?`,
      initial: false,
    })
    includeStarter = Boolean(result.starter)
  }

  return Array.from(
    new Set([
      colorMode ? 'provider' : 'provider-no-color-mode',
      ...(includeStarter ? DEFAULT_STARTER_COMPONENTS : []),
      ...(options.components ?? []),
    ]),
  )
}

export async function writeConfig(
  cwd: string,
  config: RawConfig,
): Promise<boolean> {
  const update = await prepareConfig(cwd, config)
  if (!update) return false
  await writeFileAtomic(update.targetPath, update.content)
  return true
}

async function prepareConfig(
  cwd: string,
  config: RawConfig,
): Promise<PreparedProjectUpdate | null> {
  const targetPath = path.resolve(cwd, 'components.json')
  const content = `${JSON.stringify(config, null, 2)}\n`
  const current = await fs.readFile(targetPath, 'utf8').catch(() => null)

  if (current === content || isEquivalentConfig(current, config)) {
    return null
  }

  return { targetPath, content }
}

function isEquivalentConfig(current: string | null, config: RawConfig) {
  if (!current) return false
  try {
    const parsed = rawConfigSchema.parse(JSON.parse(current))
    return JSON.stringify(parsed) === JSON.stringify(config)
  } catch {
    return false
  }
}

export async function ensureImportAlias(
  cwd: string,
  config: RawConfig,
  projectInfo: ProjectInfo,
): Promise<boolean> {
  const prepared = await prepareImportAlias(cwd, config, projectInfo)
  return commitImportAlias(prepared.update)
}

interface PreparedProjectUpdate {
  targetPath: string
  content: string
}

interface PreparedImportAlias {
  update: PreparedProjectUpdate | null
  effectiveConfig: EffectiveTsConfig
}

async function prepareImportAlias(
  cwd: string,
  config: RawConfig,
  projectInfo: ProjectInfo,
): Promise<PreparedImportAlias> {
  const aliases = [
    ...new Set(
      Object.values(config.aliases).flatMap((value) => {
        const alias = value ? getAliasPattern(value) : null
        return alias ? [alias] : []
      }),
    ),
  ]
  const configName = projectInfo.isTsx ? 'tsconfig.json' : 'jsconfig.json'
  const effectiveConfig = await loadEffectiveTsConfig(cwd, configName)
  if (!aliases.length) return { update: null, effectiveConfig }

  const missing: string[] = []
  for (const alias of aliases) {
    if (!Object.hasOwn(effectiveConfig.paths, alias)) missing.push(alias)
  }

  if (!missing.length) {
    return { update: null, effectiveConfig }
  }

  const parsed = effectiveConfig.document
  const compilerOptions = {
    ...((parsed['compilerOptions'] as Record<string, unknown> | undefined) ??
      {}),
  }
  const paths: Record<string, string[]> = {}
  for (const [pattern, mapping] of Object.entries(effectiveConfig.paths)) {
    paths[pattern] = mapping.targets.map((target) =>
      serializePathTarget(effectiveConfig.baseUrl, target),
    )
  }
  const absoluteTarget = path.join(cwd, projectInfo.isSrcDir ? 'src' : '', '*')
  for (const alias of missing) {
    paths[alias] = [
      serializePathTarget(effectiveConfig.baseUrl, absoluteTarget),
    ]
    effectiveConfig.paths[alias] = {
      targets: [absoluteTarget],
      sourcePath: effectiveConfig.configPath,
    }
  }
  if (!effectiveConfig.hasExplicitBaseUrl) compilerOptions['baseUrl'] = '.'
  compilerOptions['paths'] = paths
  parsed['compilerOptions'] = compilerOptions

  return {
    update: {
      targetPath: effectiveConfig.configPath,
      content: `${JSON.stringify(parsed, null, 2)}\n`,
    },
    effectiveConfig,
  }
}

async function commitImportAlias(
  update: PreparedProjectUpdate | null,
): Promise<boolean> {
  if (!update) return false
  await writeFileAtomic(update.targetPath, update.content)
  return true
}

function getAliasPattern(alias: string): string | null {
  if (alias.startsWith('@/')) return '@/*'
  if (alias.startsWith('~/')) return '~/*'
  if (alias.startsWith('#/')) return '#/*'
  if (alias.startsWith('#')) return '#*'
  return null
}

async function writeFileAtomic(targetPath: string, content: string) {
  const temporaryPath = `${targetPath}.${process.pid}.${Date.now()}.tmp`
  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(temporaryPath, content, 'utf8')
  await fs.rename(temporaryPath, targetPath)
}

function formatConflicts(conflicts: readonly unknown[]) {
  const details = conflicts
    .map((conflict) =>
      typeof conflict === 'string' ? conflict : JSON.stringify(conflict),
    )
    .join('\n- ')

  return `Initialization has conflicts. No files were written.${
    details ? `\n- ${details}` : ''
  }`
}
