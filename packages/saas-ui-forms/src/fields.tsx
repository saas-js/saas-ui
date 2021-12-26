import * as React from 'react'
import { getFieldsFromSchema } from './resolvers/yup'

import { FormLayout } from './layout'
import { Field, FieldProps } from './field'

export interface FieldsProps {
  schema: any
}

export const Fields: React.FC<FieldsProps> = ({ schema, ...props }) => {
  return (
    <FormLayout {...props}>
      {getFieldsFromSchema(schema).map(
        ({ name, label, type }: FieldProps): React.ReactNode => (
          <Field key={name} name={name} label={label} type={type} />
        )
      )}
    </FormLayout>
  )
}
