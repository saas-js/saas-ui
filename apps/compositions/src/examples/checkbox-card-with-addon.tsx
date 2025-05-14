'use client'

import { Badge, HStack } from '@chakra-ui/react'
import { CheckboxCard } from '@saas-ui/react'

export const CheckboxCardWithAddon = () => {
  return (
    <CheckboxCard
      label="With Addon"
      description="Some description"
      maxW="300px"
      addon={
        <HStack>
          Some supporting text
          <Badge variant="solid">New</Badge>
        </HStack>
      }
    />
  )
}
