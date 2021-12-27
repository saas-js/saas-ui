import * as React from 'react'
import { getFieldsFromSchema, getNestedSchema } from './resolvers/yup'

import { FormLayout } from './layout'
import { Field, FieldProps } from './field'

import { ArrayField } from './array-field'
import { ObjectField } from './object-field'

export interface FieldsProps {
  schema: any
}

const getNestedFields = (schema: any, name: string) => {
  return getFieldsFromSchema(getNestedSchema(schema, name)).map(
    ({ name, type, ...nestedFieldProps }: FieldProps): React.ReactNode => (
      <Field key={name} name={name} type={type} {...nestedFieldProps} />
    )
  )
}

export const Fields: React.FC<FieldsProps> = ({ schema, ...props }) => {
  return (
    <FormLayout {...props}>
      {getFieldsFromSchema(schema).map(
        ({
          name,
          type,
          defaultValue,
          ...fieldProps
        }: FieldProps): React.ReactNode => {
          if (type === 'array') {
            return (
              <ArrayField name={name} {...fieldProps}>
                {getNestedFields(schema, name)}
              </ArrayField>
            )
          } else if (type === 'object') {
            return (
              <ObjectField name={name} {...fieldProps}>
                {getNestedFields(schema, name)}
              </ObjectField>
            )
          }

          return <Field key={name} name={name} type={type} {...fieldProps} />
        }
      )}
    </FormLayout>
  )
}
