'use client'

import { Tag } from 'compositions/ui/tag'
import { LuCheck } from 'react-icons/lu'

export const TagAsButton = () => {
  return (
    <Tag as="button" variant="solid" endElement={<LuCheck />}>
      Fish
    </Tag>
  )
}
