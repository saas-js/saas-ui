import { IconButton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

export const ColorModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const colorMode = resolvedTheme === 'dark' ? 'dark' : 'light'
  return (
    <IconButton
      onClick={() => setTheme(colorMode === 'light' ? 'dark' : 'light')}
      variant="ghost"
      aria-label={
        colorMode === 'light' ? 'Enable DarkMode' : 'Enable LightMode'
      }
    >
      {colorMode === 'light' ? <FiMoon /> : <FiSun />}
    </IconButton>
  )
}
