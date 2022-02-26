import { useColorMode, IconButton } from '@chakra-ui/react'

import { FiSun, FiMoon } from 'react-icons/fi'

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label={
        colorMode === 'light' ? 'Enable DarkMode' : 'Enable LightMode'
      }
      icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
    />
  )
}
