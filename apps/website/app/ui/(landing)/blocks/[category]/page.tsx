import { CATEGORIES_SLUGS, getCategoryData } from '@/blocks'
import { getAllComponents, getComponentsByCategory } from '@/blocks/components'
import { CategoryPage } from '@/components/blocks/category-page'
import { notFound } from 'next/navigation'

export default async function Page(props: {
  params: Promise<{ category: string }>
}) {
  const params = await props.params

  const category = getCategoryData(params.category)

  if (!category) {
    throw notFound()
  }

  const componentsByCategory = await getComponentsByCategory()
  const components = componentsByCategory[params.category] ?? []

  return <CategoryPage category={category} components={components} />
}

export const generateStaticParams = async () =>
  CATEGORIES_SLUGS.map((slug) => ({ category: slug }))
