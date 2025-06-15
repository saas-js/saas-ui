'use client'

import { useState } from 'react'

import { HStack } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationControlled = () => {
  const [page, setPage] = useState(1)

  return (
    <Pagination.Root
      count={20}
      pageSize={2}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <HStack>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </HStack>
    </Pagination.Root>
  )
}
