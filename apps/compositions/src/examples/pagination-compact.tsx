'use client'

import { HStack } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationCompact = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <HStack gap="4">
        <Pagination.PrevTrigger />
        <Pagination.PageText />
        <Pagination.NextTrigger />
      </HStack>
    </Pagination.Root>
  )
}
