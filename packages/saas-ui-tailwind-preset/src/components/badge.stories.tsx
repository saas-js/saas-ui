import type { Meta, StoryObj } from '@storybook/react'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: [
    'inline-flex items-center',
    'rounded-full',
    'gap-1',
    'font-medium',
    'tabular-nums',
    'whitespace-nowrap',
    'select-none',
  ],
  variants: {
    variant: {
      solid: '',
      subtle: '',
      outline: '[box-shadow:inset_0_0_0_1px_var(--tw-shadow-color)]',
      surface: '[box-shadow:inset_0_0_0_1px_var(--tw-shadow-color)]',
      plain: '',
    },
    colorScheme: {
      accent: '',
      neutral: '',
      red: '',
      green: '',
      blue: '',
    },
    size: {
      xs: 'text-2xs px-1 min-h-4',
      sm: 'text-xs px-1.5 min-h-5',
      md: 'text-sm px-2 min-h-6',
      lg: 'text-sm px-2.5 min-h-7',
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: 'solid',
      colorScheme: 'accent',
      class: 'bg-accent-solid text-accent-contrast',
    },
    {
      variant: 'solid',
      colorScheme: 'neutral',
      class: 'bg-neutral-solid text-neutral-contrast',
    },
    {
      variant: 'solid',
      colorScheme: 'red',
      class: 'bg-red-solid text-red-contrast',
    },
    {
      variant: 'solid',
      colorScheme: 'green',
      class: 'bg-green-solid text-green-contrast',
    },
    {
      variant: 'solid',
      colorScheme: 'blue',
      class: 'bg-blue-solid text-blue-contrast',
    },
    // Subtle variants
    {
      variant: 'subtle',
      colorScheme: 'accent',
      class: 'bg-accent-subtle text-accent-fg',
    },
    {
      variant: 'subtle',
      colorScheme: 'neutral',
      class: 'bg-neutral-subtle text-neutral-fg',
    },
    {
      variant: 'subtle',
      colorScheme: 'red',
      class: 'bg-red-subtle text-red-fg',
    },
    {
      variant: 'subtle',
      colorScheme: 'green',
      class: 'bg-green-subtle text-green-fg',
    },
    {
      variant: 'subtle',
      colorScheme: 'blue',
      class: 'bg-blue-subtle text-blue-fg',
    },
    // Outline variants
    {
      variant: 'outline',
      colorScheme: 'accent',
      class: 'text-accent-fg shadow-accent-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'neutral',
      class: 'text-neutral-fg shadow-neutral-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'red',
      class: 'text-red-fg shadow-red-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'green',
      class: 'text-green-fg shadow-green-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'blue',
      class: 'text-blue-fg shadow-blue-subtle',
    },
    // Surface variants
    {
      variant: 'surface',
      colorScheme: 'accent',
      class: 'bg-accent-muted/20 text-accent-fg shadow-accent-subtle',
    },
    {
      variant: 'surface',
      colorScheme: 'neutral',
      class: 'bg-neutral-muted/20 text-neutral-fg shadow-neutral-subtle',
    },
    {
      variant: 'surface',
      colorScheme: 'red',
      class: 'bg-red-muted/20 text-red-fg shadow-red-subtle',
    },
    {
      variant: 'surface',
      colorScheme: 'green',
      class: 'bg-green-muted/20 text-green-fg shadow-green-subtle',
    },
    {
      variant: 'surface',
      colorScheme: 'blue',
      class: 'bg-blue-muted/20 text-blue-fg shadow-blue-subtle',
    },
    // Plain variants
    {
      variant: 'plain',
      colorScheme: 'accent',
      class: 'text-accent-fg',
    },
    {
      variant: 'plain',
      colorScheme: 'neutral',
      class: 'text-neutral-fg',
    },
    {
      variant: 'plain',
      colorScheme: 'red',
      class: 'text-red-fg',
    },
    {
      variant: 'plain',
      colorScheme: 'green',
      class: 'text-green-fg',
    },
    {
      variant: 'plain',
      colorScheme: 'blue',
      class: 'text-blue-fg',
    },
  ],
  defaultVariants: {
    variant: 'subtle',
    colorScheme: 'accent',
    size: 'sm',
  },
})

type BadgeProps = VariantProps<typeof badge> & {
  children: React.ReactNode
}

function Badge({ variant, colorScheme, size, children }: BadgeProps) {
  return <span className={badge({ variant, colorScheme, size })}>{children}</span>
}

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline', 'surface', 'plain'],
    },
    colorScheme: {
      control: 'select',
      options: ['accent', 'neutral', 'red', 'green', 'blue'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    colorScheme: 'accent',
    size: 'sm',
    children: 'Badge',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'accent',
    size: 'sm',
    children: 'Badge',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    colorScheme: 'accent',
    size: 'sm',
    children: 'Badge',
  },
}

export const Surface: Story = {
  args: {
    variant: 'surface',
    colorScheme: 'accent',
    size: 'sm',
    children: 'Badge',
  },
}

export const Plain: Story = {
  args: {
    variant: 'plain',
    colorScheme: 'accent',
    size: 'sm',
    children: 'Badge',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge variant="solid">Solid</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="surface">Surface</Badge>
        <Badge variant="plain">Plain</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge colorScheme="accent">Accent</Badge>
        <Badge colorScheme="neutral">Neutral</Badge>
        <Badge colorScheme="red">Red</Badge>
        <Badge colorScheme="green">Green</Badge>
        <Badge colorScheme="blue">Blue</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <Badge size="xs">Extra Small</Badge>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
  ),
}
