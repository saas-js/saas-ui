import { execa } from 'execa'

import type { Config } from '#utils/get-config'
import { getPackageManager } from '#utils/get-package-manager'
import type { RegistryItem } from '#utils/registry/schema'
import { spinner } from '#utils/spinner'

export async function updateDependencies(
  dependencies: RegistryItem['dependencies'],
  config: Config,
  options: {
    silent?: boolean
  },
) {
  dependencies = Array.from(new Set(dependencies))
  if (!dependencies?.length) {
    return
  }

  options = {
    silent: false,
    ...options,
  }

  const dependenciesSpinner = spinner(`Installing dependencies.`, {
    silent: options.silent,
  })?.start()
  const { packageManager } = await getPackageManager(config.resolvedPaths.cwd)
  await execa(
    packageManager,
    [packageManager === 'npm' ? 'install' : 'add', ...dependencies],
    {
      cwd: config.resolvedPaths.cwd,
    },
  )
  dependenciesSpinner?.succeed()
}
