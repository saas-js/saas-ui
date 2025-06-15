import { GetStaticPaths, GetStaticProps } from 'next'
import { CATEGORIES_SLUGS, getCategoryData, Category } from '../../data/blocks'
import {
  getAllComponents,
  getComponentsByCategory,
} from '../../data/blocks/components'
import { CategoryPage } from '../../components/blocks/category-page'

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: CATEGORIES_SLUGS.map((slug) => ({ params: { category: slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<
  { category: Category | undefined },
  { category: string }
> = (context) => {
  return {
    props: {
      category: getCategoryData(context!.params!.category),
      components: getComponentsByCategory()[context!.params!.category] ?? [],
      allComponents: getAllComponents(),
      header: {
        position: 'sticky',
      },
    },
  }
}
