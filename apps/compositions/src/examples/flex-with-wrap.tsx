import { Flex } from '@chakra-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const FlexWithWrap = () => {
  return (
    <Flex gap="4" wrap="wrap" maxW="500px">
      <DecorativeBox height="10" width="200px" />
      <DecorativeBox height="10" width="200px" />
      <DecorativeBox height="10" width="200px" />
    </Flex>
  )
}
