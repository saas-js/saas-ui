import { Separator, Stack } from '@saas-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const StackWithCustomSeparator = () => (
  <Stack separator={<Separator borderColor="red.500" />}>
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
    <DecorativeBox height="20" />
  </Stack>
)
