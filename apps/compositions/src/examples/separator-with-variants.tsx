'use client'

import { Stack } from '@chakra-ui/react'
import { Separator } from '@saas-ui/react'

export const SeparatorWithVariants = () => {
  return (
    <Stack>
      <Separator variant="solid" />
      <Separator variant="dashed" />
      <Separator variant="dotted" />
    </Stack>
  )
}
