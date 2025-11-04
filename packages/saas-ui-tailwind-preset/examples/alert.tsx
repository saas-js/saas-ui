/**
 * Alert Component Example (with tailwind-variants)
 *
 * Feedback component for displaying important messages
 * using tailwind-variants slots for compound components.
 */

import { HTMLAttributes, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const alert = tv({
  slots: {
    root: 'w-full flex items-start relative',
    icon: 'inline-flex items-center justify-center flex-shrink-0 w-[1em] h-[1em]',
    content: 'flex flex-1 flex-col gap-1',
    title: 'font-medium',
    description: 'inline',
  },
  variants: {
    status: {
      info: {},
      success: {},
      warning: {},
      error: {},
      neutral: {},
    },
    variant: {
      subtle: {},
      surface: {},
      outline: {},
      solid: {},
    },
    size: {
      sm: {
        root: 'gap-2 px-3 py-3 text-xs rounded-sm',
      },
      md: {
        root: 'gap-3 px-4 py-4 text-sm rounded-md',
      },
      lg: {
        root: 'gap-3 px-4 py-4 text-base rounded-lg',
      },
    },
  },
  compoundVariants: [
    // Info variants
    {
      status: 'info',
      variant: 'subtle',
      class: { root: 'bg-blue-subtle text-blue-fg' },
    },
    {
      status: 'info',
      variant: 'surface',
      class: {
        root: 'bg-blue-subtle text-blue-fg shadow-[inset_0_0_0px_1px_var(--colors-blue-solid)]',
      },
    },
    {
      status: 'info',
      variant: 'outline',
      class: { root: 'text-blue-fg shadow-[inset_0_0_0px_1px_var(--colors-blue-subtle)]' },
    },
    {
      status: 'info',
      variant: 'solid',
      class: { root: 'bg-blue-solid text-blue-contrast' },
    },
    // Success variants
    {
      status: 'success',
      variant: 'subtle',
      class: { root: 'bg-green-subtle text-green-fg' },
    },
    {
      status: 'success',
      variant: 'surface',
      class: {
        root: 'bg-green-subtle text-green-fg shadow-[inset_0_0_0px_1px_var(--colors-green-solid)]',
      },
    },
    {
      status: 'success',
      variant: 'outline',
      class: { root: 'text-green-fg shadow-[inset_0_0_0px_1px_var(--colors-green-subtle)]' },
    },
    {
      status: 'success',
      variant: 'solid',
      class: { root: 'bg-green-solid text-green-contrast' },
    },
    // Warning variants
    {
      status: 'warning',
      variant: 'subtle',
      class: { root: 'bg-orange-subtle text-orange-fg' },
    },
    {
      status: 'warning',
      variant: 'surface',
      class: {
        root: 'bg-orange-subtle text-orange-fg shadow-[inset_0_0_0px_1px_var(--colors-orange-solid)]',
      },
    },
    {
      status: 'warning',
      variant: 'outline',
      class: { root: 'text-orange-fg shadow-[inset_0_0_0px_1px_var(--colors-orange-subtle)]' },
    },
    {
      status: 'warning',
      variant: 'solid',
      class: { root: 'bg-orange-solid text-orange-contrast' },
    },
    // Error variants
    {
      status: 'error',
      variant: 'subtle',
      class: { root: 'bg-red-subtle text-red-fg' },
    },
    {
      status: 'error',
      variant: 'surface',
      class: {
        root: 'bg-red-subtle text-red-fg shadow-[inset_0_0_0px_1px_var(--colors-red-solid)]',
      },
    },
    {
      status: 'error',
      variant: 'outline',
      class: { root: 'text-red-fg shadow-[inset_0_0_0px_1px_var(--colors-red-subtle)]' },
    },
    {
      status: 'error',
      variant: 'solid',
      class: { root: 'bg-red-solid text-red-contrast' },
    },
    // Neutral variants
    {
      status: 'neutral',
      variant: 'subtle',
      class: { root: 'bg-bg-subtle text-fg' },
    },
    {
      status: 'neutral',
      variant: 'surface',
      class: {
        root: 'bg-bg-subtle text-fg shadow-[inset_0_0_0px_1px_var(--colors-border)]',
      },
    },
    {
      status: 'neutral',
      variant: 'outline',
      class: { root: 'text-fg shadow-[inset_0_0_0px_1px_var(--colors-border-subtle)]' },
    },
    {
      status: 'neutral',
      variant: 'solid',
      class: { root: 'bg-neutral-solid text-neutral-contrast' },
    },
  ],
  defaultVariants: {
    status: 'info',
    variant: 'subtle',
    size: 'md',
  },
})

type AlertVariantProps = VariantProps<typeof alert>

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, AlertVariantProps {}

export function Alert({ status, variant, size, className, children, ...props }: AlertProps) {
  const { root } = alert({ status, variant, size })
  return (
    <div className={root({ className })} {...props}>
      {children}
    </div>
  )
}

interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function AlertIcon({ children, className, ...props }: AlertIconProps) {
  const { icon } = alert()
  return (
    <div className={icon({ className })} {...props}>
      {children}
    </div>
  )
}

interface AlertContentProps extends HTMLAttributes<HTMLDivElement> {}

export function AlertContent({ className, children, ...props }: AlertContentProps) {
  const { content } = alert()
  return (
    <div className={content({ className })} {...props}>
      {children}
    </div>
  )
}

interface AlertTitleProps extends HTMLAttributes<HTMLDivElement> {}

export function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  const { title } = alert()
  return (
    <div className={title({ className })} {...props}>
      {children}
    </div>
  )
}

interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

export function AlertDescription({ className, children, ...props }: AlertDescriptionProps) {
  const { description } = alert()
  return (
    <div className={description({ className })} {...props}>
      {children}
    </div>
  )
}

// Usage Example:
/*
<Alert status="success" variant="subtle">
  <AlertIcon>
    <svg>...</svg>
  </AlertIcon>
  <AlertContent>
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>
      Your changes have been saved successfully.
    </AlertDescription>
  </AlertContent>
</Alert>
*/
