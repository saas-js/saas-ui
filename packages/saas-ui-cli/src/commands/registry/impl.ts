import { promises as fs } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

import type { LocalContext } from '#context'
import { getRawConfig, rawConfigSchema } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'
import { spinner } from '#utils/spinner'

const registryOptionsFlagsSchema = z.object({
  cwd: z.string(),
  silent: z.boolean(),
  remove: z.boolean(),
})

type RegistryCommandFlags = z.infer<typeof registryOptionsFlagsSchema>

export async function registry(
  this: LocalContext,
  flags: RegistryCommandFlags,
  ...args: Array<string>
): Promise<void> {
  try {
    const options = registryOptionsFlagsSchema.parse({
      ...flags,
      cwd: path.resolve(flags.cwd ?? process.cwd()),
    })

    const [inputName, url] = args

    if (options.remove) {
      if (!inputName) {
        logger.error('Registry name is required.')
        process.exit(1)
      }
      if (url) {
        logger.warn('URL parameter is ignored when using --remove flag.')
      }
    } else {
      if (!inputName || !url) {
        logger.error('Both registry name and URL are required.')
        process.exit(1)
      }
    }

    const name = inputName.startsWith('@') ? inputName : `@${inputName}`

    const existingConfig = await getRawConfig(options.cwd)

    if (!existingConfig) {
      logger.error(
        `No ${highlighter.info(
          'components.json',
        )} found. Please run ${highlighter.info('init')} first.`,
      )
      process.exit(1)
    }

    let updatedConfig

    if (options.remove) {
      if (!existingConfig.registries?.[name]) {
        logger.error(
          `Registry ${highlighter.info(name)} not found in components.json.`,
        )
        process.exit(1)
      }

      const { [name]: removed, ...remainingRegistries } =
        existingConfig.registries

      updatedConfig = {
        ...existingConfig,
        registries: remainingRegistries,
      }
    } else {
      updatedConfig = {
        ...existingConfig,
        registries: {
          ...existingConfig.registries,
          [name]: { url },
        },
      }
    }

    rawConfigSchema.parse(updatedConfig)

    if (!options.silent) {
      const action = options.remove
        ? 'Removing'
        : existingConfig.registries?.[name]
          ? 'Updating'
          : 'Adding'

      const registrySpinner = spinner(
        `${action} registry ${highlighter.info(name)}...`,
      ).start()

      try {
        const targetPath = path.resolve(options.cwd, 'components.json')
        await fs.writeFile(
          targetPath,
          JSON.stringify(updatedConfig, null, 2),
          'utf8',
        )
        registrySpinner.succeed()
      } catch (error) {
        registrySpinner.fail()
        throw error
      }
    } else {
      const targetPath = path.resolve(options.cwd, 'components.json')
      await fs.writeFile(
        targetPath,
        JSON.stringify(updatedConfig, null, 2),
        'utf8',
      )
    }

    logger.break()
    const action = options.remove
      ? 'removed'
      : existingConfig.registries?.[name]
        ? 'updated'
        : 'added'
    logger.log(
      `${highlighter.success('Success!')} Registry ${highlighter.info(name)} has been ${action}.`,
    )
    logger.break()
  } catch (error) {
    logger.break()
    handleError(error)
  }
}
