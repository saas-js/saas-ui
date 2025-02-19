'use client'

import { List } from '@chakra-ui/react'
import { EmptyState } from '@saas-ui/react'
import { LuSearch } from 'react-icons/lu'

export const EmptyStateWithList = () => {
  return (
    <EmptyState
      icon={<LuSearch />}
      title="No results found"
      description="Try adjusting your search"
    >
      <List.Root variant="marker">
        <List.Item>Try removing filters</List.Item>
        <List.Item>Try different keywords</List.Item>
      </List.Root>
    </EmptyState>
  )
}
