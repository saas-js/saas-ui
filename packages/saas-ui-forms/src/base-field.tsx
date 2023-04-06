import * as React from 'react'
import { FormState, get } from 'react-hook-form'

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'

import { useFormContext } from './form-context'

import { BaseFieldProps, FieldProps } from './types'

const getError = (name: string, formState: FormState<{ [x: string]: any }>) => {
  return get(formState.errors, name)
}

const isTouched = (
  name: string,
  formState: FormState<{ [x: string]: any }>
) => {
  return get(formState.touchedFields, name)
}

/**
 * The default BaseField component
 * Composes the Chakra UI FormControl component, with FormLabel, FormHelperText and FormErrorMessage.
 */
export const BaseField: React.FC<BaseFieldProps> = (props) => {
  const { name, label, help, hideLabel, children, ...controlProps } = props

  const { formState } = useFormContext()

  const error = getError(name, formState)

  return (
    <FormControl {...controlProps} isInvalid={!!error}>
      {label && !hideLabel ? <FormLabel>{label}</FormLabel> : null}
      <Box>
        {children}
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
