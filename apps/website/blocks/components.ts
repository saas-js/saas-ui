import {
  type RegistryIndexItem,
  type RegistryItem,
  parseRegistryIndex,
  parseRegistryItem,
} from '@saas-ui/registry/schema'

import type { UiComponent } from './types'

const registryBaseUrl = () =>
  (process.env.PRO_REGISTRY_URL ?? 'http://localhost:4000/r').replace(
    /\/+$/,
    '',
  )

function itemUrl(name: string) {
  const baseUrl = registryBaseUrl()
  if (!baseUrl) return undefined
  return `${baseUrl}/styles/default/${encodeURIComponent(name)}.json`
}

function storybookSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

function sourcePath(item: RegistryIndexItem | RegistryItem) {
  for (const value of item.files ?? []) {
    if (typeof value !== 'string') return value.path
  }
  return undefined
}

function blockCategory(item: RegistryIndexItem | RegistryItem) {
  const path = sourcePath(item)
  return path?.split('/')[1] ?? item.subcategory ?? item.category
}

function blockPreview(item: RegistryIndexItem | RegistryItem) {
  if (item.preview) return item.preview

  const category = blockCategory(item)
  if (!category) return undefined

  return `blocks-${storybookSegment(category)}-${storybookSegment(item.name)}--default`
}

function previewUrl(preview: string | undefined) {
  const storybookUrl = (
    process.env.PRO_STORYBOOK_URL ?? 'http://localhost:6007'
  ).replace(/\/+$/, '')
  if (!storybookUrl || !preview) return undefined
  return `${storybookUrl}/iframe.html?id=${encodeURIComponent(preview)}&viewMode=story`
}

function componentFromItem(
  item: RegistryIndexItem | RegistryItem,
): UiComponent {
  const meta = item.meta ?? {}
  const canvas = item.canvas ?? {}
  const category = blockCategory(item) ?? 'uncategorized'
  const preview = blockPreview(item)
  const canvasMaxWidth = canvas.maxWidth
  const canvasClassName = canvas.className
  const canvasHeight = canvas.height
  const canvasOverflow = canvas.overflow

  return {
    component: item.name,
    slug: item.name,
    code: [],
    attributes: {
      category,
      title:
        typeof meta.title === 'string'
          ? meta.title
          : item.name.replaceAll('-', ' '),
      description: item.description,
      version: item.version,
      public: item.private !== true,
      private: item.private === true,
      preview,
      previewUrl: previewUrl(preview),
      canvas: {
        center: canvas.center ?? false,
        maxWidth:
          typeof canvasMaxWidth === 'string' ||
          typeof canvasMaxWidth === 'number'
            ? canvasMaxWidth
            : undefined,
        className:
          typeof canvasClassName === 'string' ? canvasClassName : undefined,
        height:
          typeof canvasHeight === 'string' || typeof canvasHeight === 'number'
            ? canvasHeight
            : undefined,
        overflow:
          typeof canvasOverflow === 'string' ? canvasOverflow : undefined,
      },
    },
  }
}

export async function getProRegistryIndex(
  fetchImplementation: typeof globalThis.fetch = globalThis.fetch,
) {
  const baseUrl = registryBaseUrl()
  if (!baseUrl || !fetchImplementation) return []

  try {
    const response = await fetchImplementation(`${baseUrl}/index.json`, {
      cache: 'no-store',
    })
    if (!response.ok) return []
    return parseRegistryIndex(await response.json(), 'Pro registry index')
  } catch {
    return []
  }
}

export async function getProRegistryItem(
  name: string,
  options: {
    authorization?: string
    fetchImplementation?: typeof globalThis.fetch
  } = {},
) {
  const url = itemUrl(name)
  if (!url) return null

  const headers = new Headers()
  if (options.authorization) headers.set('Authorization', options.authorization)

  const response = await (options.fetchImplementation ?? globalThis.fetch)(
    url,
    {
      headers,
      cache: 'no-store',
    },
  )
  if (!response.ok) return null
  return parseRegistryItem(await response.json(), `Pro registry item ${name}`)
}

export async function getAllComponents(): Promise<UiComponent[]> {
  const items = await getProRegistryIndex()
  return items
    .filter((item) => item.type === 'registry:block')
    .map(componentFromItem)
    .sort((left, right) => {
      const leftPrivate = left.attributes.private ? 1 : 0
      const rightPrivate = right.attributes.private ? 1 : 0
      return (
        leftPrivate - rightPrivate ||
        left.attributes.category.localeCompare(right.attributes.category) ||
        left.slug.localeCompare(right.slug)
      )
    })
}

export async function getComponent(
  categoryName: string,
  componentName: string,
) {
  const component = (await getAllComponents()).find(
    (item) =>
      item.slug === componentName && item.attributes.category === categoryName,
  )
  return component ?? null
}

export async function getComponentsByCategory() {
  const all = await getAllComponents()
  return all.reduce<Record<string, UiComponent[]>>((acc, component) => {
    const category = component.attributes.category
    acc[category] ??= []
    acc[category].push(component)
    return acc
  }, {})
}

export async function countComponentsByCategory() {
  const all = await getAllComponents()
  return all.reduce<Record<string, number>>((acc, component) => {
    const category = component.attributes.category
    acc[category] = (acc[category] ?? 0) + 1
    return acc
  }, {})
}

export async function getComponentsByChangelog(changelogId: string) {
  const all = await getAllComponents()
  return all.filter(
    (component) => component.attributes.changelog === changelogId,
  )
}

export async function getAllChangelogs() {
  const all = await getAllComponents()
  return Array.from(
    new Set(all.map((component) => component.attributes.changelog)),
  ).filter((value): value is string => Boolean(value))
}
