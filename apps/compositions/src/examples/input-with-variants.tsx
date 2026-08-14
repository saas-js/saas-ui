'use client';
import { Stack, Input } from '@chakra-ui/react'

export const InputWithVariants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Subtle" variant="subtle" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Flushed" variant="flushed" />
    </Stack>
  )
}
