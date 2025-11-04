import type { Meta, StoryObj } from '@storybook/react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'inline-flex items-center justify-center',
    'appearance-none',
    'select-none',
    'relative',
    'whitespace-nowrap',
    'align-middle',
    'cursor-pointer',
    'flex-shrink-0',
    'outline-none',
    'leading-tight',
    'isolate',
    'font-medium',
    'transition-all duration-200',
    'focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  variants: {
    variant: {
      solid: [
        'shadow-sm',
        'bg-accent-solid',
        'text-accent-contrast',
        'hover:bg-accent-solid/90',
      ],
      subtle: [
        'bg-accent-muted',
        'text-accent-fg',
        'hover:bg-accent-subtle',
      ],
      glass: [
        'bg-accent-solid',
        'text-accent-contrast',
        'shadow-sm',
        'overflow-clip',
        '[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]',
        '[box-shadow:0_0_0_1px_rgba(0,0,0,0.25)_inset,0px_2px_0px_0px_rgba(255,255,255,0.2)_inset,0_1px_2px_0_rgba(0,0,0,0.05)]',
        'dark:[box-shadow:0px_1px_0px_0px_rgba(255,255,255,0.2)_inset,0_1px_2px_0_rgba(0,0,0,0.05)]',
        'before:content-[""]',
        'before:absolute',
        'before:inset-0',
        'before:[background:linear-gradient(180deg,white_40%,rgba(0,0,0,0.2))]',
        'before:opacity-20',
        'before:transition-all',
        'before:duration-200',
        'before:pointer-events-none',
        'hover:before:[background:linear-gradient(180deg,rgba(255,255,255,0.8)_40%,rgba(0,0,0,0.6))]',
      ],
      surface: [
        'bg-accent-muted/20',
        'border border-accent-emphasized/90',
        'text-accent-fg',
        'shadow-xs',
        'hover:bg-accent-muted hover:border-accent-emphasized',
      ],
      outline: [
        'border-[0.5px] border-accent-emphasized',
        'text-accent-fg',
        'hover:bg-accent-muted',
      ],
      ghost: [
        'text-accent-fg',
        'hover:bg-accent-subtle',
      ],
      plain: [
        'text-accent-fg',
        'px-0',
      ],
    },
    size: {
      xs: 'gap-1 h-6 min-w-6 text-xs rounded-control-sm px-2',
      sm: 'gap-2 h-7 min-w-7 text-sm rounded-control-md px-2.5',
      md: 'gap-2 h-8 min-w-8 text-sm rounded-control-md px-3',
      lg: 'gap-3 h-10 min-w-10 text-base rounded-control-lg px-4.5',
      xl: 'gap-3 h-12 min-w-12 text-lg rounded-control-lg px-6',
    },
  },
  defaultVariants: {
    variant: 'surface',
    size: 'md',
  },
})

type ButtonProps = VariantProps<typeof button> & {
  children: React.ReactNode
  onClick?: () => void
}

function Button({ variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={button({ variant, size })} {...props}>
      {children}
    </button>
  )
}

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'glass', 'surface', 'outline', 'ghost', 'plain'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Button variant="surface">Surface</Button>
        <Button variant="solid">Solid</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="glass">Glass</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="plain">Plain</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    </div>
  ),
}
