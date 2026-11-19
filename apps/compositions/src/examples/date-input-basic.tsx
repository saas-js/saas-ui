'use client'

import { DateInput } from '@chakra-ui/react'

export const DateInputBasic = () => {
  return (
    <DateInput.Root maxW="xs">
      <DateInput.Label>Start date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
