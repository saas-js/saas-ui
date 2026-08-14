import fs from 'fs-extra'
import path from 'path'
import type z from 'zod'

import * as ERRORS from '#utils/errors'
import type { initOptionsFlagsSchema } from '#commands/init/impl.js'
import { getProjectInfo } from '#utils/get-project-info'
import { highlighter } from '#utils/highlighter'
import { spinner } from '#utils/spinner'

export class InitPreflightError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message)
    this.name = 'InitPreflightError'
  }
}

export async function preFlightInit(
  options: z.infer<typeof initOptionsFlagsSchema>,
) {
  const errors: Record<string, boolean> = {}

  if (!fs.existsSync(options.cwd)) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    throw new InitPreflightError(
      `No project found at ${highlighter.info(options.cwd)}.`,
      ERRORS.MISSING_DIR_OR_EMPTY_PROJECT,
    )
  }

  if (!(await fs.pathExists(path.resolve(options.cwd, 'package.json')))) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    throw new InitPreflightError(
      `No ${highlighter.info('package.json')} found in ${highlighter.info(
        options.cwd,
      )}.`,
      ERRORS.MISSING_DIR_OR_EMPTY_PROJECT,
    )
  }

  const projectSpinner = spinner(`Preflight checks.`, {
    silent: options.silent,
  }).start()

  projectSpinner?.succeed()

  const frameworkSpinner = spinner(`Verifying framework.`, {
    silent: options.silent,
  }).start()
  const projectInfo = await getProjectInfo(options.cwd)
  if (!projectInfo || projectInfo?.framework.name === 'manual') {
    errors[ERRORS.UNSUPPORTED_FRAMEWORK] = true
    frameworkSpinner?.fail()
    throw new InitPreflightError(
      `We could not detect React, Next.js, or Vite at ${highlighter.info(
        options.cwd,
      )}.`,
      ERRORS.UNSUPPORTED_FRAMEWORK,
    )
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
    tsConfigSpinner?.info(
      `No import alias found. Init will configure one after validation.`,
    )
  } else {
    tsConfigSpinner?.succeed()
  }

  return {
    errors,
    projectInfo,
  }
}
