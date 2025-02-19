'use client'

import { HStack } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'

export const RadioCardBasic = () => {
  return (
    <RadioCard.Root defaultValue="next">
      <RadioCard.Label>Select framework</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item
            label={item.title}
            description={item.description}
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
