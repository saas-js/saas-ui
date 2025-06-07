'use client'

import {
  Button,
  DarkMode,
  HStack,
  LightMode,
  useColorMode,
} from '@saas-ui/react'

export const ColorModeForced = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <HStack>
      <LightMode>
        <Button size="sm" variant="subtle">
          Light Mode Always
        </Button>
      </LightMode>

      <DarkMode>
        <Button size="sm" variant="subtle">
          Dark Mode Always
        </Button>
      </DarkMode>

      <Button size="sm" variant="subtle" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </HStack>
  )
}
