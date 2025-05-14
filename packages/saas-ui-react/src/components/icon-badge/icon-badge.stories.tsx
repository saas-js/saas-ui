import { Meta, StoryObj } from '@storybook/react'
import { LuUser } from 'react-icons/lu'

import { IconBadge } from './index.ts'

export default {
  title: 'Components/IconBadge',
  component: IconBadge,
} as Meta

type Story = StoryObj<typeof IconBadge>

export const Default: Story = {
  args: {
    icon: <LuUser />,
  },
}

export const SolidVariant: Story = {
  args: {
    variant: 'solid',
    icon: <LuUser />,
  },
}

export const SubtleVariant: Story = {
  args: {
    variant: 'subtle',
    icon: <LuUser />,
  },
}

export const Rounded: Story = {
  args: {
    borderRadius: 'full',
    icon: <LuUser />,
  },
}
