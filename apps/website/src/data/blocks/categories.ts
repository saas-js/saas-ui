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
        images: images.navbars ?? null,
      },
      {
        slug: 'settings',
        name: 'Settings',
        images: fallbackImage,
      },
      {
        slug: 'files',
        name: 'File management',
        images: fallbackImage,
      },
      {
        slug: 'billing',
        name: 'Payments & Billing',
        images: fallbackImage,
      },
      {
        slug: 'charts',
        name: 'Charts',
        images: fallbackImage,
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
