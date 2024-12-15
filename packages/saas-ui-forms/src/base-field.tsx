import * as React from 'react'

import { Field } from '@chakra-ui/react'
import { splitProps } from '@saas-ui/core/utils'
import { FormState, get } from 'react-hook-form'

import { useFormContext } from './form-context'
import type { BaseFieldProps } from './types'

const getError = (name: string, formState: FormState<{ [x: string]: any }>) => {
  return get(formState.errors, name)
}

const isTouched = (
  name: string,
  formState: FormState<{ [x: string]: any }>,
) => {
  return get(formState.touchedFields, name)
}

export const useBaseField = (props: BaseFieldProps) => {
  // TODO: Clean up these props / types
  const [fieldProps, rootProps] = splitProps(props, [
    'name',
    'label',
    'help',
    'hideLabel',
    'placeholder',
    'rules',
    'type',
    'children',
  ])

  const { formState } = useFormContext()

  const error = getError(fieldProps.name, formState)
  const touched = isTouched(fieldProps.name, formState)

  return {
    ...fieldProps,
    rootProps,
    error,
    touched,
  }
}

/**
 * The default BaseField component
 * Composes the Chakra UI Field component, with Label, HelperText and ErrorText.
 */
export const BaseField: React.FC<BaseFieldProps> = (props) => {
  const { rootProps, label, hideLabel, help, error } = useBaseField(props)

  const isInvalid = !!error

  return (
    <Field.Root invalid={isInvalid} {...rootProps}>
      {label && !hideLabel ? (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      ) : null}

      {props.children}
      {help && !error?.message ? (
        <Field.HelperText>{help}</Field.HelperText>
      ) : null}
      {error?.message && <Field.ErrorText>{error?.message}</Field.ErrorText>}
    </Field.Root>
  )
}

BaseField.displayName = 'BaseField'
