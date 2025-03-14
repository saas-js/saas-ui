import { docs } from '.velite'

const gettingStarted = docs
  .filter((page) => page.category.startsWith('docs/getting-started'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Getting started',
  }))

const styling = docs
  .filter((page) => page.category.startsWith('docs/styling'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Styling',
  }))

const theming = docs
  .filter((page) => page.category.startsWith('docs/theming'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Styling',
  }))

const components = docs
  .filter((page) => page.category.startsWith('docs/components'))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: 'Components',
  }))

export const data = { gettingStarted, styling, theming, components }
