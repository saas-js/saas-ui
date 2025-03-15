import { IconButton, useColorMode } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      variant="ghost"
      aria-label="theme toggle"
      icon={colorMode === 'light' ? <FiMoon size="14" /> : <FiSun size="14" />}
      borderRadius="md"
      onClick={toggleColorMode}
    />
  )
}

export default ThemeToggle
