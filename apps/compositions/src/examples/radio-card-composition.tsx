'use client'

import { Group } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'

export const RadioCardComposition = () => {
  return (
    <RadioCard.Root defaultValue="next" gap="4" maxW="sm">
      <RadioCard.Label>How well do you know React?</RadioCard.Label>
      <Group attached orientation="vertical">
        {items.map((item) => (
          <RadioCard.Item
            width="full"
            indicatorPlacement="start"
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
          />
        ))}
      </Group>
    </RadioCard.Root>
  )
}

const items = [
  {
    value: 'advanced',
    title: 'Advanced',
    description: 'I love complex things',
  },
  {
    value: 'professional',
    title: 'Professional',
    description: 'I can hack simple things',
  },
  {
    value: 'beginner',
    title: 'Beginner',
    description: "I don't write code",
  },
]
