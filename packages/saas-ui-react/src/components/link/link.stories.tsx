import { Meta, StoryObj } from '@storybook/react'

import { Link } from './'

export default {
  title: 'Components/Link',
  component: Link,
} as Meta

type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
}
