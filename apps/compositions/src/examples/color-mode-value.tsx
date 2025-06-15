'use client'

import {
  Box,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@saas-ui/react'

export const ColorModeValue = () => {
  const { toggleColorMode } = useColorMode()

  const bg = useColorModeValue('red.500', 'red.200')
  const color = useColorModeValue('white', 'gray.800')

  return (
    <Stack align="flex-start" gap="4">
      <Box p="2" bg={bg} color={color}>
        This box&apos;s style will change based on the color mode.
      </Box>
      <Button variant="outline" size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </Stack>
  )
}
