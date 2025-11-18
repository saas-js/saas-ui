import { type Change, diffLines } from 'diff'
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

import type { LocalContext } from '#context'
import { detectMonorepo } from '#utils/detect-monorepo'
import { type Config, getConfig } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'
import {
  getRegistryIndex,
  getRegistryItem,
  getRegistryItemFileTargetPath,
  registryResolveItemsTree,
} from '#utils/registry'
import { parseRegistryAndItemFromString } from '#utils/registry/parser'
import {
  type RegistryItem,
  registryItemFileSchema,
} from '#utils/registry/schema'
import { transform } from '#utils/transformers'
import { transformImport } from '#utils/transformers/transform-import'
import { transformRsc } from '#utils/transformers/transform-rsc'

const diffOptionsSchema = z.object({
  component: z.string().optional(),
  yes: z.boolean(),
  cwd: z.string().optional(),
})

type DiffOptions = z.infer<typeof diffOptionsSchema>

type RegistryIndexItem = Omit<RegistryItem, 'files'> & {
  files?: Array<string | z.infer<typeof registryItemFileSchema>>
}

export async function diff(
  this: LocalContext,
  flags: Omit<DiffOptions, 'component'>,
  ...components: Array<string>
): Promise<void> {
  try {
    let normalizedComponent = components[0]
    if (
      normalizedComponent &&
      normalizedComponent.includes('/') &&
      !normalizedComponent.startsWith('@')
    ) {
      normalizedComponent = `@${normalizedComponent}`
    }

    const options = diffOptionsSchema.parse({
      ...flags,
      component: normalizedComponent,
      cwd: flags.cwd ?? process.cwd(),
    })

    let cwd = path.resolve(options.cwd!)

    if (!existsSync(cwd)) {
      logger.error(`The path ${cwd} does not exist. Please try again.`)
      process.exit(1)
    }

    const monorepoInfo = await detectMonorepo(cwd)
    logger.debug(`Monorepo detected: ${monorepoInfo.isMonorepo}`)

    let componentsJsonPath = path.resolve(cwd, 'components.json')

    if (!existsSync(componentsJsonPath) && monorepoInfo.isMonorepo) {
      logger.debug(`Looking for components.json in monorepo packages...`)

      const uiPackagePath = path.join(cwd, 'packages', 'ui', 'components.json')

      if (existsSync(uiPackagePath)) {
        cwd = path.join(cwd, 'packages', 'ui')
        componentsJsonPath = uiPackagePath
        logger.info(
          `Detected monorepo. Checking components in ${highlighter.info('packages/ui/')}`,
        )
        logger.break()
      } else if (monorepoInfo.root) {
        const rootUiPath = path.join(
          monorepoInfo.root,
          'packages',
          'ui',
          'components.json',
        )

        if (existsSync(rootUiPath)) {
          cwd = path.join(monorepoInfo.root, 'packages', 'ui')
          componentsJsonPath = rootUiPath
          logger.info(
            `Detected monorepo. Checking components in ${highlighter.info('packages/ui/')}`,
          )
          logger.break()
        }
      }
    }

    const config = await getConfig(cwd)
    if (!config) {
      logger.warn(
        `Configuration is missing. Please run ${highlighter.info(
          'init',
        )} to create a components.json file.`,
      )
      process.exit(1)
    }

    if (!options.component) {
      await checkAllComponents(config)
    } else {
      const { registry } = parseRegistryAndItemFromString(options.component)

      if (registry) {
        await checkNamespacedComponent(options.component, config)
      } else {
        const registryIndex = await getRegistryIndex()
        if (!registryIndex) {
          handleError(new Error('Failed to fetch registry index.'))
          process.exit(1)
        }
        await checkSingleComponent(options.component, registryIndex, config)
      }
    }
  } catch (error) {
    handleError(error)
  }
}

