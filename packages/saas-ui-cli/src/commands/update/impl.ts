import { z } from 'zod'

import type { LocalContext } from '#context'
import { formatInstallPlan } from '#utils/add-components'
import type { Config } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import {
  type ApplyInstallPlanOptions,
  type InstallPlan,
  applyInstallPlan,
  createInstallPlan,
} from '#utils/install-plan'
import { logger } from '#utils/logger'
import type { RegistryClient } from '#utils/registry/client'
import { RegistryItemFetchError } from '#utils/registry/graph'
import { resolveRegistryCommandConfig } from '#utils/resolve-registry-command-config'

export interface UpdateRegistryItemsOptions extends ApplyInstallPlanOptions {
  client?: RegistryClient
  force?: boolean
  dryRun?: boolean
  all?: boolean
}

export async function createUpdatePlan(
  names: readonly string[],
  config: Config,
  options: UpdateRegistryItemsOptions = {},
) {
  const installed = config.installed ?? []
  const selected = options.all
    ? installed
    : names.length
      ? [...new Set(names)]
      : installed
  if (!selected.length) {
    throw new Error('components.json contains no installed registry items.')
  }
  const unknown = selected.filter((name) => !installed.includes(name))
  if (unknown.length)
    throw new Error(`Items are not installed: ${unknown.join(', ')}`)
  try {
    return await createInstallPlan(selected, config, {
      client: options.client,
      force: options.force,
      mode: 'update',
      overwrite: true,
    })
  } catch (error) {
    if (error instanceof RegistryItemFetchError) {
      const subject = error.requestedRoot
        ? `Requested registry item "${error.reference}" could not be resolved upstream.`
        : `Registry dependency "${error.reference}" required by "${error.owner}" could not be resolved upstream.`
      const detail =
        error.cause instanceof Error ? ` ${error.cause.message}` : ''
      throw new Error(
        `${subject}${detail} Local files and components.json were left unchanged.`,
        { cause: error },
      )
    }
    throw error
  }
}

export async function updateRegistryItems(
  names: readonly string[],
  config: Config,
  options: UpdateRegistryItemsOptions = {},
) {
  const plan = await createUpdatePlan(names, config, options)
  if (options.dryRun) return { plan, applied: false as const }
  const result = await applyInstallPlan(plan, config, options)
  return { plan, result, applied: true as const }
}

const flagsSchema = z.object({
  all: z.boolean(),
  dryRun: z.boolean(),
  cwd: z.string().optional(),
  silent: z.boolean(),
})

export async function update(
  this: LocalContext,
  flags: z.infer<typeof flagsSchema>,
  ...items: string[]
) {
  try {
    const options = flagsSchema.parse(flags)
    const config = await resolveRegistryCommandConfig(
      options.cwd ?? process.cwd(),
    )
    const result = await updateRegistryItems(items, config, options)
    if (!options.silent) logger.log(formatInstallPlan(result.plan))
  } catch (error) {
    handleError(error)
  }
}

export type { InstallPlan }
