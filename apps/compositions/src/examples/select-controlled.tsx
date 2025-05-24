'use client'

import { useState } from 'react'

import { createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectControlled = () => {
  const [value, setValue] = useState<string[]>([])
  return (
    <Select.Root
      collection={frameworks}
      width="320px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Select.Label>Select framework</Select.Label>
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