async function checkAllComponents(config: Config) {
  const registriesByNamespace = new Map<
    string | null,
    Array<RegistryIndexItem>
  >()

  const defaultIndex = await getRegistryIndex()
  if (defaultIndex) {
    registriesByNamespace.set(null, defaultIndex)
  }

  if (config.registries) {
    for (const [namespace, registryConfig] of Object.entries(
      config.registries,
    )) {
      try {
        const registryUrl =
          typeof registryConfig === 'string'
            ? registryConfig
            : registryConfig.url

        const indexUrl = extractRegistryIndexUrl(registryUrl)
        const index = await fetchRegistryIndexFromUrl(indexUrl)

        if (index) {
          registriesByNamespace.set(namespace, index)
        }
      } catch (error) {
        logger.debug(`Failed to fetch index for ${namespace}:`, error)
      }
    }
  }

  if (registriesByNamespace.size === 0) {
    logger.error('Failed to fetch any registry indices.')
    process.exit(1)
  }

  const projectComponents: Array<{
    component: RegistryIndexItem
    namespace: string | null
    fullName: string
  }> = []

  const seenFilePaths = new Set<string>()

  for (const [namespace, registryIndex] of registriesByNamespace) {
    for (const item of registryIndex) {
      if (!item.files?.length) continue

      const componentFilePaths = getComponentFilePaths(item, config)

      const isAlreadySeen = componentFilePaths.some((filePath) =>
        seenFilePaths.has(filePath),
      )

      if (isAlreadySeen) {
        continue
      }

      const exists = await checkComponentExists(item, config)
      if (exists) {
        componentFilePaths.forEach((filePath) => seenFilePaths.add(filePath))

        projectComponents.push({
          component: item,
          namespace,
          fullName: namespace ? `${namespace}/${item.name}` : item.name,
        })
      }
    }
  }

  if (projectComponents.length === 0) {
    logger.info('No components found in your project.')
    process.exit(0)
  }

  const componentsWithUpdates = []
  for (const { fullName } of projectComponents) {
    const changes = await diffComponentByName(fullName, config)
    if (changes.length) {
      componentsWithUpdates.push({
        name: fullName,
        changes,
      })
    }
  }

  if (!componentsWithUpdates.length) {
    logger.info('All components are up to date.')
    process.exit(0)
  }

  logger.info('The following components have updates available:')
  logger.break()
  for (const component of componentsWithUpdates) {
    logger.info(`- ${highlighter.info(component.name)}`)
    for (const change of component.changes) {
      logger.log(`  - ${change.filePath}`)
    }
  }
  logger.break()
  logger.info(
    `Run ${highlighter.success(`sui diff <component>`)} to see the changes.`,
  )
  logger.info(
    `Run ${highlighter.success(`sui add ${componentsWithUpdates.map((component) => component.name).join(' ')} --overwrite`)} to update the component(s).`,
  )
}

function extractRegistryIndexUrl(registryUrl: string): string {
  // "https://saas-ui.dev/r/styles/{style}/{name}.json" -> "https://saas-ui.dev/r/index.json"

  try {
    const url = new URL(registryUrl)
    const pathParts = url.pathname.split('/')

    const rIndex = pathParts.findIndex((part) => part === 'r')
    if (rIndex !== -1) {
      const basePath = pathParts.slice(0, rIndex + 1).join('/')
      return `${url.origin}${basePath}/index.json`
    }

    return `${url.origin}/index.json`
  } catch {
    const baseUrl =
      registryUrl.split('/styles/')[0] || registryUrl.split('/{')[0]
    return `${baseUrl}/index.json`
  }
}

async function fetchRegistryIndexFromUrl(
  url: string,
): Promise<Array<RegistryIndexItem> | null> {
  try {
    const { fetchRegistry } = await import('#utils/registry/fetcher')
    const { registryIndexSchema } = await import('#utils/registry/schema')

    const [result] = await fetchRegistry([url])
    return registryIndexSchema.parse(result)
  } catch (error) {
    return null
  }
}

async function diffComponentByName(
  componentName: string,
  config: Config,
): Promise<Array<{ filePath: string; patch: Change[] }>> {
  const tree = await registryResolveItemsTree([componentName], config)
  if (!tree || !tree.files) {
    return []
  }

  return diffComponentFromTree(tree, config)
}

async function checkSingleComponent(
  componentName: string,
  registryIndex: Array<RegistryIndexItem>,
  config: Config,
) {
  const component = registryIndex.find((item) => item.name === componentName)

  if (!component) {
    logger.error(
      `The component ${highlighter.info(
        componentName,
      )} does not exist in the registry.`,
    )
    process.exit(1)
  }

  const exists = await checkComponentExists(component, config)
  if (!exists) {
    logger.error(
      `The component ${highlighter.info(
        componentName,
      )} is not installed in your project.`,
    )
    process.exit(1)
  }

  const changes = await diffComponent(component, config)

  if (!changes.length) {
    logger.info(`No updates found for ${highlighter.info(componentName)}.`)
    process.exit(0)
  }

  logger.info(`Updates available for ${highlighter.info(componentName)}:`)
  logger.break()
  for (const change of changes) {
    logger.info(`File: ${highlighter.info(change.filePath)}`)
    logger.break()
    await printDiff(change.patch)
    logger.break()
  }
}

