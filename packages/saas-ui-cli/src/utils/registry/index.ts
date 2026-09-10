import { z } from 'zod'

import type { Config } from '#utils/get-config'
import {
  REGISTRY_SCHEMA_VERSION,
  registryBaseColorSchema,
  registryItemFileSchema,
  registryItemSchema,
  registryResolvedItemsTreeSchema,
  stylesSchema,
} from '#utils/registry/schema'

import {
  type RegistryClient,
  type RegistryJsonFetcher,
  createHttpRegistryClient,
  createRegistryClient,
  getDefaultRegistryClient,
  isRegistryUrl,
  resolveRegistryResource,
} from './client'
import { type ResolvedRegistryGraph, resolveRegistryGraph } from './graph'

export {
  createHttpRegistryClient,
  createRegistryClient,
  getDefaultRegistryClient,
  isRegistryUrl,
  resolveRegistryGraph,
  resolveRegistryResource,
}
export type { RegistryClient, RegistryJsonFetcher, ResolvedRegistryGraph }
export {
  RegistryAllSelectionError,
  selectAllRegistryItems,
} from './select-items'

export async function getRegistryIndex(client = getDefaultRegistryClient()) {
  return client.getIndex()
}

export async function getRegistryStyles(client = getDefaultRegistryClient()) {
  if (!client.getJson) {
    throw new Error('This registry client does not support style metadata.')
  }
  return stylesSchema.parse(await client.getJson('styles/index.json'))
}

export async function getRegistryItem(
  name: string,
  style: string,
  client = getDefaultRegistryClient(),
) {
  return client.getItem(name, style)
}

export async function getRegistryBaseColors() {
  return ['neutral', 'gray', 'zinc', 'stone', 'slate'].map((name) => ({
    name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
  }))
}

export async function getRegistryBaseColor(
  baseColor: string,
  client = getDefaultRegistryClient(),
) {
  if (!client.getJson) {
    throw new Error('This registry client does not support color metadata.')
  }
  return registryBaseColorSchema.parse(
    await client.getJson(`colors/${baseColor}.json`),
  )
}

export async function resolveTree(
  index: Awaited<ReturnType<RegistryClient['getIndex']>>,
  names: string[],
) {
  const entries = new Map(index.map((entry) => [entry.name, entry]))
  const result: typeof index = []
  const state = new Map<string, 'visiting' | 'visited'>()
  const visit = (name: string) => {
    if (state.get(name) === 'visited') return
    if (state.get(name) === 'visiting') {
      throw new Error(`Registry dependency cycle detected at "${name}".`)
    }
    const entry = entries.get(name)
    if (!entry) throw new Error(`Registry item "${name}" was not found.`)
    state.set(name, 'visiting')
    for (const dependency of entry.registryDependencies ?? []) {
      if (!isRegistryUrl(dependency)) visit(dependency)
    }
    state.set(name, 'visited')
    result.push(entry)
  }
  for (const name of names) visit(name)
  return result
}

export async function fetchTree(
  style: string,
  tree: Awaited<ReturnType<RegistryClient['getIndex']>>,
  client = getDefaultRegistryClient(),
) {
  return Promise.all(tree.map((item) => client.getItem(item.name, style)))
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<z.infer<typeof registryItemSchema>, 'type'>,
  override?: string,
) {
  if (override) return override
  if (item.type === 'registry:ui') return config.resolvedPaths.ui
  if (item.type === 'registry:icon') return config.resolvedPaths.icons
  if (
    item.type === 'registry:setup' ||
    item.type === 'registry:block' ||
    item.type === 'registry:component' ||
    item.type === 'registry:page'
  ) {
    return config.resolvedPaths.components
  }
  const [, type] = item.type.split(':')
  if (!type || !(type in config.resolvedPaths)) return null
  return config.resolvedPaths[type as keyof typeof config.resolvedPaths]
}

export function getRegistryItemFileTargetPath(
  file: z.infer<typeof registryItemFileSchema>,
  config: Config,
  override?: string,
) {
  if (override) return override
  if (file.type === 'registry:ui') return config.resolvedPaths.ui
  if (file.type === 'registry:lib') return config.resolvedPaths.lib
  if (file.type === 'registry:hook') return config.resolvedPaths.hooks
  if (file.type === 'registry:icon') return config.resolvedPaths.icons
  return config.resolvedPaths.components
}

export async function registryResolveItemsTree(
  names: z.infer<typeof registryItemSchema>['name'][],
  config: Config,
  client = getDefaultRegistryClient(),
) {
  const graph = await resolveRegistryGraph(
    names,
    config.style,
    client,
    config.registries,
  )
  return registryResolvedItemsTreeSchema.parse({
    dependencies: [
      ...new Set(graph.items.flatMap((item) => item.dependencies ?? [])),
    ],
    devDependencies: [
      ...new Set(graph.items.flatMap((item) => item.devDependencies ?? [])),
    ],
    files: graph.items.flatMap((item) => item.files ?? []),
    docs: graph.items
      .flatMap((item) => (item.docs ? [item.docs] : []))
      .join('\n'),
  })
}

export async function registryGetTheme(
  name: string,
  config: Config,
  client = getDefaultRegistryClient(),
) {
  const baseColor = await getRegistryBaseColor(name, client)
  if (!baseColor) return null
  return {
    schemaVersion: REGISTRY_SCHEMA_VERSION,
    name,
    type: 'registry:theme',
    tailwind: {
      config: {
        theme: {
          extend: {
            borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)',
            },
            colors: {},
          },
        },
      },
    },
    cssVars: { light: { radius: '0.5rem' }, dark: {} },
  } satisfies z.infer<typeof registryItemSchema>
}
