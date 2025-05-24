import * as React from 'react'

import { Field as FieldPrimivite, Text } from '@chakra-ui/react'
import type { FieldPath, FieldValues } from 'react-hook-form'

import { useFormContext } from './form-context.tsx'
import type { ArrayFieldPath } from './types.ts'

export interface DisplayFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FieldPrimivite.RootProps, 'type' | 'onChange' | 'defaultValue'> {
  name: TName | ArrayFieldPath<TName>
  label?: string
}

/**
 * Display a field value.
 *
 * @see Docs https://saas-ui.dev/
 */
export const DisplayField: React.FC<DisplayFieldProps> = ({
  name,
  label,
  ...props
}) => {
  return (
    <FieldPrimivite.Root {...props}>
      {label ? (
        <FieldPrimivite.Label htmlFor={name}>{label}</FieldPrimivite.Label>
      ) : null}
      <Text fontSize="md">
        <FormValue name={name} />
      </Text>
    </FieldPrimivite.Root>
  )
}

DisplayField.displayName = 'DisplayField'

export const FormValue: React.FC<{ name: string }> = ({ name }) => {
  const { getValues } = useFormContext()
  return getValues(name) || null
}

FormValue.displayName = 'FormValue'
