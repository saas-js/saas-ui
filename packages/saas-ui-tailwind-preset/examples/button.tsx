/**
 * Button Component Example (with tailwind-variants)
 *
 * Demonstrates how to create a button component with variants
 * using tailwind-variants for cleaner, more maintainable code.
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none focus:ring-2 focus:ring-accent-focus-ring focus:ring-offset-2',
  ],
  variants: {
    variant: {
      solid: '',
      outline: '',
      ghost: '',
      subtle: '',
    },
    colorScheme: {
      accent: '',
      neutral: '',
      red: '',
      green: '',
      blue: '',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm rounded-sm',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: 'solid',
      colorScheme: 'accent',
      class: 'bg-accent-solid text-accent-contrast hover:opacity-90',
    },
    {
      variant: 'solid',
      colorScheme: 'neutral',
      class: 'bg-neutral-solid text-neutral-contrast hover:opacity-90',
    },
    {
      variant: 'solid',
      colorScheme: 'red',
      class: 'bg-red-solid text-red-contrast hover:opacity-90',
    },
    {
      variant: 'solid',
      colorScheme: 'green',
      class: 'bg-green-solid text-green-contrast hover:opacity-90',
    },
    {
      variant: 'solid',
      colorScheme: 'blue',
      class: 'bg-blue-solid text-blue-contrast hover:opacity-90',
    },
    // Outline variants
    {
      variant: 'outline',
      colorScheme: 'accent',
      class: 'border border-accent-fg text-accent-fg hover:bg-accent-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'neutral',
      class: 'border border-border text-fg hover:bg-bg-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'red',
      class: 'border border-red-fg text-red-fg hover:bg-red-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'green',
      class: 'border border-green-fg text-green-fg hover:bg-green-subtle',
    },
    {
      variant: 'outline',
      colorScheme: 'blue',
      class: 'border border-blue-fg text-blue-fg hover:bg-blue-subtle',
    },
    // Ghost variants
    {
      variant: 'ghost',
      colorScheme: 'accent',
      class: 'text-accent-fg hover:bg-accent-subtle',
    },
    {
      variant: 'ghost',
      colorScheme: 'neutral',
      class: 'text-fg hover:bg-bg-subtle',
    },
    {
      variant: 'ghost',
      colorScheme: 'red',
      class: 'text-red-fg hover:bg-red-subtle',
    },
    {
      variant: 'ghost',
      colorScheme: 'green',
      class: 'text-green-fg hover:bg-green-subtle',
    },
    {
      variant: 'ghost',
      colorScheme: 'blue',
      class: 'text-blue-fg hover:bg-blue-subtle',
    },
    // Subtle variants
    {
      variant: 'subtle',
      colorScheme: 'accent',
      class: 'bg-accent-subtle text-accent-fg hover:bg-accent-muted',
    },
    {
      variant: 'subtle',
      colorScheme: 'neutral',
      class: 'bg-bg-subtle text-fg hover:bg-bg-emphasized',
    },
    {
      variant: 'subtle',
      colorScheme: 'red',
      class: 'bg-red-subtle text-red-fg hover:bg-red-muted',
    },
    {
      variant: 'subtle',
      colorScheme: 'green',
      class: 'bg-green-subtle text-green-fg hover:bg-green-muted',
    },
    {
      variant: 'subtle',
      colorScheme: 'blue',
      class: 'bg-blue-subtle text-blue-fg hover:bg-blue-muted',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    colorScheme: 'accent',
  },
})

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, colorScheme, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={button({ variant, size, colorScheme, className })}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

// Usage Examples:
// <Button>Click me</Button>
// <Button variant="outline" colorScheme="blue">Outline</Button>
// <Button variant="ghost" size="sm">Small Ghost</Button>
// <Button variant="subtle" colorScheme="green">Subtle Green</Button>
