import { Group, InputAddon, Stack } from '@chakra-ui/react'

import { NumberInput } from './index.ts'

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
}

export const Basic = () => {
  return <NumberInput />
}

export const Sizes = () => {
  return (
    <Stack gap="4">
      <NumberInput size="xs" />
      <NumberInput size="sm" />
      <NumberInput size="md" />
      <NumberInput size="lg" />
    </Stack>
  )
}

export const Variants = () => {
  return (
    <Stack gap="4">
      <NumberInput variant="outline" />
      <NumberInput variant="flushed" />
      <NumberInput variant="subtle" />
    </Stack>
  )
}

export const WithAddon = () => {
  return (
    <Stack gap="4" maxW="md">
      <Group attached>
        <InputAddon>€</InputAddon>
        <NumberInput />
      </Group>

      <Group attached>
        <NumberInput />
        <InputAddon>per year</InputAddon>
      </Group>
    </Stack>
  )
}
