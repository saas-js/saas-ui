'use client'

import { SegmentedControl } from '@saas-ui/react'

export const SegmentedControlWithDisabledItem = () => {
  return (
    <SegmentedControl
      defaultValue="React"
      items={[
        { label: 'React', value: 'React' },
        { label: 'Vue', value: 'Vue', disabled: true },
        { label: 'Solid', value: 'Solid' },
      ]}
    />
  )
}
