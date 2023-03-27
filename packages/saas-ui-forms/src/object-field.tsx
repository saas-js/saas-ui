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

export interface ObjectFieldProps extends BaseFieldProps {
  name: string
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
  const { name, label, hideLabel, children, columns, spacing, ...fieldProps } =
    props

  return (
    <FormControl name={name} as="fieldset" {...fieldProps}>
      <FormLegend display={hideLabel ? 'none' : 'block'}>{label}</FormLegend>
      <FormLayout columns={columns} gridGap={spacing}>
        {mapNestedFields(name, children)}
      </FormLayout>
    </FormControl>
  )
}

ObjectField.displayName = 'ObjectField'
