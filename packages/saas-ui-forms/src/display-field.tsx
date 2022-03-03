import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Text,
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react'

import { FieldProps } from './field'

export interface DisplayFieldProps
  extends FormControlProps,
    Omit<FieldProps, 'type' | 'label'> {}

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

export const FormValue: React.FC<{ name: string }> = ({ name }) => {
  const { getValues } = useFormContext()
  return getValues(name) || null
}
