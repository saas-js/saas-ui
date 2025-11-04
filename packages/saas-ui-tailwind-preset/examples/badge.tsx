/**
 * Badge Component Example (with tailwind-variants)
 *
 * Small status indicators with multiple variants and color schemes
 * using tailwind-variants for clean variant composition.
 */

import { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-full',
    'gap-1',
    'font-medium',
    'whitespace-nowrap',
    'select-none',
  ],
  variants: {
    variant: {
      solid: '',
      subtle: '',
      outline: '',
      surface: '',
    },
    colorScheme: {
      accent: '',
      neutral: '',
      red: '',
      green: '',
      blue: '',
      orange: '',
    },
    size: {
      xs: 'text-[length:var(--font-sizes-2xs)] px-1 min-h-[var(--spacing-4)]',
      sm: 'text-[length:var(--font-sizes-xs)] px-1.5 min-h-[var(--spacing-5)]',
      md: 'text-[length:var(--font-sizes-sm)] px-2 min-h-[var(--spacing-6)]',
      lg: 'text-[length:var(--font-sizes-sm)] px-2.5 min-h-[var(--spacing-7)]',
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
    {
      variant: 'solid',
      colorScheme: 'orange',
      class: 'bg-orange-solid text-orange-contrast',
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
      class: 'bg-bg-subtle text-fg',
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
    {
      variant: 'subtle',
      colorScheme: 'orange',
      class: 'bg-orange-subtle text-orange-fg',
    },
    // Outline variants
    {
      variant: 'outline',
      colorScheme: 'accent',
      class: 'text-accent-fg shadow-[inset_0_0_0px_1px_var(--colors-accent-subtle)]',
    },
    {
      variant: 'outline',
      colorScheme: 'neutral',
      class: 'text-fg shadow-[inset_0_0_0px_1px_var(--colors-border)]',
    },
    {
      variant: 'outline',
      colorScheme: 'red',
      class: 'text-red-fg shadow-[inset_0_0_0px_1px_var(--colors-red-subtle)]',
    },
    {
      variant: 'outline',
      colorScheme: 'green',
      class: 'text-green-fg shadow-[inset_0_0_0px_1px_var(--colors-green-subtle)]',
    },
    {
      variant: 'outline',
      colorScheme: 'blue',
      class: 'text-blue-fg shadow-[inset_0_0_0px_1px_var(--colors-blue-subtle)]',
    },
    {
      variant: 'outline',
      colorScheme: 'orange',
      class: 'text-orange-fg shadow-[inset_0_0_0px_1px_var(--colors-orange-subtle)]',
    },
    // Surface variants
    {
      variant: 'surface',
      colorScheme: 'accent',
      class:
        'bg-accent-muted text-accent-fg shadow-[inset_0_0_0px_1px_var(--colors-accent-subtle)]',
    },
    {
      variant: 'surface',
      colorScheme: 'neutral',
      class:
        'bg-bg-muted text-fg shadow-[inset_0_0_0px_1px_var(--colors-border)]',
    },
    {
      variant: 'surface',
      colorScheme: 'red',
      class:
        'bg-red-muted text-red-fg shadow-[inset_0_0_0px_1px_var(--colors-red-subtle)]',
    },
    {
      variant: 'surface',
      colorScheme: 'green',
      class:
        'bg-green-muted text-green-fg shadow-[inset_0_0_0px_1px_var(--colors-green-subtle)]',
    },
    {
      variant: 'surface',
      colorScheme: 'blue',
      class:
        'bg-blue-muted text-blue-fg shadow-[inset_0_0_0px_1px_var(--colors-blue-subtle)]',
    },
    {
      variant: 'surface',
      colorScheme: 'orange',
      class:
        'bg-orange-muted text-orange-fg shadow-[inset_0_0_0px_1px_var(--colors-orange-subtle)]',
    },
  ],
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
    colorScheme: 'accent',
  },
})

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ variant, size, colorScheme, className, children, ...props }: BadgeProps) {
  return (
    <span className={badge({ variant, size, colorScheme, className })} {...props}>
      {children}
    </span>
  )
}

// Usage Examples:
/*
<Badge>Default</Badge>
<Badge variant="solid" colorScheme="green">Success</Badge>
<Badge variant="outline" colorScheme="red">Error</Badge>
<Badge variant="surface" colorScheme="blue" size="lg">Info</Badge>
<Badge variant="subtle" colorScheme="orange">Warning</Badge>
*/
