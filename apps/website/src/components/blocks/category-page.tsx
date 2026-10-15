import { Container, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { ComponentCanvas } from './component-canvas'
import { CategoryHeader } from './category-header'
import { Category, UiComponent } from '../../data/blocks'
import { Box } from '@chakra-ui/react'
import { ButtonLink } from '../link'

interface CategoryPageProps {
  category: Category
  components: UiComponent[]
}

export function CategoryPage({ category, components }: CategoryPageProps) {
  const canvases = components.map((component, index) => (
    <ComponentCanvas
      {...component}
      key={component.slug}
      zIndex={components.length - index}
    />
  ))

  return (
    <Box>
      <Head>
        <title>{`${category.name} | Saas UI`}</title>
      </Head>
      <Container maxWidth="container.xl" px="8" py="20">
        <CategoryHeader category={category} />
        {canvases.length ? (
          canvases
        ) : (
          <Text color="muted" maxW="xl">
            Live block previews are not part of this static v2 archive.{' '}
            <ButtonLink href="https://saas-ui.dev/blocks" variant="link">
              View blocks on the current site
            </ButtonLink>
            .
          </Text>
        )}
      </Container>
    </Box>
  )
}
