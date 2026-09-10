'use client'

import { useState } from 'react'

import { RatingGroup } from '@chakra-ui/react'

export const RatingControlled = () => {
  const [value, setValue] = useState(3)

  return (
    <RatingGroup.Root
      count={5}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
