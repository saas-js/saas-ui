import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { get } from '@saas-ui/core/utils'

// import { FieldProps } from '@saas-ui/forms'

type FieldProps = any

export { zodResolver }

export type ExtraProps = {
  min?: number
  max?: number
  options?: { label: string; value: string }[]
}

const getType = (
  field: z.ZodTypeAny,
): 'array' | 'object' | 'number' | 'date' | 'select' | 'text' => {
  if (['ZodDefault', 'ZodOptional'].includes(field._def.typeName)) {
    return getType(field._def.innerType)
  }

  switch (field._def.typeName) {
    case 'ZodArray':
      return 'array'
    case 'ZodObject':
      return 'object'
    case 'ZodNumber':
      return 'number'
    case 'ZodDate':
      return 'date'
    case 'ZodNativeEnum':
    case 'ZodEnum':
      return 'select'
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

    const def =
      field._def.typeName === 'ZodDefault'
        ? field._def.innerType._def
        : field._def

    const props: ExtraProps = {}
    if (def.typeName === 'ZodArray') {
      props.min = getArrayOption(field, 'minLength')
      props.max = getArrayOption(field, 'maxLength')
    } else if (def.typeName === 'ZodEnum') {
      props.options = def.values.map((value: string) => {
        return { label: value, value }
      })
    } else if (def.typeName === 'ZodNativeEnum') {
      props.options = Object.entries(def.values).map(([label, value]) => ({
        label,
        value: value as string,
      }))
    }

    const meta = field.description && zodParseMeta(field.description)

    fields.push({
      name,
      label: meta?.label || field.description || name,
      type: meta?.type || getType(field),
      help: meta?.help,
      placeholder: meta?.placeholder,
      defaultValue: field._def.defaultValue?.(),
      ...props,
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

export interface ZodMeta {
  /**
   * The label of the field
   */
  label: string

  /**
   * The type of the field
   */
  type?: string

  /**
   * The placeholder of the field
   */
  placeholder?: string

  /**
   * The help text of the field
   */
  help?: string

  /**
   * Object field column count
   */
  columns?: number

  /**
   * Array field min rows
   */
  min?: number

  /**
   * Array field max rows
   */
  max?: number

  [key: string]: any
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
