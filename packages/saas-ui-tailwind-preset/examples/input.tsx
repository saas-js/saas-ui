/**
 * Input Component Example (with tailwind-variants)
 *
 * Form input with variants and sizes using tailwind-variants.
 */

import { InputHTMLAttributes, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: [
    'w-full',
    'outline-none',
    'transition-all duration-200',
    'text-fg',
    'placeholder:text-fg-muted',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:ring-2 focus:ring-accent-focus-ring focus:ring-offset-1',
  ],
  variants: {
    variant: {
      outline: [
        'bg-transparent',
        'border border-border',
        'focus:border-accent-fg',
      ],
      filled: [
        'bg-bg-subtle',
        'border border-transparent',
        'focus:bg-transparent focus:border-accent-fg',
      ],
      flushed: [
        'bg-transparent',
        'border-b border-border',
        'rounded-none',
        'focus:border-accent-fg',
      ],
    },
    size: {
      sm: 'h-[var(--spacing-8)] px-3 text-sm rounded-sm',
      md: 'h-[var(--spacing-10)] px-4 text-base rounded-md',
      lg: 'h-[var(--spacing-12)] px-6 text-lg rounded-lg',
    },
    invalid: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      invalid: true,
      class: 'border-red-fg focus:border-red-fg',
    },
    {
      variant: 'filled',
      invalid: true,
      class: 'border-red-fg focus:border-red-fg',
    },
    {
      variant: 'flushed',
      invalid: true,
      class: 'border-red-fg focus:border-red-fg',
    },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof input> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, invalid, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={input({ variant, size, invalid, className })}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

// Field wrapper component
const field = tv({
  slots: {
    root: 'flex flex-col gap-1.5',
    label: 'text-sm font-medium text-fg-emphasized',
    required: 'text-red-fg ml-1',
    error: 'text-sm text-red-fg',
    helperText: 'text-sm text-fg-muted',
  },
})

interface FieldProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function Field({ label, error, helperText, required, children, className }: FieldProps) {
  const { root, label: labelClass, required: requiredClass, error: errorClass, helperText: helperTextClass } = field()

  return (
    <div className={root({ className })}>
      {label && (
        <label className={labelClass()}>
          {label}
          {required && <span className={requiredClass()}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={errorClass()}>{error}</span>}
      {helperText && !error && <span className={helperTextClass()}>{helperText}</span>}
    </div>
  )
}

// Usage Example:
/*
<Field
  label="Email"
  required
  helperText="We'll never share your email"
>
  <Input
    type="email"
    placeholder="you@example.com"
  />
</Field>

<Field
  label="Username"
  error="Username is already taken"
>
  <Input
    type="text"
    invalid
    defaultValue="john_doe"
  />
</Field>
*/
