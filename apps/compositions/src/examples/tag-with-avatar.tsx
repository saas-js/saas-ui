'use client'

import { For, HStack } from '@chakra-ui/react'
import { Avatar, Tag } from '@saas-ui/react'

export const TagWithAvatar = () => {
  return (
    <HStack>
      <For each={['sm', 'md', 'lg', 'xl']}>
        {(size) => (
          <Tag
            key={size}
            rounded="full"
            size={size}
            startElement={
              <Avatar
                size="full"
                src="https://i.pravatar.cc/300?u=1"
                name="John Doe"
              />
            }
          >
            Emily ({size})
          </Tag>
        )}
      </For>
    </HStack>
  )
}
