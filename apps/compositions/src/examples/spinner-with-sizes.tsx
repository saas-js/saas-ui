'use client'

import { HStack } from '@chakra-ui/react'
import { Spinner } from '@saas-ui/react'

export const SpinnerWithSizes = () => {
  return (
    <HStack gap="5">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </HStack>
  )
}
