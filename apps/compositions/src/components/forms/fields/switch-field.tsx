'use client'

import * as React from 'react'

import { Field } from '@chakra-ui/react'

import { Switch } from 'compositions/ui/switch/index'

import { useFieldContext } from '../form-context'
import { getErrorText } from '../utils'
import type { BaseFieldProps } from './types'

export interface SwitchFieldProps
  extends
    BaseFieldProps,
    Omit<
      React.ComponentProps<typeof Switch>,
      'checked' | 'onCheckedChange' | 'onBlur' | keyof BaseFieldProps
    > {}

/**
 * Boolean toggle field. Renders the label beside the switch (horizontal by
 * default, matching the common settings/notification layout).
 */
export function SwitchField(props: SwitchFieldProps) {
  const {
    label,
    help,
    orientation = 'horizontal',
    required,
    rootProps,
    ...rest
  } = props

  const field = useFieldContext<boolean>()
  const errorText = getErrorText(field.state.meta.errors)
  const invalid = field.state.meta.isTouched && !!errorText

  return (
    <Field.Root
      orientation={orientation}
      required={required}
      invalid={invalid}
      {...rootProps}
    >
      {label && <Field.Label>{label}</Field.Label>}
      <Switch
        name={field.name}
        checked={field.state.value ?? false}
        onCheckedChange={({ checked }) => field.handleChange(checked)}
        onBlur={() => field.handleBlur()}
        {...rest}
      />
      {help && !invalid && <Field.HelperText>{help}</Field.HelperText>}
      {invalid && errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  )
}
