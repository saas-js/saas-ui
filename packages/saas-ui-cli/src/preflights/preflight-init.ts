import fs from 'fs-extra'
import path from 'path'
import type z from 'zod'

import * as ERRORS from '#utils/errors'
import type { initOptionsFlagsSchema } from '#commands/init/impl.js'
import { getProjectInfo } from '#utils/get-project-info'
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
    errors[ERRORS.IMPORT_ALIAS_MISSING] = true
    tsConfigSpinner?.fail()
  } else {
    tsConfigSpinner?.succeed()
  }

  if (Object.keys(errors).length > 0) {
    if (errors[ERRORS.IMPORT_ALIAS_MISSING]) {
      logger.break()
      logger.error(`No import alias found in your tsconfig.json file.`)
      if (projectInfo?.framework.links.installation) {
        logger.error(
          `Visit ${highlighter.info(
            projectInfo?.framework.links.installation,
          )} to learn how to set an import alias.`,
        )
      }
    }

    logger.break()
    process.exit(1)
  }

  return {
    errors,
    projectInfo,
  }
}
