import { execa } from 'execa'

import type { Config } from '#utils/get-config'
import { getPackageManager } from '#utils/get-package-manager'
import { reconcilePackageDependencies } from '#utils/package-dependencies'
import type { RegistryItem } from '#utils/registry/schema'
import { spinner } from '#utils/spinner'

export interface DependencyInstallRequest {
  cwd: string
  dependencies: string[]
  devDependencies: string[]
}

export type DependencyInstaller = (
  request: DependencyInstallRequest,
) => Promise<void>

export const defaultDependencyInstaller: DependencyInstaller = async ({
  cwd,
  dependencies,
  devDependencies,
}) => {
  const { packageManager } = await getPackageManager(cwd)
  const install = async (packages: string[], development: boolean) => {
    if (!packages.length) return
    const args = [packageManager === 'npm' ? 'install' : 'add']
    if (development) args.push('-D')
    args.push(...packages)
    await execa(packageManager, args, { cwd })
  }
  await install(dependencies, false)
  await install(devDependencies, true)
}

export async function installDependencies(
  request: DependencyInstallRequest,
  options: {
    installer?: DependencyInstaller
    silent?: boolean
  } = {},
) {
  const reconciled = reconcilePackageDependencies(
    request.dependencies,
    request.devDependencies,
  )
  if (reconciled.issues.length) {
    throw new Error(
      `Dependency preflight failed:\n${reconciled.issues
        .map((issue) => `- ${issue.message}`)
        .join('\n')}`,
    )
  }
  const { dependencies, devDependencies } = reconciled
  if (!dependencies.length && !devDependencies.length) return

  const installSpinner = spinner('Installing dependencies.', {
    silent: options.silent,
  })?.start()
  await (options.installer ?? defaultDependencyInstaller)({
    ...request,
    dependencies,
    devDependencies,
  })
  installSpinner?.succeed()
}

/** Compatibility adapter for callers that only install runtime dependencies. */
export async function updateDependencies(
  dependencies: RegistryItem['dependencies'],
  config: Config,
  options: {
    silent?: boolean
    installer?: DependencyInstaller
  } = {},
) {
  await installDependencies(
    {
      cwd: config.resolvedPaths.cwd,
      dependencies: dependencies ?? [],
      devDependencies: [],
    },
    options,
  )
}
