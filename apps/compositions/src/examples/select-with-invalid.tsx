'use client'

import { createListCollection } from '@chakra-ui/react'
import { Field, Select } from '@saas-ui/react'

export const SelectWithInvalid = () => {
  return (
    <Field.Root invalid>
      <Select.Root collection={frameworks} size="sm" width="320px">
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
      <Field.ErrorText>This is an error</Field.ErrorText>
    </Field.Root>
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
