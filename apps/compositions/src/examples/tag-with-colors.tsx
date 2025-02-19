'use client'

import { Stack, Text } from '@chakra-ui/react'
import { Tag } from '@saas-ui/react'
import { HiPlus } from 'react-icons/hi'

import { colorPalettes } from '../lib/color-palettes'

export const TagWithColors = () => {
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
          <Tag size="sm" colorPalette={colorPalette}>
            Content
          </Tag>
          <Tag startElement={<HiPlus />} size="sm" colorPalette={colorPalette}>
            Content
          </Tag>
          <Tag size="sm" colorPalette={colorPalette} variant="solid" closable>
            Content
          </Tag>
        </Stack>
      ))}
    </Stack>
  )
}
