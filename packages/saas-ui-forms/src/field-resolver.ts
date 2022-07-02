import { FieldProps } from './field'

import { get } from '@chakra-ui/utils'

export type FieldResolver = {
  getFields(): FieldProps[]
  getNestedFields(name: string): FieldProps[]
}

interface SchemaField extends FieldProps {
  items?: SchemaField[]
  properties?: Record<string, SchemaField>
}

export type ObjectSchema = Record<string, SchemaField>

const mapFields = (schema: ObjectSchema): FieldProps[] =>
  schema &&
  Object.entries(schema).map(([name, { items, label, title, ...field }]) => {
    return {
      ...field,
      name,
      label: label || title, // json schema compatibility
    }
  })

export const objectFieldResolver = (schema: ObjectSchema): FieldResolver => {
  const getFields = () => {
    return mapFields(schema)
  }
  const getNestedFields = (name: string) => {
    const field = get(schema, name)

    if (!field) return []

    if (field.items?.type === 'object') {
      return mapFields(field.items.properties)
    } else if (field.type === 'object') {
      return mapFields(field.properties)
    }
    return [field.items]
  }

  return { getFields, getNestedFields }
}
