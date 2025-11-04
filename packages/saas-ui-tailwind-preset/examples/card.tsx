/**
 * Card Component Example (with tailwind-variants)
 *
 * A flexible card component with header, body, and footer sections
 * using tailwind-variants for variant management.
 */

import { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  slots: {
    root: 'flex flex-col min-w-0',
    header: 'flex flex-col gap-1 pb-[var(--spacing-2)]',
    title: 'font-semibold text-fg-emphasized',
    description: 'text-sm text-fg-muted',
    body: 'flex-1 flex flex-col',
    footer: 'flex items-center gap-2 pt-[var(--spacing-2)]',
  },
  variants: {
    variant: {
      elevated: {
        root: 'bg-bg-panel border-[0.5px] border-border shadow-md',
      },
      outline: {
        root: 'bg-bg-panel border border-border',
      },
      subtle: {
        root: 'bg-bg-subtle',
      },
      solid: {
        root: 'bg-accent-solid text-accent-contrast',
        title: 'text-accent-contrast',
        description: 'text-accent-contrast opacity-80',
      },
    },
    size: {
      sm: {
        root: 'p-3 rounded-md',
      },
      md: {
        root: 'p-4 rounded-lg',
      },
      lg: {
        root: 'p-6 rounded-xl',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

export function Card({ variant, size, className, children, ...props }: CardProps) {
  const { root } = card({ variant, size })
  return (
    <div className={root({ className })} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof card>['variant']
}

export function CardHeader({ variant, className, children, ...props }: CardHeaderProps) {
  const { header } = card({ variant })
  return (
    <div className={header({ className })} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: VariantProps<typeof card>['variant']
}

export function CardTitle({
  as: Component = 'h3',
  variant,
  className,
  children,
  ...props
}: CardTitleProps) {
  const { title } = card({ variant })
  return (
    <Component className={title({ className })} {...props}>
      {children}
    </Component>
  )
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: VariantProps<typeof card>['variant']
}

export function CardDescription({ variant, className, children, ...props }: CardDescriptionProps) {
  const { description } = card({ variant })
  return (
    <p className={description({ className })} {...props}>
      {children}
    </p>
  )
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof card>['variant']
}

export function CardBody({ variant, className, children, ...props }: CardBodyProps) {
  const { body } = card({ variant })
  return (
    <div className={body({ className })} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof card>['variant']
}

export function CardFooter({ variant, className, children, ...props }: CardFooterProps) {
  const { footer } = card({ variant })
  return (
    <div className={footer({ className })} {...props}>
      {children}
    </div>
  )
}

// Usage Example:
/*
<Card variant="elevated" size="md">
  <CardHeader>
    <CardTitle>Project Dashboard</CardTitle>
    <CardDescription>View your project statistics and metrics</CardDescription>
  </CardHeader>
  <CardBody>
    <p className="text-fg">
      Your project has 42 active tasks and 12 completed tasks.
    </p>
  </CardBody>
  <CardFooter>
    <Button variant="solid">View Details</Button>
    <Button variant="ghost">Dismiss</Button>
  </CardFooter>
</Card>
*/
