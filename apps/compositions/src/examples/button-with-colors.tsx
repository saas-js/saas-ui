'use client';
import { Stack, Text } from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'

import { colorPalettes } from '../lib/color-palettes'

export const ButtonWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack align="center" key={colorPalette} direction="row" gap="10">
          <Text minW="8ch">{colorPalette}</Text>
          <Button colorPalette={colorPalette} variant="glass">
            Glass
          </Button>
          <Button colorPalette={colorPalette} variant="solid">
            Solid
          </Button>
          <Button colorPalette={colorPalette} variant="subtle">
            Subtle
          </Button>
          <Button colorPalette={colorPalette} variant="surface">
            Button
          </Button>
          <Button colorPalette={colorPalette} variant="outline">
            Outline
          </Button>

          <Button colorPalette={colorPalette} variant="subtle">
            Button
          </Button>
        </Stack>
      ))}
    </Stack>
  )
}
