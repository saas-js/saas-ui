import { type Config } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import { logger } from '#utils/logger'
import { registryResolveItemsTree } from '#utils/registry'
import { spinner } from '#utils/spinner'
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

  const registrySpinner = spinner(`Checking registry.`, {
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
