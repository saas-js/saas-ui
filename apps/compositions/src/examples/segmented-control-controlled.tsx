'use client'

import { useState } from 'react'

import { SegmentedControl } from '@saas-ui/react'

export const SegmentedControlControlled = () => {
  const [value, setValue] = useState('React')
  return (
    <SegmentedControl
      value={value}
      onValueChange={(e) => setValue(e.value)}
      items={['React', 'Vue', 'Solid']}
    />
  )
}
