'use client'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { Separator } from '@saas-ui/react'

export const SeparatorWithLabel = () => {
  return (
    <Stack>
      <HStack>
        <Text flexShrink="0">Label (start)</Text>
        <Separator flex="1" />
      </HStack>

      <HStack>
        <Separator flex="1" />
        <Text flexShrink="0">Label (end)</Text>
      </HStack>

      <HStack>
        <Separator />
        <Text flexShrink="0">Label (center)</Text>
        <Separator />
      </HStack>
    </Stack>
  )
}
