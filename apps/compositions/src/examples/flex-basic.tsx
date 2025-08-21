import { Flex } from '@saas-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const FlexBasic = () => {
  return (
    <Flex gap="4">
      <DecorativeBox height="10" />
      <DecorativeBox height="10" />
      <DecorativeBox height="10" />
    </Flex>
  )
}
