import * as React from 'react'
import { ResponsiveValue } from '@chakra-ui/system'

import { FormLayout } from './layout'
import { BaseField, FieldProps } from './field'

import { mapNestedFields } from './utils'

export interface ObjectFieldProps extends FieldProps {
  name: string
  children: React.ReactNode
  columns?: ResponsiveValue<number>
  spacing?: ResponsiveValue<string | number>
}

export const ObjectField: React.FC<ObjectFieldProps> = (props) => {
  const { name, children, columns, spacing, ...fieldProps } = props
  return (
    <BaseField name={name} {...fieldProps}>
      <FormLayout columns={columns} gridGap={spacing}>
        {mapNestedFields(name, children)}
      </FormLayout>
    </BaseField>
  )
}
