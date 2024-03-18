import * as React from 'react'
import { FormState, get } from 'react-hook-form'

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'

import { splitProps } from '@saas-ui/core/utils'

import { useFormContext } from './form-context'

import { BaseFieldProps } from './types'

const getError = (name: string, formState: FormState<{ [x: string]: any }>) => {
  return get(formState.errors, name)
}

const isTouched = (
  name: string,
  formState: FormState<{ [x: string]: any }>
) => {
  return get(formState.touchedFields, name)
}

export const useBaseField = (props: BaseFieldProps) => {
  const [labelProps] = splitProps(props, ['name', 'label', 'help', 'hideLabel'])

  const [controlProps] = splitProps(props, [
    'id',
    'isDisabled',
    'isInvalid',
    'isReadOnly',
    'isRequired',
  ])

  const { formState } = useFormContext()

  const error = getError(labelProps.name, formState)
  const touched = isTouched(labelProps.name, formState)

  return {
    labelProps,
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
  const { labelProps, controlProps, error } = useBaseField(props)

  const { label, help, hideLabel } = labelProps

  return (
    <FormControl {...controlProps} isInvalid={!!error}>
      {label && !hideLabel ? <FormLabel>{label}</FormLabel> : null}
      <Box>
        {props.children}
        {help && !error?.message ? (
          <FormHelperText>{help}</FormHelperText>
        ) : null}
        {error?.message && (
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        )}
      </Box>
    </FormControl>
  )
}

BaseField.displayName = 'BaseField'
