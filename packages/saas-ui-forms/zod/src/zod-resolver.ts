import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { get } from '@chakra-ui/utils'
import { FieldProps } from '@saas-ui/forms'

export { zodResolver }

export type Options = {
  min?: number
  max?: number
}

const getType = (field: z.ZodTypeAny) => {
  switch (field._def.typeName) {
    case 'ZodArray':
      return 'array'
    case 'ZodObject':
      return 'object'
    case 'ZodNumber':
      return 'number'
    case 'ZodDate':
      return 'date'
    case 'ZodString':
    default:
      return 'text'
  }
}

const getArrayOption = (field: any, name: string) => {
  return field._def[name]?.value
}

/**
 * A helper function to render forms automatically based on a Yup schema
 *
 * @param schema The Yup schema
 * @returns {FieldProps[]}
 */
export const getFieldsFromSchema = (schema: z.ZodTypeAny): FieldProps[] => {
  const fields: FieldProps[] = []

  let schemaFields: Record<string, any> = {}
  if (schema._def.typeName === 'ZodArray') {
    schemaFields = schema._def.type.shape
  } else if (schema._def.typeName === 'ZodObject') {
    schemaFields = schema._def.shape()
  } else {
    return fields
  }

  for (const name in schemaFields) {
    const field = schemaFields[name]

    const options: Options = {}
    if (field._def.typeName === 'ZodArray') {
      options.min = getArrayOption(field, 'minLength')
      options.max = getArrayOption(field, 'maxLength')
    }

    const meta = field.description && zodParseMeta(field.description)

    fields.push({
      name,
      label: meta?.label || field.description || name,
      type: meta?.type || getType(field),
      ...options,
    })
  }
  return fields
}

export const getNestedSchema = (schema: z.ZodTypeAny, path: string) => {
  return get(schema._def.shape(), path)
}

export const zodFieldResolver = <T extends z.ZodTypeAny>(schema: T) => {
  return {
    getFields() {
      return getFieldsFromSchema(schema)
    },
    getNestedFields(name: string) {
      return getFieldsFromSchema(getNestedSchema(schema, name))
    },
  }
}

export const zodForm = <T extends z.ZodTypeAny>(
  schema: T,
  schemaOptions = {},
  resolverOptions = {}
) => {
  return {
    schema,
    resolver: zodResolver(schema, schemaOptions, resolverOptions),
    fieldResolver: zodFieldResolver(schema),
  }
}

export interface ZodMeta {
  label: string
  type?: string
}

export const zodMeta = (meta: ZodMeta) => {
  return JSON.stringify(meta)
}

export const zodParseMeta = (meta: string) => {
  try {
    return JSON.parse(meta)
  } catch (e) {
    return meta
  }
}
