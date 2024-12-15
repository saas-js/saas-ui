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

export const Small: Story = {
  args: {
    defaultValue: 'One',
    items: ['One', 'Two', 'Three'],
    size: 'sm',
  },
}
