import { promises as fs } from 'node:fs'
import path from 'node:path'

import { type Config } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import { logger } from '#utils/logger'
import { registryResolveItemsTree } from '#utils/registry'
import { parseRegistryAndItemFromString } from '#utils/registry/parser'
import { spinner } from '#utils/spinner'
import { UTILS, UTILS_JS } from '#utils/templates'
import { updateDependencies } from '#utils/updaters/update-dependencies'
import { updateFiles } from '#utils/updaters/update-files'

export async function addComponents(
  components: string[],
  config: Config,
  options: {
    overwrite?: boolean
    silent?: boolean
    isNewProject?: boolean
  },
) {
  options = {
    overwrite: false,
    silent: false,
    isNewProject: false,
    ...options,
  }

  const hasShadcnComponents = components.some((component) => {
    const { registry } = parseRegistryAndItemFromString(component)
    if (registry) {
      const registryConfig = config.registries?.[registry]
      if (registryConfig) {
        const url =
          typeof registryConfig === 'string'
            ? registryConfig
            : registryConfig.url
        return url.includes('shadcn.com')
      }
    }
    return false
  })

  if (hasShadcnComponents) {
    await ensureShadcnUtils(config, options)
  }

  const registrySpinner = spinner('Checking registry.', {
    silent: options.silent,
  })?.start()

  const tree = await registryResolveItemsTree(components, config)
  if (!tree) {
    registrySpinner?.fail()
    return handleError(new Error('Failed to fetch components from registry.'))
  }
  registrySpinner?.succeed()

  await updateDependencies(tree.dependencies, config, {
    silent: options.silent,
  })
  await updateFiles(tree.files, config, {
    overwrite: options.overwrite,
    silent: options.silent,
  })

  if (tree.docs) {
    logger.info(tree.docs)
  }
}

async function ensureShadcnUtils(
  config: Config,
  options: { silent?: boolean; overwrite?: boolean },
) {
  const utilsPath = path.join(config.resolvedPaths.lib, 'utils.ts')
  const utilsJsPath = path.join(config.resolvedPaths.lib, 'utils.js')

  const targetPath = config.tsx ? utilsPath : utilsJsPath
  const content = config.tsx ? UTILS : UTILS_JS

  const exists = await fs
    .access(targetPath)
    .then(() => true)
    .catch(() => false)

  if (exists && !options.overwrite) {
    if (!options.silent) {
      logger.info(`Skipping ${targetPath} (already exists)`)
    }
    return
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true })

  if (!options.silent) {
    const utilsSpinner = spinner('Adding shadcn utils file.').start()
    await fs.writeFile(targetPath, content, 'utf-8')
    utilsSpinner.succeed()
  } else {
    await fs.writeFile(targetPath, content, 'utf-8')
  }
}
