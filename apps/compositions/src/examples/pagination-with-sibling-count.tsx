'use client'

import { HStack } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationWithSiblingCount = () => {
  return (
    <Pagination.Root
      count={200}
      pageSize={10}
      defaultPage={10}
      siblingCount={2}
    >
      <HStack>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </HStack>
    </Pagination.Root>
  )
}
