import { z } from 'zod'

import type { LocalContext } from '#context'
import type { Config } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import { formatInstallPlanDiff } from '#utils/install-diff'
import {
  type InstallPlan,
  type PlannedFileAction,
  createInstallPlan,
} from '#utils/install-plan'
import { logger } from '#utils/logger'
import type { RegistryClient } from '#utils/registry/client'
import { RegistryItemFetchError } from '#utils/registry/graph'
import { resolveRegistryCommandConfig } from '#utils/resolve-registry-command-config'

export interface RegistryFileDiff {
  source: string
  target: string
  status: Exclude<PlannedFileAction, 'create'> | 'missing'
}

export interface RegistryItemDiff {
  name: string
  files: RegistryFileDiff[]
}

export interface RegistryDiff {
  plan: InstallPlan
  items: RegistryItemDiff[]
  hasChanges: boolean
}

export function shouldFailDiffCheck(result: RegistryDiff, check: boolean) {
  return check && result.hasChanges
}

export async function diffRegistryItems(
  names: readonly string[],
  config: Config,
  options: { client?: RegistryClient } = {},
): Promise<RegistryDiff> {
  const installed = config.installed ?? []
  const selected = names.length ? [...new Set(names)] : [...installed]
  if (!selected.length) {
    throw new Error(
      'No installed registry items found in components.json. Add an item before running diff.',
    )
  }
  const unknown = selected.filter((name) => !installed.includes(name))
  if (unknown.length) {
    throw new Error(`Items are not installed: ${unknown.join(', ')}`)
  }

  let plan: InstallPlan
  try {
    plan = await createInstallPlan(selected, config, {
      client: options.client,
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

  const items = plan.items.map((item) => ({
    name: item.reference,
    files: plan.files
      .filter((file) => file.item === item.reference)
      .map(({ source, target, action }) => ({
        source,
        target,
        status: action === 'create' ? ('missing' as const) : action,
      })),
  }))

  return {
    plan,
    items,
    hasChanges: items.some((item) =>
      item.files.some((file) => file.status !== 'unchanged'),
    ),
  }
}

const diffOptionsSchema = z.object({
  cwd: z.string().optional(),
  check: z.boolean(),
  components: z.array(z.string()),
})

export async function diff(
  this: LocalContext,
  flags: { yes: boolean; check: boolean; cwd?: string },
  ...components: string[]
) {
  try {
    const options = diffOptionsSchema.parse({
      cwd: flags.cwd,
      check: flags.check,
      components,
    })
    const config = await resolveRegistryCommandConfig(
      options.cwd ?? process.cwd(),
    )
    const result = await diffRegistryItems(options.components, config)
    if (!result.hasChanges) {
      logger.info('All installed registry items are up to date.')
      return
    }
    logger.log(
      await formatInstallPlanDiff(result.plan, {
        changedOnly: true,
        limit: Number.POSITIVE_INFINITY,
      }),
    )
    if (shouldFailDiffCheck(result, options.check)) {
      return new Error('Installed registry items differ from the registry.')
    }
  } catch (error) {
    handleError(error)
  }
}
