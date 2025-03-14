'use client'

import { SegmentedControl } from '@saas-ui/react'

export const SegmentedControlBasic = () => {
  return (
    <SegmentedControl defaultValue="React" items={['React', 'Vue', 'Solid']} />
  )
}
