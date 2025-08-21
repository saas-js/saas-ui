'use client'

import { HStack, Text } from '@saas-ui/react'
import { Separator } from '@saas-ui/react'

export const SeparatorVertical = () => {
  return (
    <HStack gap="4">
      <Text>First</Text>
      <Separator orientation="vertical" height="4" />
      <Text>Second</Text>
    </HStack>
  )
}
