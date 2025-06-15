'use client'

import { For, Stack, Text } from '@chakra-ui/react'
import { Checkbox } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'

export const CheckboxWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          width="full"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <For each={['outline', 'subtle', 'solid']}>
            {(variant) => (
              <Stack key={variant} mb="4">
                <Checkbox variant={variant} colorPalette={colorPalette}>
                  Checkbox
                </Checkbox>
                <Checkbox
                  defaultChecked
                  variant={variant}
                  colorPalette={colorPalette}
                >
                  Checkbox
                </Checkbox>
              </Stack>
            )}
          </For>
        </Stack>
      ))}
    </Stack>
  )
}
