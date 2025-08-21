import { HStack } from '@saas-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const BoxWithHideBelow = () => (
  <HStack>
    <DecorativeBox bg="green.300" hideBelow="md" height="40px" flex="1" />
    <DecorativeBox height="40px" flex="1" />
  </HStack>
)
