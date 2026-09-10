import kleur from 'kleur'
import path from 'path'
import prompts from 'prompts'
import { z } from 'zod'

import * as ERRORS from '#utils/errors'
import { runInit } from '#commands/init/impl'
import { preFlightAdd } from '#preflights/preflight-add'
import { addComponents } from '#utils/add-components'
import { handleError } from '#utils/handle-error'
import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'
import { getRegistryIndex } from '#utils/registry'
import { selectAllRegistryItems } from '#utils/registry/select-items'

import type { LocalContext } from '../../context'

export const addOptionsFlagsSchema = z.object({
  yes: z.boolean(),
  overwrite: z.boolean(),
  dryRun: z.boolean(),
  diff: z.string().optional(),
  cwd: z.string().optional(),
  all: z.boolean(),
  silent: z.boolean(),
})

const addOptionsSchema = addOptionsFlagsSchema
  .extend({
    components: z.array(z.string()).optional(),
  })
  .refine(
    (options) => !(options.all && options.components?.length),
    '--all cannot be combined with explicitly named components.',
  )

type AddCommandFlags = z.infer<typeof addOptionsFlagsSchema>
type AddCommandOptions = z.infer<typeof addOptionsSchema>

export type AddOptions = AddCommandOptions & {
  cwd: string
}

export function resolveAddCommandOptions(
  flags: AddCommandFlags,
  components: readonly string[],
  defaultCwd = process.cwd(),
): AddOptions {
  const parsed = addOptionsSchema.parse({
    ...flags,
    components: [...components],
  })
  return {
    ...parsed,
    dryRun: parsed.dryRun || parsed.diff !== undefined,
    cwd: path.resolve(parsed.cwd ?? defaultCwd),
  }
}

export async function add(
  this: LocalContext,
  flags: AddCommandFlags,
  ...components: Array<string>
): Promise<void> {
  try {
    const options = resolveAddCommandOptions(flags, components)

    if (!options.components?.length) {
      options.components = await promptForRegistryComponents(options)
    }

    /* @eslint-ignore: dont care about const here */
    const originalCwd = options.cwd
    const result = await preFlightAdd(options)

    if (options.cwd !== originalCwd) {
      logger.info(
        `Detected monorepo. Adding components to ${highlighter.info('packages/ui/')}`,
      )
      logger.break()
    }

    let config = result.config

    // No components.json file. Prompt the user to run init.
    if (result.errors[ERRORS.MISSING_CONFIG]) {
      if (options.dryRun) {
        throw new Error(
          'A components.json file is required for --dry-run. Run init first.',
        )
      }
      const proceed = await confirmMissingConfigInit(options.yes)

      if (!proceed) {
        logger.break()
        process.exit(1)
      }

      config = await runInit({
        cwd: options.cwd,
        yes: true,
        force: true,
        defaults: false,
        skipPreflight: false,
        silent: true,
        isNewProject: false,
        starter: false,
      })
    }

    if (!config) {
      throw new Error(
        `Failed to read config at ${highlighter.info(options.cwd)}.`,
      )
    }

    await addComponents(options.components, config, options)
  } catch (error) {
    logger.break()
    handleError(error)
  }
}

type MissingConfigConfirmation = () => Promise<boolean>

/**
 * Keeps the missing-config branch testable and guarantees that `--yes` never
 * opens an interactive confirmation prompt.
 */
export async function confirmMissingConfigInit(
  yes: boolean,
  confirm: MissingConfigConfirmation = async () => {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `You need to create a ${highlighter.info(
        'components.json',
      )} file to add components. Proceed?`,
      initial: true,
    })
    return Boolean(proceed)
  },
) {
  return yes ? true : confirm()
}

async function promptForRegistryComponents(
  options: z.infer<typeof addOptionsSchema>,
) {
  const registryIndex = await getRegistryIndex()
  if (!registryIndex) {
    logger.break()
    handleError(new Error('Failed to fetch registry index.'))
    return []
  }

  if (options.all) {
    return selectAllRegistryItems(registryIndex)
  }

  if (options.components?.length) {
    return options.components
  }

  const { components } = await prompts({
    type: 'autocompleteMultiselect',
    name: 'components',
    message: 'Which components would you like to add?',
    hint: 'Space to select. A to toggle all. Enter to submit.',
    instructions: false,
    choices: registryIndex
      .filter(
        (entry) =>
          entry.type === 'registry:block' ||
          entry.type === 'registry:component' ||
          entry.type === 'registry:ui',
      )
      .map((entry) => ({
        title: `${entry.category}/${entry.subcategory}/${entry.name} ${entry.private ? kleur.blue(kleur.bold('(PRO)')) : ''}`,
        value: entry.name,
        selected: options.all ? true : options.components?.includes(entry.name),
      })),
  })

  if (!components?.length) {
    logger.warn('No components selected. Exiting.')
    logger.info('')
    process.exit(1)
  }

  const result = z.array(z.string()).safeParse(components)
  if (!result.success) {
    logger.error('')
    handleError(new Error('Something went wrong. Please try again.'))
    return []
  }
  return result.data
}
