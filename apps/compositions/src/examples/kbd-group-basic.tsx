'use client'

import { Stack } from '@chakra-ui/react'
import { KbdGroup } from 'compositions/ui/kbd-group'

export const KbdGroupBasic = () => {
  return (
    <Stack gap="3" align="flex-start">
      <KbdGroup>⌘+K</KbdGroup>
      <KbdGroup>shift+X</KbdGroup>
      <KbdGroup>G then I</KbdGroup>
      <KbdGroup>alt or option</KbdGroup>
    </Stack>
  )
}
