'use client'

import { Stack, Text } from '@chakra-ui/react'
import { Switch } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'

export const SwitchWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <Switch colorPalette={colorPalette} />
          <Switch colorPalette={colorPalette} defaultChecked />
        </Stack>
      ))}
    </Stack>
  )
}
