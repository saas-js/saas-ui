'use client'

import { SegmentedControl } from '@saas-ui/react'

export const SegmentedControlWithDisabled = () => {
  return (
    <SegmentedControl
      disabled
      defaultValue="React"
      items={['React', 'Vue', 'Solid']}
    />
  )
}
