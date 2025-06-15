'use client'

import { For, Stack, createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectWithSizes = () => {
  return (
    <Stack gap="5" width="320px">
      <For each={['xs', 'sm', 'md', 'lg']}>
        {(size) => (
          <Select.Root key={size} size={size} collection={frameworks}>
            <Select.Label>size = {size}</Select.Label>
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
