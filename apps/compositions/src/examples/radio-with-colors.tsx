'use client'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'

export const RadioWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap="10" px="4">
          <Text minW="8ch">{colorPalette}</Text>
          <RadioGroup
            colorPalette={colorPalette}
            defaultValue="react"
            spaceX="8"
          >
            <Radio value="react">React</Radio>
            <Radio value="vue">Vue</Radio>
            <Radio value="solid">Solid</Radio>
          </RadioGroup>
        </HStack>
      ))}
    </Stack>
  )
}
