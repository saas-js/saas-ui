import React from 'react'

import { HStack } from '@chakra-ui/react'

import { Button } from './button.tsx'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = {
  args: {
    children: 'Default button',
  },
}

export const Variants = {
  render: () => (
    <HStack>
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="plain">Plain</Button>
    </HStack>
  ),
}
