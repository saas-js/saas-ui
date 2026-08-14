'use client'

import { useState } from 'react'

import { NumberInput } from 'compositions/ui/number-input'

export const NumberInputControlled = () => {
  const [value, setValue] = useState('10')
  return (
    <NumberInput
      maxW="200px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    />
  )
}
