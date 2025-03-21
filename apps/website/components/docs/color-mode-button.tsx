'use client'

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { LuMoon, LuSun } from 'react-icons/lu'

export const ColorModeButton = () => {
  const { theme, setTheme } = useTheme()
  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={handleClick}
        variant="ghost"
        size="sm"
        color="inherit"
      >
        {theme === 'light' ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}
