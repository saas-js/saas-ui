import { allDocs } from 'content-collections'

const gettingStarted = allDocs
  .filter((page) => page.category.startsWith('docs/getting-started'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Getting started',
  }))

const styling = allDocs
  .filter((page) => page.category.startsWith('docs/styling'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Styling',
  }))

const theming = allDocs
  .filter((page) => page.category.startsWith('docs/theming'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Styling',
  }))

const components = allDocs
  .filter((page) => page.category.startsWith('docs/components'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Components',
  }))

export const data = { gettingStarted, styling, theming, components }
