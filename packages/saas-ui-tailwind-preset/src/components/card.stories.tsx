import type { Meta, StoryObj } from '@storybook/react'
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  slots: {
    root: ['flex flex-col', 'min-w-0', 'overflow-hidden'],
    header: 'flex flex-col gap-1',
    title: 'font-semibold text-fg-emphasized',
    description: 'text-sm text-fg-muted',
    body: '',
    footer: 'flex items-center gap-2',
  },
  variants: {
    variant: {
      elevated: {
        root: 'bg-bg-panel shadow-md rounded-lg',
        header: 'p-6 pb-0',
        body: 'p-6',
        footer: 'p-6 pt-0',
      },
      outline: {
        root: 'bg-bg-panel border border-border-subtle rounded-lg',
        header: 'p-6 pb-0',
        body: 'p-6',
        footer: 'p-6 pt-0',
      },
      subtle: {
        root: 'bg-bg-subtle rounded-lg',
        header: 'p-6 pb-0',
        body: 'p-6',
        footer: 'p-6 pt-0',
      },
    },
    size: {
      sm: {
        header: 'p-4 pb-0',
        body: 'p-4',
        footer: 'p-4 pt-0',
        title: 'text-sm',
        description: 'text-xs',
      },
      md: {
        header: 'p-6 pb-0',
        body: 'p-6',
        footer: 'p-6 pt-0',
        title: 'text-base',
        description: 'text-sm',
      },
      lg: {
        header: 'p-8 pb-0',
        body: 'p-8',
        footer: 'p-8 pt-0',
        title: 'text-lg',
        description: 'text-base',
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
    size: 'md',
  },
})

type CardVariantProps = VariantProps<typeof card>

function Card({
  variant,
  size,
  children,
}: CardVariantProps & { children: React.ReactNode }) {
  const { root } = card({ variant, size })
  return <div className={root()}>{children}</div>
}

function CardHeader({
  variant,
  size,
  children,
}: CardVariantProps & { children: React.ReactNode }) {
  const { header } = card({ variant, size })
  return <div className={header()}>{children}</div>
}

function CardTitle({
  variant,
  size,
  children,
}: CardVariantProps & { children: React.ReactNode }) {
  const { title } = card({ variant, size })
  return <h3 className={title()}>{children}</h3>
}

function CardDescription({
  variant,
  size,
  children,
}: CardVariantProps & { children: React.ReactNode }) {
  const { description } = card({ variant, size })
  return <p className={description()}>{children}</p>
}

function CardBody({
  variant,
  size,
  children,
}: CardVariantProps & { children: React.ReactNode }) {
  const { body } = card({ variant, size })
  return <div className={body()}>{children}</div>
}

function CardFooter({
  variant,
  size,
  children,
}: CardVariantProps & { children: React.ReactNode }) {
  const { footer } = card({ variant, size })
  return <div className={footer()}>{children}</div>
}

const CardExample = ({ variant, size }: CardVariantProps) => (
  <Card variant={variant} size={size}>
    <CardHeader variant={variant} size={size}>
      <CardTitle variant={variant} size={size}>
        Card Title
      </CardTitle>
      <CardDescription variant={variant} size={size}>
        Card description goes here
      </CardDescription>
    </CardHeader>
    <CardBody variant={variant} size={size}>
      <p className="text-fg">This is the card body content.</p>
    </CardBody>
    <CardFooter variant={variant} size={size}>
      <button className="text-sm text-accent-fg-emphasized hover:underline">
        Action
      </button>
    </CardFooter>
  </Card>
)

const meta = {
  title: 'Components/Card',
  component: CardExample,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof CardExample>

export default meta
type Story = StoryObj<typeof meta>

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    size: 'md',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <CardExample variant="elevated" size="md" />
      <CardExample variant="outline" size="md" />
      <CardExample variant="subtle" size="md" />
    </div>
  ),
}
