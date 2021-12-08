import { useColorMode, Button } from '@chakra-ui/react'

import { FiSun, FiMoon } from 'react-icons/fi'

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <FiMoon /> : <FiSun />}
    </Button>
  )
}
