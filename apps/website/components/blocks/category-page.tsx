'use client'

import { Category, UiComponent } from '@/blocks'
import { Box, Container } from '@saas-ui/react'

import { CategoryHeader } from './category-header'
import { ComponentCanvas } from './component-canvas'

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
      <Container maxWidth="container.xl" px="8" py="20">
        <CategoryHeader category={category} />
        {canvases}
      </Container>
    </Box>
  )
}
