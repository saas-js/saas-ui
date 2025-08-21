import { VStack } from '@saas-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const StackWithVstack = () => {
  return (
    <VStack>
      <DecorativeBox w="50%" h="20" />
      <DecorativeBox w="25%" h="20" />
      <DecorativeBox w="100%" h="20" />
    </VStack>
  )
}
