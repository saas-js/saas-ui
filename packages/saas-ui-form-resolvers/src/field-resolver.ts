import { get } from '@chakra-ui/utils'

export interface FieldProps {
  name: string
  label?: string
  title?: string
  type?: string
}

export type FieldResolver<TFieldProps extends FieldProps = FieldProps> = {
  getFields(): TFieldProps[]
  getNestedFields(name: string): TFieldProps[]
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
      label: label || title || name, // json schema compatibility
    }
  })

export const objectFieldResolver = <
  TFieldProps extends FieldProps = FieldProps
>(
  schema: ObjectSchema
): FieldResolver<TFieldProps> => {
  const getFields = () => {
    return mapFields(schema) as TFieldProps[]
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
