import { BaseFieldProps } from './types'

import { get } from '@chakra-ui/utils'

export type FieldResolver = {
  getFields(): BaseFieldProps[]
  getNestedFields(name: string): BaseFieldProps[]
}

export type GetFieldResolver<TSchema = any> = (schema: TSchema) => FieldResolver

interface SchemaField extends BaseFieldProps {
  items?: SchemaField[]
  properties?: Record<string, SchemaField>
}

export type ObjectSchema = Record<string, SchemaField>

const mapFields = (schema: ObjectSchema): BaseFieldProps[] =>
  schema &&
  Object.entries(schema).map(([name, { items, label, title, ...field }]) => {
    return {
      ...field,
      name,
      label: label || title || name, // json schema compatibility
    }
  })

export const objectFieldResolver: GetFieldResolver<ObjectSchema> = (schema) => {
  const getFields = (): BaseFieldProps[] => {
    return mapFields(schema)
  }
  const getNestedFields = (name: string): BaseFieldProps[] => {
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
