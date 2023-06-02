import { allDocs } from 'contentlayer/generated'
import { VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import docsSidebar from '@/data/docs-sidebar'
import Layout from '@/layouts/index'

type Component = {
  title: string
  description: string
  url: string
}

type Category = {
  title: string
  components: Component[]
}

type Props = {
  categories: Category[]
  headings: { id: string; text: string; level: number }[]
}

export const ComponentsOverview = ({ categories, headings }: Props) => {
  return (
    <Layout
      frontMatter={{
        title: 'Guides',
        description: 'Learn how to build React apps with Saas UI.',
        seo: {
          title: 'Guides',
          description: 'Learn how to build React apps with Saas UI.',
        },
        slug: '/docs/guides',
        headings,
      }}
    >
      <VStack w="full" mt={5} alignItems="stretch" spacing={12}></VStack>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<any> = async () => {
  //   const data = docsSidebar.routes
  //     .find((route) => route.path.match(/\/docs\/guides/))
  //     ?.routes.concat()
  //     .splice(1)
  //   const categories: Category[] = await Promise.all(
  //     data?.map(async ({ title, routes }) => {
  //       const components = await Promise.all(
  //         routes.map(async ({ title: routeTitle, path: url }) => {
  //           const doc = allDocs.find((doc) => doc.slug === url)
  //           const component: Component = {
  //             title: routeTitle,
  //             url,
  //             description: doc?.description || null,
  //           }

  //           return component
  //         })
  //       )

  //       const category: Category = {
  //         title,
  //         components,
  //       }

  //       return category
  //     })
  //   )

  //   const headings = categories?.map(({ title }) => ({
  //     id: title.toLowerCase().replace(/ /g, '-'),
  //     text: title,
  //     level: 1,
  //   }))

  return {
    props: {
      //   categories,
      //   headings,
      header: {
        position: 'sticky',
        variant: 'dark',
      },
      footer: false,
    },
  }
}

export default ComponentsOverview
