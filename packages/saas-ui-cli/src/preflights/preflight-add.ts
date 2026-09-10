import fs from 'fs-extra'
import path from 'path'

import * as ERRORS from '#utils/errors'
import { type AddOptions } from '#commands/add/impl'
import { detectMonorepo } from '#utils/detect-monorepo'
import { getConfig } from '#utils/get-config'
import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'

export async function preFlightAdd(options: AddOptions) {
  const errors: Record<string, boolean> = {}

  // Ensure target directory exists.
  if (!fs.existsSync(options.cwd)) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      config: null,
    }
  }

  const monorepoInfo = await detectMonorepo(options.cwd)
  logger.debug(`Monorepo detected: ${monorepoInfo.isMonorepo}`)
  if (monorepoInfo.isMonorepo) {
    logger.debug(`Monorepo type: ${monorepoInfo.type}`)
    logger.debug(`Monorepo root: ${monorepoInfo.root}`)
  }

  if (!fs.existsSync(path.resolve(options.cwd, 'package.json'))) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    logger.debug(`No package.json found in ${options.cwd}`)
    return {
      errors,
      config: null,
    }
  }

  // Check for components.json
  let componentsJsonPath = path.resolve(options.cwd, 'components.json')
  let actualCwd = options.cwd

  logger.debug(`Looking for components.json at: ${componentsJsonPath}`)

  if (!fs.existsSync(componentsJsonPath) && monorepoInfo.isMonorepo) {
    logger.debug(`Not found in cwd, checking monorepo locations...`)

    const uiPackagePath = path.join(
      options.cwd,
      'packages',
      'ui',
      'components.json',
    )
    logger.debug(`Checking: ${uiPackagePath}`)

    if (fs.existsSync(uiPackagePath)) {
      componentsJsonPath = uiPackagePath
      actualCwd = path.join(options.cwd, 'packages', 'ui')
      logger.debug(`Found components.json in UI package, using: ${actualCwd}`)
    } else if (monorepoInfo.root) {
      const rootUiPath = path.join(
        monorepoInfo.root,
        'packages',
        'ui',
        'components.json',
      )
      logger.debug(`Checking from root: ${rootUiPath}`)

      if (fs.existsSync(rootUiPath)) {
        componentsJsonPath = rootUiPath
        actualCwd = path.join(monorepoInfo.root, 'packages', 'ui')
        logger.debug(
          `Found components.json in UI package from root, using: ${actualCwd}`,
        )
      }
    }
  }

  if (!fs.existsSync(componentsJsonPath)) {
    errors[ERRORS.MISSING_CONFIG] = true
    logger.debug(`components.json not found at any location`)
    return {
      errors,
      config: null,
    }
  }

  logger.debug(`components.json found at: ${componentsJsonPath}`)
  logger.debug(`Using cwd: ${actualCwd}`)

  options.cwd = actualCwd

  try {
    const config = await getConfig(options.cwd!)

    return {
      errors,
      config: config!,
    }
  } catch (error) {
    logger.debug(error)
    console.log(error)
    logger.break()
    logger.error(
      `An invalid ${highlighter.info(
        'components.json',
      )} file was found at ${highlighter.info(
        options.cwd,
      )}.\nBefore you can add components, you must create a valid ${highlighter.info(
        'components.json',
      )} file by running the ${highlighter.info('init')} command.`,
    )
    logger.error(
      `Learn more at ${highlighter.info(
        'https://saas-ui.dev/docs/components-json',
      )}.`,
    )
    logger.break()
    process.exit(1)
  }
}
