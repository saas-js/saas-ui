import { promises as fs } from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { z } from 'zod'

import * as ERRORS from '#utils/errors'
import { REGISTRY_URL, SCHEMA_URL } from '#constants'
import type { LocalContext } from '#context'
import { preFlightInit } from '#preflights/preflight-init'
import { addComponents } from '#utils/add-components'
import { createMonorepoProject } from '#utils/create-project'
import {
  type Config,
  DEFAULT_COMPONENTS,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '#utils/get-config'
import { getPackageManager } from '#utils/get-package-manager'
import { getProjectConfig, getProjectInfo } from '#utils/get-project-info'
import { handleError } from '#utils/handle-error'
import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'
import { getRegistryStyles } from '#utils/registry'
import { spinner } from '#utils/spinner'

export const initOptionsFlagsSchema = z.object({
  cwd: z.string(),
  // components: z.array(z.string()).optional(),
  yes: z.boolean(),
  defaults: z.boolean(),
  force: z.boolean(),
  silent: z.boolean(),
  monorepo: z.boolean(),
})

type InitCommandFlags = z.infer<typeof initOptionsFlagsSchema>

const initOptionsSchema = initOptionsFlagsSchema.extend({
  components: z.array(z.string()).optional(),
})

type InitCommandFlagsWithComponents = z.infer<typeof initOptionsSchema>

type InitOptions = InitCommandFlagsWithComponents & {
  isNewProject?: boolean
  skipPreflight?: boolean
  name?: string
}

export async function init(
  this: LocalContext,
  flags: InitCommandFlags,
  ...components: Array<string>
): Promise<void> {
  try {
    // allow namespaced components to be written without the @ prefix
    const normalizedComponents = components.map((component) => {
      if (component.includes('/') && !component.startsWith('@')) {
        return `@${component}`
      }
      return component
    })

    const options = initOptionsSchema.parse({
      ...flags,
      cwd: path.resolve(flags.cwd ?? process.cwd()),
      isNewProject: false,
      components: normalizedComponents,
    })

    const result = await runInit(options)

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

export async function runInit(options: InitOptions): Promise<Config | null> {
  let projectInfo

  if (options.monorepo) {
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

  const packageJsonPath = path.resolve(options.cwd, 'package.json')
  const hasPackageJson = await fs
    .access(packageJsonPath)
    .then(() => true)
    .catch(() => false)

  if (!hasPackageJson) {
    const { createMonorepo } = await prompts({
      type: 'confirm',
      name: 'createMonorepo',
      message: 'No project found. Would you like to create a new monorepo?',
      initial: false,
    })

    if (createMonorepo) {
      const { projectName } = await prompts({
        type: 'text',
        name: 'projectName',
        message: 'What is your project named?',
        initial: 'my-app',
        validate: (value) => {
          if (!value) return 'Project name is required'
          if (!/^[a-z0-9-]+$/.test(value)) {
            return 'Project name must contain only lowercase letters, numbers, and hyphens'
          }
          return true
        },
      })

      const { typescript } = await prompts({
        type: 'confirm',
        name: 'typescript',
        message: 'Would you like to use TypeScript?',
        initial: true,
      })

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

    logger.error(
      `No ${highlighter.info('package.json')} found in ${highlighter.info(
        options.cwd,
      )}.`,
    )
    logger.error(
      `Please run ${highlighter.info(
        'init',
      )} in a valid Node.js project or create a monorepo.`,
    )
    process.exit(1)
  } else {
    projectInfo = await getProjectInfo(options.cwd)
  }

  const preflight = await preFlightInit(options)
  if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
    process.exit(1)
  }
  projectInfo = preflight.projectInfo

  const projectConfig = await getProjectConfig(options.cwd, projectInfo)
  const config = projectConfig
    ? await promptForMinimalConfig(projectConfig, options)
    : await promptForConfig(await getConfig(options.cwd))

  if (!options.yes) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Write configuration to ${highlighter.info(
        'components.json',
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  const componentSpinner = spinner(`Writing components.json.`).start()
  const targetPath = path.resolve(options.cwd, 'components.json')
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8')
  componentSpinner.succeed()

  const fullConfig = await resolveConfigPaths(options.cwd, config)
  const components = ['index', ...(options.components || [])]
  await addComponents(components, fullConfig, {
    overwrite: true,
    silent: options.silent,
    isNewProject:
      options.isNewProject || projectInfo?.framework.name === 'next-app',
  })

  return fullConfig
}

async function promptForConfig(defaultConfig: Config | null = null) {
  logger.info('')
  const options = await prompts([
    {
      type: 'toggle',
      name: 'typescript',
      message: `Would you like to use ${highlighter.info(
        'TypeScript',
      )} (recommended)?`,
      initial: defaultConfig?.tsx ?? true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlighter.info(
        'components',
      )}:`,
      initial: defaultConfig?.aliases['components'] ?? DEFAULT_COMPONENTS,
    },
    {
      type: 'text',
      name: 'utils',
      message: `Configure the import alias for ${highlighter.info('utils')}:`,
      initial: defaultConfig?.aliases['utils'] ?? DEFAULT_UTILS,
    },
    {
      type: 'toggle',
      name: 'rsc',
      message: `Are you using ${highlighter.info('React Server Components')}?`,
      initial: defaultConfig?.rsc ?? true,
      active: 'yes',
      inactive: 'no',
    },
  ])

  return rawConfigSchema.parse({
    $schema: SCHEMA_URL,
    system: 'chakra',
    style: 'default',
    rsc: options.rsc,
    tsx: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components,
      // TODO: fix this.
      lib: options.components.replace(/\/components$/, 'lib'),
      hooks: options.components.replace(/\/components$/, 'hooks'),
    },
    registries: {
      '@saas-ui': {
        url: `${REGISTRY_URL}/r/styles/{style}/{name}.json`,
      },
    },
  })
}

async function promptForMinimalConfig(
  defaultConfig: Config,
  opts: z.infer<typeof initOptionsSchema>,
) {
  let style = defaultConfig.style

  if (!opts.defaults) {
    const styles = await getRegistryStyles()

    const options = await prompts([
      {
        type: 'select',
        name: 'style',
        message: `Which ${highlighter.info('style')} would you like to use?`,
        choices: styles.map((style) => ({
          title: style.label,
          value: style.name,
        })),
        initial: styles.findIndex((s) => s.name === style),
      },
    ])

    style = options.style
  }

  return rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    style,
    rsc: defaultConfig?.rsc,
    tsx: defaultConfig?.tsx,
    aliases: defaultConfig?.aliases,
    registries: {
      '@saas-ui': {
        url: `${REGISTRY_URL}/r/styles/{style}/{name}.json`,
      },
    },
  })
}
