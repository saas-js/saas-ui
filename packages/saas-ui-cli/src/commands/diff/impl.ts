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
  getRegistryItemFileTargetPath,
  registryResolveItemsTree,
} from '#utils/registry'
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
    const options = diffOptionsSchema.parse({
      ...flags,
      component: components[0],
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

    const registryIndex = await getRegistryIndex()
    if (!registryIndex) {
      handleError(new Error('Failed to fetch registry index.'))
      process.exit(1)
    }

    if (!options.component) {
      await checkAllComponents(registryIndex, config)
    } else {
      await checkSingleComponent(options.component, registryIndex, config)
    }
  } catch (error) {
    handleError(error)
  }
}

async function checkAllComponents(
  registryIndex: Array<RegistryIndexItem>,
  config: Config,
) {
  const projectComponents = []

  // console.log('registryIndex', registryIndex)

  for (const item of registryIndex) {
    if (!item.files?.length) continue

    const exists = await checkComponentExists(item, config)
    if (exists) {
      projectComponents.push(item)
    }
  }

  if (projectComponents.length === 0) {
    logger.info('No components found in your project.')
    process.exit(0)
  }

  const componentsWithUpdates = []
  for (const component of projectComponents) {
    const changes = await diffComponent(component, config)
    if (changes.length) {
      componentsWithUpdates.push({
        name: component.name,
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

async function checkComponentExists(
  component: RegistryIndexItem,
  config: Config,
): Promise<boolean> {
  if (!component.files?.length) return false

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
  const changes = []

  const tree = await registryResolveItemsTree([component.name], config)
  if (!tree || !tree.files) {
    return []
  }

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
