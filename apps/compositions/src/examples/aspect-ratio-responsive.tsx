import { AspectRatio } from '@chakra-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const AspectRatioResponsive = () => (
  <AspectRatio maxWidth="300px" ratio={{ base: 1, md: 16 / 9 }}>
    <DecorativeBox>Box</DecorativeBox>
  </AspectRatio>
)
