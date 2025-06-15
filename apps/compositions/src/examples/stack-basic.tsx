import { Stack } from '@chakra-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const StackBasic = () => {
  return (
    <Stack>
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Stack>
  )
}
