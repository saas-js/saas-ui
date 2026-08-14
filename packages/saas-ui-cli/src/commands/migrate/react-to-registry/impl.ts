import { execa } from 'execa'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

import type { LocalContext } from '#context'
import { detectMonorepo } from '#utils/detect-monorepo'
import { getConfig } from '#utils/get-config'
import { getPackageManager } from '#utils/get-package-manager'
import { applyInstallPlan, createInstallPlan } from '#utils/install-plan'
import { logger } from '#utils/logger'
import {
  formatMigrationReport,
  migrateReactToRegistry,
} from '#utils/migrations/react-to-registry'
import {
  type MigrationPackageAdapter,
  fileMigrationPackageAdapter,
} from '#utils/migrations/react-to-registry-packages'

const flagsSchema = z
  .object({
    cwd: z.string().optional(),
    dryRun: z.boolean(),
    write: z.boolean(),
    overwrite: z.boolean(),
    json: z.boolean(),
  })
  .refine((flags) => !(flags.dryRun && flags.write), {
    message: '--dry-run and --write cannot be used together.',
  })

export async function resolveReactToRegistryTarget(cwd: string) {
  const requested = path.resolve(cwd)
  if (existsSync(path.join(requested, 'components.json'))) return requested

  const monorepo = await detectMonorepo(requested)
  const candidates = [
    path.join(requested, 'packages', 'ui'),
    ...(monorepo.root ? [path.join(monorepo.root, 'packages', 'ui')] : []),
  ]
  for (const candidate of [...new Set(candidates)]) {
    if (existsSync(path.join(candidate, 'components.json'))) return candidate
  }
  return requested
}

export function createCommandMigrationPackageAdapter(
  synchronize: (cwd: string) => Promise<void> = async (cwd) => {
    const { packageManager } = await getPackageManager(cwd)
    await execa(packageManager, ['install'], { cwd })
  },
): MigrationPackageAdapter {
  return {
    plan: (request) => fileMigrationPackageAdapter.plan(request),
    async apply(plan) {
      await fileMigrationPackageAdapter.apply(plan)
      if (plan.changed) await synchronize(plan.cwd)
    },
    rollback: (plan) => fileMigrationPackageAdapter.rollback(plan),
  }
}

export async function reactToRegistry(
  this: LocalContext,
  flags: z.input<typeof flagsSchema>,
  ...inputs: string[]
) {
  const parsed = flagsSchema.parse(flags)
  const requestedCwd = path.resolve(parsed.cwd ?? this.process.cwd())
  const cwd = await resolveReactToRegistryTarget(requestedCwd)
  if (cwd !== requestedCwd && !parsed.json) {
    logger.info(`Detected monorepo UI package at ${cwd}.`)
  }
  const config = await getConfig(cwd)
  if (!config) {
    throw new Error(
      `Configuration is missing at ${cwd}. Run "sui init" before migrating.`,
    )
  }

  const report = await migrateReactToRegistry({
    cwd,
    config,
    inputs,
    write: parsed.write && !parsed.dryRun,
    packageAdapter: createCommandMigrationPackageAdapter(),
    installer: async ({ items }) => {
      const plan = await createInstallPlan(items, config, {
        overwrite: parsed.overwrite,
      })
      await applyInstallPlan(plan, config, { silent: parsed.json })
    },
  })

  if (parsed.json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    logger.log(formatMigrationReport(report))
  }
  if (!report.success) {
    return new Error(
      'Migration could not be applied. Review the diagnostics above and retry.',
    )
  }
}
