'use client'

import { createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectWithMultiple = () => {
  return (
    <Select.Root multiple collection={frameworks} size="sm" width="320px">
      <Select.Label>Select framework</Select.Label>
      <Select.Trigger>
        <Select.ValueText placeholder="Movie" />
      </Select.Trigger>
      <Select.Content>
        {frameworks.items.map((movie) => (
          <Select.Item item={movie} key={movie.value}>
            {movie.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
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
