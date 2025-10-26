import fs from 'fs-extra'
import path from 'path'
import prompts from 'prompts'
import type z from 'zod'

import * as ERRORS from '#utils/errors'
import type { initOptionsFlagsSchema } from '#commands/init/impl.js'
import { getProjectInfo, getTsConfig } from '#utils/get-project-info'
import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'
import { spinner } from '#utils/spinner'

export async function preFlightInit(
  options: z.infer<typeof initOptionsFlagsSchema>,
) {
  const errors: Record<string, boolean> = {}

  if (!fs.existsSync(options.cwd)) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      projectInfo: null,
    }
  }

  const projectSpinner = spinner(`Preflight checks.`, {
    silent: options.silent,
  }).start()

  if (
    fs.existsSync(path.resolve(options.cwd, 'components.json')) &&
    !options.force
  ) {
    projectSpinner?.fail()
    logger.break()
    logger.error(
      `A ${highlighter.info(
        'components.json',
      )} file already exists at ${highlighter.info(
        options.cwd,
      )}.\nTo start over, remove the ${highlighter.info(
        'components.json',
      )} file and run ${highlighter.info('init')} again.`,
    )
    logger.break()
    process.exit(1)
  }

  projectSpinner?.succeed()

  const frameworkSpinner = spinner(`Verifying framework.`, {
    silent: options.silent,
  }).start()
  const projectInfo = await getProjectInfo(options.cwd)
  if (!projectInfo || projectInfo?.framework.name === 'manual') {
    errors[ERRORS.UNSUPPORTED_FRAMEWORK] = true
    frameworkSpinner?.fail()
    logger.break()
    if (
      projectInfo &&
      'links' in projectInfo.framework &&
      projectInfo.framework.links.installation
    ) {
      logger.error(
        `We could not detect a supported framework at ${highlighter.info(
          options.cwd,
        )}.\n` +
          `Visit ${highlighter.info(
            projectInfo?.framework.links.installation,
          )} to manually configure your project.\nOnce configured, you can use the cli to add components.`,
      )
    }
    logger.break()
    process.exit(1)
  }
  frameworkSpinner?.succeed(
    `Verifying framework. Found ${highlighter.info(
      projectInfo.framework.label,
    )}.`,
  )

  const tsConfigSpinner = spinner(`Validating import alias.`, {
    silent: options.silent,
  }).start()
  if (!projectInfo?.aliasPrefix) {
    tsConfigSpinner?.fail()
    logger.break()
    logger.warn(`No import alias found in your tsconfig.json file.`)
    logger.break()

    // Detect src directory
    const hasSrcDir = await fs.pathExists(path.resolve(options.cwd, 'src'))
    const basePath = hasSrcDir ? './src/*' : './*'

    // Prompt user to create an alias
    const { aliasPrefix } = await prompts({
      type: 'select',
      name: 'aliasPrefix',
      message: `Which import alias would you like to use?`,
      choices: [
        {
          title: highlighter.info('#*'),
          description: `Maps to ${basePath}`,
          value: '#*',
        },
        {
          title: highlighter.info('@/*'),
          description: `Maps to ${basePath}`,
          value: '@/*',
        },
      ],
      initial: 0,
    })

    if (!aliasPrefix) {
      logger.break()
      logger.error('Import alias is required to continue.')
      logger.break()
      process.exit(1)
    }

    // Update tsconfig.json
    const tsconfigPath = path.resolve(options.cwd, 'tsconfig.json')
    const tsconfig = await getTsConfig(options.cwd)

    if (!tsconfig) {
      logger.break()
      logger.error('Unable to read tsconfig.json')
      logger.break()
      process.exit(1)
    }

    // Ensure compilerOptions and paths exist
    if (!tsconfig.compilerOptions) {
      tsconfig.compilerOptions = {}
    }
    if (!tsconfig.compilerOptions.paths) {
      tsconfig.compilerOptions.paths = {}
    }

    // Add the alias to paths
    tsconfig.compilerOptions.paths[aliasPrefix] = [basePath]

    // Write back the tsconfig
    await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 })

    // Run prettier on the tsconfig file
    const { execa } = await import('execa')
    try {
      await execa('npx', ['prettier', '--write', tsconfigPath], {
        cwd: options.cwd,
      })
    } catch (error) {
      // Silently ignore if prettier fails
    }

    logger.break()
    logger.success(
      `Added ${highlighter.info(aliasPrefix)} to tsconfig.json paths.`,
    )
    logger.break()

    tsConfigSpinner?.succeed()
  } else {
    tsConfigSpinner?.succeed()
  }

  if (Object.keys(errors).length > 0) {
    logger.break()
    process.exit(1)
  }

  return {
    errors,
    projectInfo,
  }
}
