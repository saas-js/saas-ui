'use client'

import { HStack } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationBasic = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <HStack>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </HStack>
    </Pagination.Root>
  )
}
