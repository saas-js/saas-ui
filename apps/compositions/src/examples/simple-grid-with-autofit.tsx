import { SimpleGrid } from '@saas-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const SimpleGridWithAutofit = () => (
  <SimpleGrid minChildWidth="sm" gap="40px">
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
  </SimpleGrid>
)
