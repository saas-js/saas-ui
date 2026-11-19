'use client'

import { DateInput, Stack } from '@chakra-ui/react'

export const DateInputWithSizes = () => {
  return (
    <Stack gap="4" maxW="xs">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <DateInput.Root key={size} size={size}>
          <DateInput.Label>size="{size}"</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput.Root>
      ))}
    </Stack>
  )
}
