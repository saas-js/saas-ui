import { reach, AnyObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { FieldProps } from '@saas-ui/forms'

export { yupResolver }

export type Options = {
  min?: number
  max?: number
}

// @TODO get proper typings for the schema fields
const getType = (field: any) => {
  if (field.spec.meta?.type) {
    return field.spec.meta.type
  }

  switch (field.type) {
    case 'array':
      return 'array'
    case 'object':
      return 'object'
    case 'number':
      return 'number'
    case 'date':
      return 'date'
    case 'string':
    default:
      return 'text'
  }
}

const getArrayOption = (field: any, name: string) => {
  for (const test of field.tests) {
    if (test.OPTIONS?.params[name]) return test.OPTIONS.params[name]
  }
}

/**
 * A helper function to render forms automatically based on a Yup schema
 *
 * @param schema The Yup schema
 * @returns {FieldProps[]}
 */
export const getFieldsFromSchema = (schema: AnyObjectSchema): FieldProps[] => {
  const fields = []

  let schemaFields: Record<string, any> = {}
  if (schema.type === 'array') {
    /* @ts-ignore this is actually valid */
    schemaFields = schema.innerType.fields
  } else {
    schemaFields = schema.fields
  }

  for (const name in schemaFields) {
    const field = schemaFields[name]

    const options: Options = {}
    if (field.type === 'array') {
      options.min = getArrayOption(field, 'min')
      options.max = getArrayOption(field, 'max')
    }

    fields.push({
      name,
      label: field.spec.label || name,
      type: getType(field),
      ...options,
    })
  }
  return fields
}

export const getNestedSchema = (schema: AnyObjectSchema, path: string) => {
  return reach(schema, path)
}

export const yupFieldResolver = (schema: AnyObjectSchema) => {
  return {
    getFields() {
      return getFieldsFromSchema(schema)
    },
    getNestedFields(name: string) {
      return getFieldsFromSchema(getNestedSchema(schema, name))
    },
  }
}

export const yupForm = (
  schema: AnyObjectSchema,
  schemaOptions = {},
  resolverOptions = {}
) => {
  return {
    schema,
    resolver: yupResolver(schema, schemaOptions, resolverOptions),
    fieldResolver: yupFieldResolver(schema),
  }
}
