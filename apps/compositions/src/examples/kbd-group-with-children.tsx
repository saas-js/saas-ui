'use client'

import { Kbd } from '@chakra-ui/react'
import { KbdGroup } from 'compositions/ui/kbd-group'

export const KbdGroupWithChildren = () => {
  return (
    <KbdGroup size="md" variant="subtle">
      <Kbd>ctrl</Kbd>
      <Kbd>shift</Kbd>
      <Kbd>del</Kbd>
    </KbdGroup>
  )
}
