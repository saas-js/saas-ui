import React from 'react'

import { Field, Stack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Meta, type StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox.tsx'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <HStack>
      <Stack>
        <Checkbox size="sm" />
        <Checkbox size="md" />
        <Checkbox size="lg" />
      </Stack>
      <Stack>
        <Checkbox size="sm" checked />
        <Checkbox size="md" checked />
        <Checkbox size="lg" checked />
      </Stack>
    </HStack>
  ),
}

export const Variants: Story = {
  render: () => (
    <HStack>
      <Stack>
        <Checkbox variant="outline" />
        <Checkbox variant="outline" checked />
      </Stack>
      <Stack>
        <Checkbox variant="solid" />
        <Checkbox variant="solid" checked />
      </Stack>
      <Stack>
        <Checkbox variant="subtle" />
        <Checkbox variant="subtle" checked />
      </Stack>
    </HStack>
  ),
}

export const WithLabel: Story = {
  render: () => <Checkbox>Accept terms and conditions</Checkbox>,
}

export const WithLabelDisabled: Story = {
  render: () => <Checkbox disabled>Accept terms and conditions</Checkbox>,
}
