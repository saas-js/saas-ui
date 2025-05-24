import { get } from '@saas-ui/core/utils'

import { ArrayFieldProps } from './array-field.tsx'
import { DefaultFields } from './default-fields.tsx'
import { ObjectFieldProps } from './object-field.tsx'
import { BaseFieldProps, ValueOf } from './types.ts'

export type FieldResolver = {
  getFields(): BaseFieldProps[]
  getNestedFields(name: string): BaseFieldProps[]
}

export type GetFieldResolver<TSchema = any> = (schema: TSchema) => FieldResolver

type FieldTypes<FieldDefs = DefaultFields> = ValueOf<{
  [K in keyof FieldDefs]: FieldDefs[K] extends React.FC<infer Props>
    ? { type?: K } & Omit<Props, 'name'>
    : never
}>

type SchemaField<FieldDefs = DefaultFields> =
  | FieldTypes<FieldDefs>
  | (Omit<ObjectFieldProps, 'name' | 'children'> & {
      type: 'object'
      properties?: Record<string, SchemaField<FieldDefs>>
    })
  | (Omit<ArrayFieldProps, 'name' | 'children'> & {
      type: 'array'
      items?: SchemaField<FieldDefs>
    })

export type ObjectSchema<FieldDefs = DefaultFields> = Record<
  string,
  SchemaField<FieldDefs>
>

const mapFields = (schema: ObjectSchema): BaseFieldProps[] =>
  schema &&
  Object.entries(schema).map(([name, props]) => {
    const { items, label, title, ...field } = props as any
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
