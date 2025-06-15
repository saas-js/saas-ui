'use client'

import { HStack } from '@chakra-ui/react'
import { Tag } from '@saas-ui/react'
import { LuActivity } from 'react-icons/lu'

export const TagWithClose = () => {
  return (
    <HStack>
      <Tag startElement={<LuActivity />} closable>
        Tag 1
      </Tag>
      <Tag closable>Tag 2</Tag>
    </HStack>
  )
}
