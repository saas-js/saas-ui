import * as React from 'react'
import {
  FormControl,
  FormLabel,
  FormLabelProps,
  ResponsiveValue,
  useStyleConfig,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import { FormLayout } from './layout'
import { FieldProps } from './field'

import { mapNestedFields } from './utils'

export interface ObjectFieldProps extends FieldProps {
  name: string
  children: React.ReactNode
  columns?: ResponsiveValue<number>
  spacing?: ResponsiveValue<string | number>
}

export const FormLegend = (props: FormLabelProps) => {
  const styles = useStyleConfig('FormLegend')
  return <FormLabel as="legend" sx={styles} {...props} />
}

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

if (__DEV__) {
  ObjectField.displayName = 'ObjectField'
}
