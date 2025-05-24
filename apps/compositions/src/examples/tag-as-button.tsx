'use client'

import { Tag } from '@saas-ui/react'
import { LuCheck } from 'react-icons/lu'

export const TagAsButton = () => {
  return (
    <Tag as="button" variant="solid" endElement={<LuCheck />}>
      Fish
    </Tag>
  )
}
