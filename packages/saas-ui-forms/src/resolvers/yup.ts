import { SchemaOf, AnySchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { FieldProps } from '../Field'

export const resolver = yupResolver

export const getFieldsFromSchema = (
  schema: SchemaOf<AnySchema>
): FieldProps[] => {
  const fields = []
  const schemaFields: Record<string, any> = schema.fields
  for (const name in schemaFields) {
    const field = schemaFields[name]
    fields.push({
      name,
      label: field.spec.label || field.name,
      type: field.spec.meta?.type || 'text',
    })
  }
  return fields
}
