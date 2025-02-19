'use client'

import { For, HStack, Stack } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'

export const RadioCardWithColors = () => {
  return (
    <Stack gap="8">
      <For each={colorPalettes}>
        {(colorPalette) => (
          <RadioCard.Root
            key={colorPalette}
            colorPalette={colorPalette}
            defaultValue="next"
          >
            <RadioCard.Label>Select Framework</RadioCard.Label>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCard.Item
                  label={item.title}
                  key={item.value}
                  value={item.value}
                />
              ))}
            </HStack>
          </RadioCard.Root>
        )}
      </For>
    </Stack>
  )
}

const items = [
  { value: 'next', title: 'Next.js' },
  { value: 'vite', title: 'Vite' },
]