async function checkNamespacedComponent(componentName: string, config: Config) {
  const { registry, item } = parseRegistryAndItemFromString(componentName)

  if (!registry || !item) {
    logger.error(`Invalid component name: ${highlighter.info(componentName)}`)
    process.exit(1)
  }

  if (!config.registries || !config.registries[registry]) {
    logger.error(`Registry "${registry}" is not configured in components.json`)
    process.exit(1)
  }

  const registryItem = await getRegistryItem(config, componentName)

  if (!registryItem) {
    logger.error(
      `The component ${highlighter.info(componentName)} does not exist in the registry.`,
    )
    process.exit(1)
  }

  const tree = await registryResolveItemsTree([componentName], config)
  if (!tree || !tree.files) {
    logger.error(
      `The component ${highlighter.info(componentName)} is not installed in your project.`,
    )
    process.exit(1)
  }

  let hasInstalledFiles = false
  for (const file of tree.files) {
    if (!file.content) continue

    const targetDir = getRegistryItemFileTargetPath(file, config)
    const fileName = path.basename(file.path)
    let filePath = path.join(targetDir, fileName)

    if (file.target) {
      filePath = file.target.startsWith('~/')
        ? path.join(config.resolvedPaths.cwd, file.target.replace('~/', ''))
        : path.join(config.resolvedPaths.cwd, file.target)
    }

    if (!config.tsx) {
      filePath = filePath.replace(/\.tsx?$/, (match) =>
        match === '.tsx' ? '.jsx' : '.js',
      )
    }

    if (existsSync(filePath)) {
      hasInstalledFiles = true
      break
    }
  }

  if (!hasInstalledFiles) {
    logger.error(
      `The component ${highlighter.info(componentName)} is not installed in your project.`,
    )
    process.exit(1)
  }

  const changes = await diffComponentFromTree(tree, config)

  if (!changes.length) {
    logger.info(`No updates found for ${highlighter.info(componentName)}.`)
    process.exit(0)
  }

  logger.info(`Updates available for ${highlighter.info(componentName)}:`)
  logger.break()
  for (const change of changes) {
    logger.info(`File: ${highlighter.info(change.filePath)}`)
    logger.break()
    await printDiff(change.patch)
    logger.break()
  }
}

function getComponentFilePaths(
  component: RegistryIndexItem,
  config: Config,
): Array<string> {
  const filePaths: Array<string> = []

  if (!component.files?.length) return filePaths

  for (const file of component.files) {
    if (typeof file === 'string') continue

    const targetDir = getRegistryItemFileTargetPath(file, config)
    const fileName = path.basename(file.path)
    let filePath = path.join(targetDir, fileName)

    if (!config.tsx) {
      filePath = filePath.replace(/\.tsx?$/, (match) =>
        match === '.tsx' ? '.jsx' : '.js',
      )
    }

    filePaths.push(filePath)
  }

  return filePaths
}

async function checkComponentExists(
  component: RegistryIndexItem,
  config: Config,
): Promise<boolean> {
  const filePaths = getComponentFilePaths(component, config)

  for (const filePath of filePaths) {
    if (existsSync(filePath)) {
      return true
    }
  }

  return false
}

async function diffComponent(
  component: RegistryIndexItem,
  config: Config,
): Promise<Array<{ filePath: string; patch: Change[] }>> {
  const tree = await registryResolveItemsTree([component.name], config)
  if (!tree || !tree.files) {
    return []
  }

  return diffComponentFromTree(tree, config)
}

async function diffComponentFromTree(
  tree: Awaited<ReturnType<typeof registryResolveItemsTree>>,
  config: Config,
): Promise<Array<{ filePath: string; patch: Change[] }>> {
  if (!tree || !tree.files) {
    return []
  }

  const changes = []

  for (const file of tree.files) {
    if (!file.content) continue

    const targetDir = getRegistryItemFileTargetPath(file, config)
    const fileName = path.basename(file.path)
    let filePath = path.join(targetDir, fileName)

    if (file.target) {
      filePath = file.target.startsWith('~/')
        ? path.join(config.resolvedPaths.cwd, file.target.replace('~/', ''))
        : path.join(config.resolvedPaths.cwd, file.target)
    }

    if (!config.tsx) {
      filePath = filePath.replace(/\.tsx?$/, (match) =>
        match === '.tsx' ? '.jsx' : '.js',
      )
    }

    if (!existsSync(filePath)) {
      continue
    }

    const currentContent = await fs.readFile(filePath, 'utf8')

    const registryContent = await transform(
      {
        filename: file.path,
        raw: file.content,
        config,
        transformJsx: !config.tsx,
      },
      [transformImport, transformRsc],
    )

    const patch = diffLines(currentContent, registryContent)
    if (patch.length > 1) {
      changes.push({
        filePath: path.relative(config.resolvedPaths.cwd, filePath),
        patch,
      })
    }
  }

  return changes
}

async function printDiff(diff: Change[]) {
  diff.forEach((part) => {
    if (part) {
      if (part.added) {
        return process.stdout.write(highlighter.success(`+ ${part.value}`))
      }
      if (part.removed) {
        return process.stdout.write(highlighter.error(`- ${part.value}`))
      }
      return process.stdout.write(`  ${part.value}`)
    }
  })
}
