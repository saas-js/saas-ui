import * as React from 'react'
import { FormState, get } from 'react-hook-form'

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useBreakpointValue,
} from '@chakra-ui/react'

import { splitProps } from '@saas-ui/core'

import { useFormContext } from './form-context'

import type { BaseFieldProps } from './types'

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
  const [fieldProps] = splitProps(props, ['name', 'label', 'help', 'hideLabel'])

  const [controlProps] = splitProps(props, [
    'id',
    'direction',
    'isDisabled',
    'isInvalid',
    'isReadOnly',
    'isRequired',
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
  const { controlProps, label, help, hideLabel, error } = useBaseField(props)

  const isInvalid = !!error || controlProps.isInvalid

  const { direction, ...rest } = controlProps

  return (
    <FormControl
      {...rest}
      isInvalid={isInvalid}
      variant={direction === 'row' ? 'horizontal' : undefined}
    >
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
