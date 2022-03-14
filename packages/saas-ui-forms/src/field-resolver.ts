import { FieldProps } from './field'

import { get } from '@chakra-ui/utils'

export type FieldResolver = {
  getFields(): FieldProps[]
  getNestedFields(name: string): FieldProps[]
}

// @todo finalize this
export type FormSchema = Record<string, any>

const mapFields = (schema: FormSchema) =>
  Object.entries(schema).map(([name, field]) => {
    return {
      name,
      ...field,
    }
  })

export const defaultFieldResolver = (schema: FormSchema): FieldResolver => {
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
