import * as React from 'react'

import { Box, Field } from '@chakra-ui/react'
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
  const [fieldProps] = splitProps(props, ['name', 'label', 'help', 'hideLabel'])

  const [controlProps] = splitProps(props, [
    // 'id',
    // 'orientation',
    // 'disabled',
    // 'invalid',
    // 'readOnly',
    // 'required',
  ])

  const { formState } = useFormContext()

  const error = getError(fieldProps.name, formState)
  const touched = isTouched(fieldProps.name, formState)

  return {
    ...fieldProps,
    controlProps,
    error,
    touched,
  }
}

/**
 * The default BaseField component
 * Composes the Chakra UI FormControl component, with FormLabel, FormHelperText and FormErrorMessage.
 */
export const BaseField: React.FC<BaseFieldProps> = (props) => {
  const { label, help, hideLabel, error } = useBaseField(props)

  const isInvalid = !!error //|| controlProps.

  return (
    <Field.Root invalid={isInvalid} {...props}>
      {label && !hideLabel ? <Field.Label>{label}</Field.Label> : null}
      <Box width="full">
        {props.children}
        {help && !error?.message ? (
          <Field.HelperText>{help}</Field.HelperText>
        ) : null}
        {error?.message && <Field.ErrorText>{error?.message}</Field.ErrorText>}
      </Box>
    </Field.Root>
  )
}

BaseField.displayName = 'BaseField'
