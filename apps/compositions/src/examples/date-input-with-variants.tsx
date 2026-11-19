'use client'

import { DateInput, Stack } from '@chakra-ui/react'

export const DateInputWithVariants = () => {
  return (
    <Stack gap="4" maxW="xs">
      {(['outline', 'subtle', 'flushed'] as const).map((variant) => (
        <DateInput.Root key={variant} variant={variant}>
          <DateInput.Label>variant="{variant}"</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput.Root>
      ))}
    </Stack>
  )
}
