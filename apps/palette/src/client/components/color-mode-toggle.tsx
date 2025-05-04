import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

export const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        variant="ghost"
        aria-label={theme === 'light' ? 'Enable DarkMode' : 'Enable LightMode'}
      >
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </IconButton>
    </ClientOnly>
  )
}
