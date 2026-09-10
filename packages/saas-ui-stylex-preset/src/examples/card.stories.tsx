import type { Meta, StoryObj } from '@storybook/react-vite'

import { CardExample } from './card.tsx'

const meta = {
  title: 'Examples/Card',
  component: CardExample,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'subtle', 'solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    colorPalette: {
      control: 'select',
      options: ['gray', 'blue', 'red', 'green'],
    },
  },
} satisfies Meta<typeof CardExample>

export default meta
type Story = StoryObj<typeof meta>

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    size: 'md',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    colorPalette: 'blue',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '24rem',
      }}
    >
      <CardExample variant="elevated" size="md" />
      <CardExample variant="outline" size="md" />
      <CardExample variant="subtle" size="md" />
      <CardExample variant="solid" size="md" colorPalette="blue" />
    </div>
  ),
}
