'use client'

import { createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectWithDisabledOption = () => {
  return (
    <Select.Root collection={animals} size="sm" width="320px">
      <Select.Label>Select animal</Select.Label>
      <Select.Trigger>
        <Select.ValueText placeholder="Animal" />
      </Select.Trigger>
      <Select.Content>
        {animals.items.map((animal) => (
          <Select.Item item={animal} key={animal.value}>
            {animal.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

const animals = createListCollection({
  items: [
    { label: 'Red Panda', value: 'red panda' },
    { label: 'Cat', value: 'cat', disabled: true },
    { label: 'Dog', value: 'dog' },
    { label: 'Aardvark', value: 'aardvark', disabled: true },
    { label: 'Kangaroo', value: 'kangaroo' },
    { label: 'Snake', value: 'snake' },
  ],
})
