'use client'

import { CheckboxGroup, Flex, Text } from '@chakra-ui/react'
import { CheckboxCard } from '@saas-ui/react'

export const CheckboxCardWithGroup = () => {
  return (
    <CheckboxGroup defaultValue={['next']}>
      <Text textStyle="sm" fontWeight="medium">
        Select framework(s)
      </Text>
      <Flex gap="2">
        {items.map((item) => (
          <CheckboxCard
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
          />
        ))}
      </Flex>
    </CheckboxGroup>
  )
}

const items = [
  { value: 'next', title: 'Next.js', description: 'Best for apps' },
  { value: 'vite', title: 'Vite', description: 'Best for SPAs' },
  { value: 'astro', title: 'Astro', description: 'Best for static sites' },
]
