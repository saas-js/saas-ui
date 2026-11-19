'use client'

import { Stack } from '@chakra-ui/react'
import { KbdGroup } from 'compositions/ui/kbd-group'

export const KbdGroupWithSizes = () => {
  return (
    <Stack gap="3" align="flex-start">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <KbdGroup key={size} size={size}>
          ⌘+shift+P
        </KbdGroup>
      ))}
    </Stack>
  )
}
