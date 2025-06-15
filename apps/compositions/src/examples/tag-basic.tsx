'use client'

import { HStack } from '@chakra-ui/react'
import { Tag } from '@saas-ui/react'

export const TagBasic = () => {
  return (
    <HStack>
      <Tag>Plain Tag</Tag>
      <Tag closable>Closable Tag</Tag>
    </HStack>
  )
}
