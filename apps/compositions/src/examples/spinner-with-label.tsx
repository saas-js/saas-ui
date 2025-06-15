'use client'

import { Text, VStack } from '@chakra-ui/react'
import { Spinner } from '@saas-ui/react'

export const SpinnerWithLabel = () => {
  return (
    <VStack colorPalette="teal">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}
