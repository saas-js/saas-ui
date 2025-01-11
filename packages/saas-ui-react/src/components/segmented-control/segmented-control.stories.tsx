import React from 'react'

import { Stack } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { SegmentedControl } from './index.ts'

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
} satisfies Meta

type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  args: {
    defaultValue: 'One',
    items: ['One', 'Two', 'Three'],
  },
}

export const Sizes = () => {
  return (
    <Stack alignItems="flex-start">
      <SegmentedControl
        defaultValue="One"
        items={['One', 'Two', 'Three']}
        size="xs"
      />
      <SegmentedControl
        defaultValue="One"
        items={['One', 'Two', 'Three']}
        size="sm"
      />
      <SegmentedControl
        defaultValue="One"
        items={['One', 'Two', 'Three']}
        size="md"
      />
      <SegmentedControl
        defaultValue="One"
        items={['One', 'Two', 'Three']}
        size="lg"
      />
    </Stack>
  )
}
