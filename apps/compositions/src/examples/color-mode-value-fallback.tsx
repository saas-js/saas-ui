'use client';
import { ClientOnly } from '@chakra-ui/react'
import { IconButton } from 'compositions/ui/icon-button'
import { Skeleton } from 'compositions/ui/skeleton'
import { useColorMode } from 'compositions/components/setup/color-mode/color-mode'
import { LuMoon, LuSun } from 'react-icons/lu'

export const ColorModeValueFallback = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton onClick={toggleColorMode} variant="outline" size="sm">
        {colorMode === 'light' ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}
