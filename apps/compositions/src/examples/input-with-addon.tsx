'use client'

import { Group, Stack } from '@chakra-ui/react'
import { Input, InputAddon } from '@saas-ui/react'

export const InputWithAddon = () => (
  <Stack gap="10">
    <Group attached>
      <InputAddon>https://</InputAddon>
      <Input placeholder="Phone number..." />
    </Group>

    <Group attached>
      <Input placeholder="Placeholder" />
      <InputAddon>.com</InputAddon>
    </Group>
  </Stack>
)
