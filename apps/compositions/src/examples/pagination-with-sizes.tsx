'use client'

import { For, HStack, Stack } from '@chakra-ui/react'
import { Pagination } from '@saas-ui/react'

export const PaginationWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={['xs', 'sm', 'md', 'lg']}>
        {(size) => (
          <Pagination.Root
            key={size}
            count={10}
            pageSize={2}
            defaultPage={1}
            size={size}
          >
            <HStack>
              <Pagination.PrevTrigger />
              <Pagination.Items />
              <Pagination.NextTrigger />
            </HStack>
          </Pagination.Root>
        )}
      </For>
    </Stack>
  )
}
