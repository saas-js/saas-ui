import { Stack, createListCollection } from '@chakra-ui/react'

import { Select } from './index'

export default {
  title: 'Components/Select',
  component: Select,
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

export const Basic = (props: Partial<Select.RootProps<any>>) => {
  return (
    <Select.Root collection={frameworks} width="320px" {...props}>
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

export const Sizes = () => {
  return (
    <Stack gap="8">
      <Basic size="sm" />
      <Basic size="md" />
      <Basic size="lg" />
    </Stack>
  )
}
