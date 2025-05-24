'use client'

import { Group } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationAttached = () => {
  return (
    <Pagination.Root count={10} pageSize={2} defaultPage={1} variant="solid">
      <Group attached>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Group>
    </Pagination.Root>
  )
}
