'use client'

import { Button, Stack, createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectWithNativeForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData.get('framework'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Select.Root collection={frameworks} size="sm" name="framework">
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
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
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
