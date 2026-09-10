'use client'

import * as React from 'react'

import { Field } from '@chakra-ui/react'

import type { BaseFieldProps } from './types'

export interface FieldRootProps extends BaseFieldProps {
  invalid: boolean
  errorText?: string
  children: React.ReactNode
}

/**
 * Shared shell for every field component: renders the Chakra `Field.Root`
 * with label, the control (`children`), and helper/error text.
 */
export function FieldRoot(props: FieldRootProps) {
  const {
    label,
    help,
    orientation,
    required,
    rootProps,
    invalid,
    errorText,
    children,
  } = props

  return (
    <Field.Root
      orientation={orientation}
      required={required}
      invalid={invalid}
      {...rootProps}
    >
      {label && <Field.Label>{label}</Field.Label>}
      {children}
      {help && !invalid && <Field.HelperText>{help}</Field.HelperText>}
      {invalid && errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  )
}
