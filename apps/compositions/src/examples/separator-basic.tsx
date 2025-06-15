'use client'

import { Stack, Text } from '@chakra-ui/react'
import { Separator } from '@saas-ui/react'

export const SeparatorBasic = () => {
  return (
    <Stack>
      <Text>First</Text>
      <Separator />
      <Text>Second</Text>
      <Separator />
      <Text>Third</Text>
    </Stack>
  )
}
