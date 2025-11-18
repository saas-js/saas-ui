import deepmerge from 'deepmerge'
import { z } from 'zod'

import type { Config } from '#utils/get-config'
import { handleError } from '#utils/handle-error'
import { logger } from '#utils/logger'
import {
  buildHeadersFromRegistryConfig,
  buildUrlAndHeadersForRegistryItem,
} from '#utils/registry/builder'
import {
  clearRegistryContext,
  setRegistryHeaders,
} from '#utils/registry/context'
import { expandEnvVars } from '#utils/registry/env'
import {
  RegistryNotConfiguredError,
  RegistryParseError,
} from '#utils/registry/errors'
import { fetchRegistry, fetchRegistryLocal } from '#utils/registry/fetcher'
import { parseRegistryAndItemFromString } from '#utils/registry/parser'
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemSchema,
  registryResolvedItemsTreeSchema,
  stylesSchema,
} from '#utils/registry/schema'
import { isLocalFile, isUrl } from '#utils/registry/utils'

export async function getRegistryIndex(config?: Config, namespace?: string) {
  try {
    let path: string

    if (namespace) {
      if (!config?.registries || !config.registries[namespace]) {
        throw new RegistryNotConfiguredError(namespace)
      }

      const registryConfig = config.registries[namespace]
      const headers = buildHeadersFromRegistryConfig(registryConfig)

      let indexUrl: string
      if (typeof registryConfig === 'string') {
        indexUrl = registryConfig.replace('{name}', 'index')
        indexUrl = indexUrl.replace(/\/styles\/[^/]+\//, '/')
        indexUrl = expandEnvVars(indexUrl)
      } else {
        indexUrl = registryConfig.url.replace('{name}', 'index')
        indexUrl = indexUrl.replace(/\/styles\/[^/]+\//, '/')
        indexUrl = expandEnvVars(indexUrl)
      }

      setRegistryHeaders({ [indexUrl]: headers })
      path = indexUrl
    } else {
      path = `r/index.json`
    }

    const [result] = await fetchRegistry([path])

    return registryIndexSchema.parse(result)
  } catch (error) {
    logger.error('\n')
    handleError(error)
  } finally {
    if (namespace) {
      clearRegistryContext()
    }
  }
}

export async function getRegistryStyles() {
  try {
    const [result] = await fetchRegistry(['r/styles/index.json'])

    return stylesSchema.parse(result)
  } catch (error) {
    logger.error('\n')
    handleError(error)
    return []
  }
}

async function fetchRegistryItems(
  items: Array<string>,
  config: Config,
  options: { useCache?: boolean } = {},
) {
  const results = await Promise.all(
    items.map(async (item) => {
      if (isLocalFile(item)) {
        return fetchRegistryLocal(item)
      }

      if (isUrl(item)) {
        const [result] = await fetchRegistry([item], options)
        try {
          return registryItemSchema.parse(result)
        } catch (error) {
          throw new RegistryParseError(item, error)
        }
      }

      if (item.startsWith('@') && config?.registries) {
        const paths = resolveRegistryItemsFromRegistries([item], config)
        const [result] = await fetchRegistry(paths, options)
        try {
          return registryItemSchema.parse(result)
        } catch (error) {
          throw new RegistryParseError(item, error)
        }
      }

      const path = `r/styles/${config?.style ?? 'default'}/${item}.json`
      const [result] = await fetchRegistry([path], options)
      try {
        return registryItemSchema.parse(result)
      } catch (error) {
        throw new RegistryParseError(item, error)
      }
    }),
  )

  return results
}

function resolveRegistryItemsFromRegistries(
  items: Array<string>,
  config: Config,
) {
  const registryHeaders: Record<string, Record<string, string>> = {}
  const resolvedItems = [...items]

  if (!config?.registries) {
    setRegistryHeaders({})
    return resolvedItems
  }

  for (let i = 0; i < resolvedItems.length; i++) {
    const itemName = resolvedItems[i]
    if (!itemName) continue

    const resolved = buildUrlAndHeadersForRegistryItem(itemName, config)

    if (resolved?.url) {
      resolvedItems[i] = resolved.url

      if (Object.keys(resolved.headers).length > 0) {
        registryHeaders[resolved.url] = resolved.headers
      }
    }
  }

  setRegistryHeaders(registryHeaders)

  return resolvedItems
}

export async function registryResolveItemsTree(
  names: Array<string>,
  config: Config,
  options: { useCache?: boolean } = {},
) {
  options = {
    useCache: true,
    ...options,
  }

  clearRegistryContext()

  const payload: Array<z.infer<typeof registryItemSchema>> = []
  const uniqueNames = Array.from(new Set(names))

  const results = await fetchRegistryItems(uniqueNames, config, options)

  for (let i = 0; i < results.length; i++) {
    const item = results[i]
    if (item) {
      payload.push(item)

      if (item.registryDependencies) {
        const deps = await resolveDependenciesRecursively(
          item.registryDependencies,
          config,
          options,
          new Set(uniqueNames),
        )
        payload.push(...deps)
      }
    }
  }

  if (!payload.length) {
    return null
  }

  let docs = ''
  payload.forEach((item) => {
    if (item.docs) {
      docs += `${item.docs}\n`
    }
  })

  const parsed = registryResolvedItemsTreeSchema.parse({
    dependencies: deepmerge.all(payload.map((item) => item.dependencies ?? [])),
    devDependencies: deepmerge.all(
      payload.map((item) => item.devDependencies ?? []),
    ),
    files: deepmerge.all(payload.map((item) => item.files ?? [])),
    tailwind: payload.reduce(
      (acc, item) => deepmerge(acc, item.tailwind ?? {}),
      {},
    ),
    cssVars: payload.reduce(
      (acc, item) => deepmerge(acc, item.cssVars ?? {}),
      {},
    ),
    docs,
  })

  return parsed
}

async function resolveDependenciesRecursively(
  dependencies: Array<string>,
  config: Config,
  options: { useCache?: boolean } = {},
  visited: Set<string> = new Set(),
): Promise<Array<z.infer<typeof registryItemSchema>>> {
  const items: Array<z.infer<typeof registryItemSchema>> = []

  for (const dep of dependencies) {
    if (visited.has(dep)) {
      continue
    }
    visited.add(dep)

    if (isUrl(dep) || isLocalFile(dep)) {
      const [item] = await fetchRegistryItems([dep], config, options)
      if (item) {
        items.push(item)
        if (item.registryDependencies) {
          const resolvedDeps = config?.registries
            ? resolveRegistryItemsFromRegistries(
                item.registryDependencies,
                config,
              )
            : item.registryDependencies

          const nested = await resolveDependenciesRecursively(
            resolvedDeps,
            config,
            options,
            visited,
          )
          items.push(...nested)
        }
      }
    } else if (dep.startsWith('@') && config?.registries) {
      const { registry } = parseRegistryAndItemFromString(dep)
      if (registry && !(registry in config.registries)) {
        throw new RegistryNotConfiguredError(registry)
      }

      const [item] = await fetchRegistryItems([dep], config, options)
      if (item) {
        items.push(item)
        if (item.registryDependencies) {
          const resolvedDeps = config?.registries
            ? resolveRegistryItemsFromRegistries(
                item.registryDependencies,
                config,
              )
            : item.registryDependencies

          const nested = await resolveDependenciesRecursively(
            resolvedDeps,
            config,
            options,
            visited,
          )
          items.push(...nested)
        }
      }
    } else {
      try {
        const [item] = await fetchRegistryItems([dep], config, options)
        if (item && item.registryDependencies) {
          const resolvedDeps = config?.registries
            ? resolveRegistryItemsFromRegistries(
                item.registryDependencies,
                config,
              )
            : item.registryDependencies

          const nested = await resolveDependenciesRecursively(
            resolvedDeps,
            config,
            options,
            visited,
          )
          items.push(...nested)
        }
      } catch (error) {
        continue
      }
    }
  }

  return items
}

export async function getRegistryItem(config: Config, name: string) {
  const [item] = await fetchRegistryItems([name], config)
  return item
}

export async function getRegistryBaseColors() {
  return [
    {
      name: 'neutral',
      label: 'Neutral',
    },
    {
      name: 'gray',
      label: 'Gray',
    },
    {
      name: 'zinc',
      label: 'Zinc',
    },
    {
      name: 'stone',
      label: 'Stone',
    },
    {
      name: 'slate',
      label: 'Slate',
    },
  ]
}

export async function getRegistryBaseColor(config: Config, baseColor: string) {
  try {
    const [result] = await fetchRegistry([`colors/${baseColor}.json`])

    return registryBaseColorSchema.parse(result)
  } catch (error) {
    handleError(error)
  }
}

export function getRegistryItemFileTargetPath(
  file: {
    path: string
    content?: string
    type: z.infer<typeof registryItemSchema>['type']
    target?: string
  },
  config: Config,
  override?: string,
) {
  if (override) {
    return override
  }

  if (file.type === 'registry:ui') {
    return config.resolvedPaths.ui
  }

  if (file.type === 'registry:lib') {
    return config.resolvedPaths.lib
  }

  if (file.type === 'registry:block' || file.type === 'registry:component') {
    return config.resolvedPaths.components
  }

  if (file.type === 'registry:hook') {
    return config.resolvedPaths.hooks
  }

  if (file.type === 'registry:page') {
    return config.resolvedPaths.components
  }

  return config.resolvedPaths.components
}

export { clearRegistryContext } from '#utils/registry/context'
export { parseRegistryAndItemFromString } from '#utils/registry/parser'
