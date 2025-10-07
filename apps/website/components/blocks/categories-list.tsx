import { CategoriesGroup } from '@/blocks'
import { SimpleGrid } from '@saas-ui/react'

import { CategoryCard } from './category-card'

interface CategoriesListProps {
  groups: CategoriesGroup[]
  componentsCountByCategory: Record<string, number>
}

export function CategoriesList({
  groups,
  componentsCountByCategory,
}: CategoriesListProps) {
  const items = groups.map((group) => {
    const cards = group.categories.map((category) => (
      <CategoryCard
        key={category.slug}
        category={category}
        count={componentsCountByCategory[category.slug]}
      />
    ))

    return (
      <div key={group.name}>
        <SimpleGrid id="cards-grid" columns={{ base: 1, md: 2, xl: 4 }} gap="8">
          {cards}
        </SimpleGrid>
      </div>
    )
  })

  return <div>{items}</div>
}
