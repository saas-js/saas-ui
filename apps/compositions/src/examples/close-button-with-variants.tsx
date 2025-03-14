'use client'

import { HStack } from '@chakra-ui/react'
import { CloseButton } from '@saas-ui/react'

export const CloseButtonWithVariants = () => {
  return (
    <HStack>
      <CloseButton variant="ghost" colorPalette="indigo" />
      <CloseButton variant="outline" colorPalette="indigo" />
      <CloseButton variant="subtle" colorPalette="indigo" />
      <CloseButton variant="solid" colorPalette="indigo" />
      <CloseButton variant="glass" colorPalette="indigo" />
    </HStack>
  )
}
