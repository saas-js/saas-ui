'use client'

import { Stack } from '@chakra-ui/react'
import { PinInput } from '@saas-ui/react'

export const PinInputWithSizes = () => {
  return (
    <Stack gap="4">
      <PinInput size="sm" />
      <PinInput size="md" />
      <PinInput size="lg" />
    </Stack>
  )
}
