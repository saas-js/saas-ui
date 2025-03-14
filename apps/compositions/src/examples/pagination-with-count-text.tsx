'use client'

import { HStack } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationWithCountText = () => {
  return (
    <Pagination.Root count={50} pageSize={5} defaultPage={1} maxW="240px">
      <HStack gap="4">
        <Pagination.PageText format="long" flex="1" />
        <Pagination.PrevTrigger />
        <Pagination.NextTrigger />
      </HStack>
    </Pagination.Root>
  )
}
