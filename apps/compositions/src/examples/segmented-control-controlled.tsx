'use client'

import { useState } from 'react'

import { SegmentedControl } from 'compositions/ui/segmented-control'

export const SegmentedControlControlled = () => {
  const [value, setValue] = useState('React')
  return (
    <SegmentedControl
      value={value}
      onValueChange={(e) => e.value && setValue(e.value)}
      items={['React', 'Vue', 'Solid']}
    />
  )
}
