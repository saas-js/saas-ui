'use client'

import { HStack } from '@chakra-ui/react'
import { Tag } from '@saas-ui/react'
import { LuCircleUser, LuFileBadge } from 'react-icons/lu'

export const TagWithIcon = () => {
  return (
    <HStack>
      <Tag startElement={<LuCircleUser />}>Tag 2</Tag>
      <Tag startElement={<LuFileBadge />}>Top Rated</Tag>
    </HStack>
  )
}
