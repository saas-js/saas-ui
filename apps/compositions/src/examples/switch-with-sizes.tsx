'use client'

import { HStack } from '@chakra-ui/react'
import { Switch } from '@saas-ui/react'

export const SwitchWithSizes = () => {
  return (
    <HStack gap="8">
      <Switch size="xs" />
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
    </HStack>
  )
}
