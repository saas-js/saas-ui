'use client';
import { Button } from '@chakra-ui/react'
import { useColorMode } from 'compositions/components/setup/color-mode/color-mode'

export const ColorModeBasic = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  )
}
