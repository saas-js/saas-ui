import { IconButton } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      variant="ghost"
      aria-label="theme toggle"
      icon={colorMode === 'light' ? <FiMoon size="18" /> : <FiSun size="18" />}
      borderRadius="6"
      onClick={toggleColorMode}
    />
  )
}

export default ThemeToggle
