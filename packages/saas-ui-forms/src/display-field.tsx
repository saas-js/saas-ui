import * as React from 'react'
import { useFormContext } from './form-context'
import {
  Text,
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react'

import { FieldProps } from './types'

export interface DisplayFieldProps
  extends Omit<FormControlProps, 'onChange'>,
    Omit<FieldProps, 'type' | 'label' | 'onChange'> {}

/**
 * Display a field value.
 *
 * @see Docs https://saas-ui.dev/
 */
export const DisplayField: React.FC<DisplayFieldProps> = ({
  name,
  label,
  placeholder,
  ...props
}) => {
  return (
    <FormControl {...props}>
      {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
      <Text fontSize="md">
        <FormValue name={name} />
      </Text>
    </FormControl>
  )
}

DisplayField.displayName = 'DisplayField'

export const FormValue: React.FC<{ name: string }> = ({ name }) => {
  const { getValues } = useFormContext()
  return getValues(name) || null
}

FormValue.displayName = 'FormValue'
