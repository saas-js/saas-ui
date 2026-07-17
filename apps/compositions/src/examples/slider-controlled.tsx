'use client'

import { useState } from 'react'

import { Slider } from 'compositions/ui/slider'

export const SliderControlled = () => {
  const [value, setValue] = useState([40])
  return (
    <Slider
      maxW="200px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    />
  )
}
