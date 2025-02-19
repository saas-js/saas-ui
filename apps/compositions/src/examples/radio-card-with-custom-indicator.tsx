'use client'

import { HStack } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'
import { LuCheck } from 'react-icons/lu'

export const RadioCardWithCustomIndicator = () => {
  return (
    <RadioCard.Root defaultValue="next">
      <RadioCard.Label>Select framework</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item
            label={item.title}
            indicator={
              <RadioCard.ItemIndicator
                color="fg"
                borderWidth="0"
                checked={<LuCheck />}
              />
            }
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  { value: 'next', title: 'Next.js', description: 'Best for apps' },
  { value: 'vite', title: 'Vite', description: 'Best for SPAs' },
  { value: 'astro', title: 'Astro', description: 'Best for static sites' },
]
