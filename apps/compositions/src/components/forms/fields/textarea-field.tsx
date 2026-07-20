'use client'

import * as React from 'react'

import { Textarea } from '@chakra-ui/react'

import { useFieldContext } from '../form-context'
import { getErrorText } from '../utils'
import { FieldRoot } from './field-root'
import type { BaseFieldProps } from './types'

export interface TextareaFieldProps
  extends
    BaseFieldProps,
    Omit<
      React.ComponentProps<typeof Textarea>,
      'value' | 'onChange' | 'onBlur' | 'form'
    > {
  /** Called in addition to the field's own change handler. */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField(props, ref) {
  const { label, help, orientation, required, rootProps, onChange, ...rest } =
    props

  const field = useFieldContext<string>()
  const errorText = getErrorText(field.state.meta.errors)
  const invalid = field.state.meta.isTouched && !!errorText

  return (
    <FieldRoot
      label={label}
      help={help}
      orientation={orientation}
      required={required}
      rootProps={rootProps}
      invalid={invalid}
      errorText={errorText}
    >
      <Textarea
        ref={ref}
        id={field.name}
        name={field.name}
        value={field.state.value ?? ''}
        onChange={(e) => {
          field.handleChange(e.currentTarget.value)
          onChange?.(e)
        }}
        onBlur={field.handleBlur}
        {...rest}
      />
    </FieldRoot>
  )
})
