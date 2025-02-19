'use client'

import { For, HStack, Stack } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'

export const RadioCardWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={['sm', 'md', 'lg']}>
        {(size) => (
          <RadioCard.Root key={size} size={size} defaultValue="next">
            <RadioCard.Label>size = ({size})</RadioCard.Label>
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
