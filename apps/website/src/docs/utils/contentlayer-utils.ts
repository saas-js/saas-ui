import { allDocs, Doc } from 'contentlayer/generated'

import { MixedArray, toArray, uniq } from './js-utils'

export function getDocByType(id: string) {
  return allDocs.filter((doc) => {
    return doc.slug.startsWith(`/docs/${id}`)
  })
}

function toCapitalized(str: string) {
  const result = str.charAt(0).toUpperCase() + str.slice(1)
  return result.replace(/-/g, ' ')
}

export function getGroupedComponents() {
  return getDocByType('components').reduce((acc, doc) => {
    const category = doc.category
    if (!category) return acc
    acc[toCapitalized(category)] ??= []
    acc[toCapitalized(category)].push(doc)
    return acc
  }, {} as { [key: string]: any[] })
}

const getUsageDoc = (id: string) => {
  return allDocs.find(
    (_doc) => _doc.id === id && (_doc.scope === 'usage' || !_doc.scope)
  )
}

const getThemingDoc = (id: string) => {
  return allDocs.find((_doc) => _doc.id === id && _doc.scope === 'theming')
}

const getPropsDoc = (id: string) => {
  return allDocs.find((_doc) => _doc.id === id && _doc.scope === 'props')
}

export const getDocDoc = (slug: MixedArray): Doc | undefined => {
  const params = toArray(slug)
  const _slug = params.join('/')
  const doc = allDocs.find((doc) => {
    return doc.slug.endsWith(_slug) || doc.slug.endsWith(`${_slug}/usage`)
  }) as Doc | undefined

  if (!doc) return

  const isThemingTab = doc.scope === 'theming'
  const isPropsTab = doc.scope === 'props'

  if (isThemingTab) {
    doc.frontMatter = {
      ...doc.frontMatter,
      ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
      ...(getThemingDoc(doc.id)?.frontMatter ?? {}),
    }
  }

  if (isPropsTab) {
    doc.frontMatter = {
      ...doc.frontMatter,
      ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
      ...(getPropsDoc(doc.id)?.frontMatter ?? {}),
    }
  }

  return doc
}

export type TabsData = ReturnType<typeof getComponentTabsData>

export function getComponentTabsData(slug: MixedArray) {
  const params = toArray(slug)
  const _slug = params.join('/')
  const getSlug = (id: string) => {
    const res = uniq([...params, id])
    if (res.length > 4) res.splice(3, 1)
    if (id === 'usage') res.splice(3, 1)
    return res
  }

  const usageSlug = getSlug('usage')
  const propsSlug = getSlug('props')
  const themingSlug = getSlug('theming')

  const data = [
    {
      id: 'usage',
      match: _slug.endsWith('/usage') || params.length === 3,
      href: { query: { slug: usageSlug } },
      label: 'Usage',
      doc: getDocDoc(getSlug('usage')),
    },
    {
      id: 'props',
      match: _slug.endsWith('/props'),
      href: { query: { slug: propsSlug } },
      label: 'Props',
      doc: getDocDoc(getSlug('props')),
    },
    {
      id: 'theming',
      match: _slug.endsWith('/theming'),
      label: 'Theming',
      href: { query: { slug: themingSlug } },
      doc: getDocDoc(getSlug('theming')),
    },
  ]
  return data.filter((item) => item.doc)
}
