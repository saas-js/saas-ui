import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button.tsx'

const meta = {
  title: 'Examples/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid',
        'subtle',
        'surface',
        'outline',
        'ghost',
        'plain',
        'glass',
      ],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    colorPalette: {
      control: 'select',
      options: ['gray', 'blue', 'red', 'green'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Surface: Story = {
  args: {
    variant: 'surface',
    size: 'md',
    children: 'Button',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    colorPalette: 'blue',
    children: 'Button',
  },
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    size: 'md',
    children: 'Button',
  },
}

export const Glass: Story = {
  args: {
    variant: 'glass',
    size: 'md',
    colorPalette: 'blue',
    children: 'Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    children: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Button',
  },
}

export const Plain: Story = {
  args: {
    variant: 'plain',
    size: 'md',
    children: 'Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button variant="surface">Surface</Button>
        <Button variant="solid" colorPalette="blue">
          Solid
        </Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="glass" colorPalette="blue">
          Glass
        </Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="plain">Plain</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <Button size="2xs">2XS</Button>
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button variant="solid" colorPalette="gray">
          Gray
        </Button>
        <Button variant="solid" colorPalette="blue">
          Blue
        </Button>
        <Button variant="solid" colorPalette="red">
          Red
        </Button>
        <Button variant="solid" colorPalette="green">
          Green
        </Button>
      </div>
    </div>
  ),
}
