'use client'

import { For, HStack, Stack } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'

export const RadioCardWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={['surface', 'subtle', 'outline', 'solid']}>
        {(variant) => (
          <RadioCard.Root
            colorPalette="teal"
            key={variant}
            variant={variant}
            defaultValue="next"
          >
            <RadioCard.Label>variant = ({variant})</RadioCard.Label>
            <HStack align="stretch">
              {items.map((item) => (
                <RadioCard.Item
                  key={item.value}
                  value={item.value}
                  label={item.title}
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
