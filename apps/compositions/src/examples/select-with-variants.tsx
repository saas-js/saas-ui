'use client'

import { For, Stack, createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectWithVariants = () => {
  return (
    <Stack gap="5" width="320px">
      <For each={['outline', 'subtle']}>
        {(variant) => (
          <Select.Root key={variant} variant={variant} collection={frameworks}>
            <Select.Label>Select framework - {variant}</Select.Label>
            <Select.Trigger>
              <Select.ValueText placeholder="Select movie" />
            </Select.Trigger>
            <Select.Content>
              {frameworks.items.map((movie) => (
                <Select.Item item={movie} key={movie.value}>
                  {movie.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
      </For>
    </Stack>
  )
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})
