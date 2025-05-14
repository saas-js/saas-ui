'use client'

import { Stack } from '@chakra-ui/react'
import { Separator } from '@saas-ui/react'

export const SeparatorWithSizes = () => {
  return (
    <Stack gap="4">
      <Separator size="xs" />
      <Separator size="sm" />
      <Separator size="md" />
      <Separator size="lg" />
    </Stack>
  )
}
