'use client'

import { useState } from 'react'

import { PinInput } from 'compositions/ui/pin-input'

export const PinInputControlled = () => {
  const [value, setValue] = useState(['', '', '', ''])
  return <PinInput value={value} onValueChange={(e) => setValue(e.value)} />
}
