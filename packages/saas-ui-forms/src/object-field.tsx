import * as React from 'react'
import {
  FormControl,
  FormLabel,
  FormLabelProps,
  ResponsiveValue,
  useStyleConfig,
} from '@chakra-ui/react'

import { FormLayout } from './layout'
import { BaseFieldProps } from './types'

import { mapNestedFields } from './utils'
import { FieldPath, FieldValues } from 'react-hook-form'
import { useFieldProps } from './form-context'

export interface ObjectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseFieldProps {
  name: TName
  children: React.ReactNode
  columns?: ResponsiveValue<number>
  spacing?: ResponsiveValue<string | number>
}

export const FormLegend = (props: FormLabelProps) => {
  const styles = useStyleConfig('SuiFormLegend')
  return <FormLabel as="legend" sx={styles} {...props} />
}
/**
 * The object field component.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/object-field
 */
export const ObjectField: React.FC<ObjectFieldProps> = (props) => {
  const {
    name,
    label,
    hideLabel: hideLabelProp,
    children,
    columns: columnsProp,
    spacing: spacingProp,
    ...fieldProps
  } = props

  const { hideLabel, columns, spacing, ...overrides } = useFieldProps(
    name
  ) as Omit<ObjectFieldProps, 'name'>

  return (
    <FormControl name={name} as="fieldset" {...fieldProps} {...overrides}>
      <FormLegend display={hideLabelProp || hideLabel ? 'none' : 'block'}>
        {label}
      </FormLegend>
      <FormLayout
        columns={columnsProp || columns}
        gridGap={spacingProp || spacing}
      >
        {mapNestedFields(name, children)}
      </FormLayout>
    </FormControl>
  )
}

ObjectField.displayName = 'ObjectField'
