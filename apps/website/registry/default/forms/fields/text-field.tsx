'use client'

import * as React from 'react'

import { InputGroup } from '#registry/default/ui/input-group/index.ts'
import { Input } from '#registry/default/ui/input/index.ts'
import { PasswordInput } from '#registry/default/ui/password-input/index.ts'

import { useFieldContext } from '../form-context'
import { getErrorText } from '../utils'
import { FieldRoot } from './field-root'
import type { BaseFieldProps } from './types'

export interface TextFieldProps
  extends
    BaseFieldProps,
    Omit<
      React.ComponentProps<typeof Input>,
      'value' | 'onChange' | 'onBlur' | 'type' | 'form'
    > {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  /** Called in addition to the field's own change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Text input field, covering text/email/password/tel/url. `type="password"`
 * uses `PasswordInput` (with the show/hide toggle). `startElement`/`endElement`
 * wrap the control in an `InputGroup`.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      label,
      help,
      orientation,
      required,
      rootProps,
      type = 'text',
      startElement,
      endElement,
      onChange,
      ...inputProps
    } = props

    const field = useFieldContext<string>()
    const errorText = getErrorText(field.state.meta.errors)
    const invalid = field.state.meta.isTouched && !!errorText

    const commonProps = {
      ref,
      id: field.name,
      name: field.name,
      value: field.state.value ?? '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        field.handleChange(e.currentTarget.value)
        onChange?.(e)
      },
      onBlur: field.handleBlur,
      ...inputProps,
    }

    const control =
      type === 'password' ? (
        <PasswordInput {...commonProps} />
      ) : (
        <Input type={type} {...commonProps} />
      )

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
        {startElement || endElement ? (
          <InputGroup startElement={startElement} endElement={endElement}>
            {control}
          </InputGroup>
        ) : (
          control
        )}
      </FieldRoot>
    )
  },
)
