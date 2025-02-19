'use client'

import { Stack } from '@chakra-ui/react'
import { Input } from '@saas-ui/react'

export const InputWithVariants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Subtle" variant="subtle" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Flushed" variant="flushed" />
    </Stack>
  )
}
