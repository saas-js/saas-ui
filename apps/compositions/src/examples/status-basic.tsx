'use client'

import { HStack } from '@chakra-ui/react'
import { Status } from '@saas-ui/react'

export const StatusBasic = () => {
  return (
    <HStack gap="6">
      <Status value="error" />
      <Status value="info" />
      <Status value="warning" />
      <Status value="success" />
    </HStack>
  )
}
