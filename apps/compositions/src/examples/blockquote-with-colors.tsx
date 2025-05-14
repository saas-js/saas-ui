'use client'

import { Stack, Text } from '@chakra-ui/react'
import { Blockquote } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'

export const BlockquoteWithColors = () => {
  return (
    <Stack gap="5" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
          width="full"
        >
          <Text minW="8ch">{colorPalette}</Text>
          <Blockquote
            showDash
            colorPalette={colorPalette}
            cite="Uzumaki Naruto"
          >
            If anyone thinks he is something when he is nothing, he deceives
            himself. Each one should test his own actions. Then he can take
            pride in himself, without comparing himself to anyone else.
          </Blockquote>
        </Stack>
      ))}
    </Stack>
  )
}
