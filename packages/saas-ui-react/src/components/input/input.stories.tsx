import { Group, Stack } from '@chakra-ui/react'

import { Input, InputAddon } from './index'

export default {
  title: 'Components/Input',
  component: Input,
}

export const Basic = () => {
  return <Input placeholder="Enter your email" />
}

export const Sizes = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Enter your email" size="xs" />

      <Input placeholder="Enter your email" size="sm" />

      <Input placeholder="Enter your email" size="md" />

      <Input placeholder="Enter your email" size="lg" />

      <Input placeholder="Enter your email" size="xl" />
    </Stack>
  )
}

export const Variants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Enter your email" variant="outline" />

      <Input placeholder="Enter your email" variant="subtle" />

      <Input placeholder="Enter your email" variant="flushed" />
    </Stack>
  )
}

export const WithAddon = () => (
  <Stack gap="10" maxW="320px">
    <Group attached>
      <InputAddon>+31</InputAddon>
      <Input placeholder="Phone number..." />
    </Group>

    <Group attached>
      <Input placeholder="Subdomain" />
      <InputAddon>acme.com</InputAddon>
    </Group>
  </Stack>
)
