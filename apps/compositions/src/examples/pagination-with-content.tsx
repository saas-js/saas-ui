'use client'

import { useState } from 'react'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

const pageSize = 5
const count = 50
const items = new Array(count)
  .fill(0)
  .map((_, index) => `Lorem ipsum dolor sit amet ${index + 1}`)

export const PaginationWithContent = () => {
  const [page, setPage] = useState(1)

  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize

  const visibleItems = items.slice(startRange, endRange)

  return (
    <Stack gap="4">
      <Stack>
        {visibleItems.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>
      <Pagination.Root
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
      >
        <HStack>
          <Pagination.PrevTrigger />
          <Pagination.Items />
          <Pagination.NextTrigger />
        </HStack>
      </Pagination.Root>
    </Stack>
  )
}
