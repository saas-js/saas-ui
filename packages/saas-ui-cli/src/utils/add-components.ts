import path from 'node:path'

import {
  serializeComponentsConfig,
  withInstalledRegistryItems,
} from '#utils/components-config'
import type { Config } from '#utils/get-config'
import { formatInstallPlanDiff } from '#utils/install-diff'
import {
  type ApplyInstallPlanOptions,
  type CreateInstallPlanOptions,
  type InstallPlan,
  applyInstallPlan,
  createInstallPlan,
  prepareStagedProjectFile,
} from '#utils/install-plan'
import { logger } from '#utils/logger'

export interface InstallRegistryItemsOptions
  extends CreateInstallPlanOptions, ApplyInstallPlanOptions {
  dryRun?: boolean
  diff?: string
  silent?: boolean
  isNewProject?: boolean
}

export function formatInstallPlan(plan: InstallPlan) {
  const lines = [
    `Registry items: ${plan.items.map((item) => item.reference).join(', ') || '(none)'}`,
    `Replaces: ${plan.replacedItems.join(', ') || '(none)'}`,
    `Dependencies: ${plan.dependencies.join(', ') || '(none)'}`,
    `Dev dependencies: ${plan.devDependencies.join(', ') || '(none)'}`,
    'Files:',
    ...plan.files.map((file) => `  ${file.action.padEnd(9)} ${file.target}`),
  ]
  if (plan.conflicts.length) {
    lines.push(
      'Conflicts:',
      ...plan.conflicts.map((conflict) => `  ${conflict.message}`),
    )
  }
  return lines.join('\n')
}

export async function installRegistryItems(
  items: readonly string[],
  config: Config,
  options: InstallRegistryItemsOptions = {},
) {
  const plan = await createInstallPlan(items, config, options)
  if (options.dryRun || options.diff !== undefined) {
    if (!options.silent) {
      logger.log(
        options.diff !== undefined
          ? await formatInstallPlanDiff(plan, {
              ...(options.diff ? { filter: options.diff } : {}),
            })
          : formatInstallPlan(plan),
      )
    }
    return { plan, applied: false as const }
  }
  const nextConfig = withInstalledRegistryItems(
    config,
    plan.requestedItems,
    plan.replacedItems,
  )
  const componentsConfig = await prepareStagedProjectFile(
    config.resolvedPaths.cwd,
    path.join(config.resolvedPaths.cwd, 'components.json'),
    serializeComponentsConfig(nextConfig),
  )
  const result = await applyInstallPlan(plan, config, {
    ...options,
    stagedProjectFiles: [
      ...(options.stagedProjectFiles ?? []),
      componentsConfig,
    ],
  })
  config.installed = [...nextConfig.installed]
  if (!options.silent) {
    logger.log(formatInstallPlan(plan))
    for (const docs of plan.docs) logger.info(docs)
  }
  return { plan, result, applied: true as const }
}

/** Backwards-compatible name used by init and add command implementations. */
export async function addComponents(
  components: string[],
  config: Config,
  options: InstallRegistryItemsOptions,
) {
  return installRegistryItems(components, config, options)
}

export { applyInstallPlan, createInstallPlan }
export type {
  ApplyInstallPlanOptions,
  CreateInstallPlanOptions,
  InstallPlan,
} from '#utils/install-plan'
