import { allDocs } from 'contentlayer/generated'
import {
  GridItem,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import OverviewItem from '@/components/overview/item'
import docsSidebar from '@/data/docs-sidebar'
import Layout from '@/layouts/index'
import { Link } from '@saas-ui/react'

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
        title: 'Components',
        description:
          'Professionally crafted Chakra UI components that help you build intuitive React apps with speed.',
        seo: {
          title: 'Professionally crafted Chakra UI components',
          description:
            'Saas UI comes with 60+ React components built with Chakra UI and are designed to help you build intuitive React apps with speed.',
        },
        slug: '/docs/components',
        headings,
      }}
    >
      <VStack w="full" mt={5} alignItems="stretch" spacing={12}>
        <Text apply="mdx.description">
          Professionally crafted Chakra UI components that help you build
          intuitive React apps with speed.
        </Text>

        <Text>
          These components go hand in hand with{' '}
          <Link href="https://chakra-ui.com/docs/components">
            Chakra UI&apos;s core components
          </Link>{' '}
          and help you create visual and functional consistency in your apps.
        </Text>
        <List w="full" spacing={12}>
          {categories.map(({ title, components }) => {
            const slug = title.toLowerCase().replace(/ /g, '-')
            return (
              <ListItem
                key={title}
                display="flex"
                flexDirection="column"
                rowGap={6}
              >
                <Heading as="h2" size="md" id={slug} scrollMarginTop={24}>
                  {title}
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={2}>
                  {components.map(
                    ({ title: componentTitle, description, url }) => {
                      const componentSlug = componentTitle
                        .toLowerCase()
                        .replace(/ /g, '-')
                      return (
                        <GridItem key={componentSlug}>
                          <OverviewItem
                            url={url}
                            title={componentTitle}
                            description={description}
                            slug={componentSlug}
                          />
                        </GridItem>
                      )
                    }
                  )}
                </SimpleGrid>
              </ListItem>
            )
          })}
        </List>
      </VStack>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = docsSidebar.routes
    .find((route) => route.path.match(/\/docs\/components/))
    .routes.concat()
    .splice(1)
  const categories: Category[] = await Promise.all(
    data.map(async ({ title, routes }) => {
      const components = await Promise.all(
        routes.map(async ({ title: routeTitle, path: url }) => {
          const { description } = allDocs.find((doc) => doc.slug === url)
          const component: Component = {
            title: routeTitle,
            url,
            description,
          }

          return component
        })
      )

      const category: Category = {
        title,
        components,
      }

      return category
    })
  )

  const headings = categories.map(({ title }) => ({
    id: title.toLowerCase().replace(/ /g, '-'),
    text: title,
    level: 1,
  }))

  return {
    props: {
      categories,
      headings,
      header: {
        position: 'sticky',
        variant: 'dark',
      },
      footer: false,
    },
  }
}

export default ComponentsOverview
