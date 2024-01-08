import { CategoriesGroup, Category } from './types'
import images from './images'

const fallbackImage = {
  light: '',
  dark: '',
}

export const CATEGORIES: CategoriesGroup[] = [
  {
    name: 'Application UI',
    categories: [
      {
        slug: 'sidebar-layouts',
        name: 'Sidebar layouts',
        images: images.sidebars ?? null,
      },
      {
        slug: 'stacked-layouts',
        name: 'Stacked layouts',
        images: images.navbars ?? null,
      },
      {
        slug: 'settings',
        name: 'Settings sections',
        images: images.settings ?? null,
      },
      {
        slug: 'files',
        name: 'File management',
        images: images.files ?? null,
      },
      {
        slug: 'commandbars',
        name: 'Command bars',
        images: images.commandbars ?? null,
      },
      {
        slug: 'drawers',
        name: 'Drawers',
        images: images.drawers ?? null,
      },
      {
        slug: 'emptystates',
        name: 'Empty states',
        images: images.emptystates ?? null,
      },
      {
        slug: 'modals',
        name: 'Modals',
        images: images.drawers ?? null,
      },
      {
        slug: 'menus',
        name: 'Menus',
        images: images.menus ?? null,
      },
      {
        slug: 'forms',
        name: 'Forms',
        images: images.forms ?? null,
      },
      {
        slug: 'tables',
        name: 'Tables',
        images: images.tables ?? null,
      },
    ],
  },
]

const ALL_CATEGORIES = CATEGORIES.reduce<Category[]>((acc, group) => {
  acc.push(...group.categories)
  return acc
}, [])

export const CATEGORIES_SLUGS = ALL_CATEGORIES.map((item) => item.slug)

export const getCategoryData = (category: string) =>
  ALL_CATEGORIES.find((item) => item.slug === category)
