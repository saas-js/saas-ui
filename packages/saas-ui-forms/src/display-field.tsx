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
  const { getValues } = useFormContext()

  return (
    <FormControl {...props}>
      {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
      <Text fontSize="md">{getValues(name)}</Text>
    </FormControl>
  )
}
