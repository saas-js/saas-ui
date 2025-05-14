import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import { ComponentCanvas } from './component-canvas'
import { CategoryHeader } from './category-header'
import { Category, UiComponent } from '../../data/blocks'
import { Box } from '@chakra-ui/react'

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
        {canvases}
      </Container>
    </Box>
  )
}
