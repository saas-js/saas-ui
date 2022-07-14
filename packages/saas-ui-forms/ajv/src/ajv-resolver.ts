import { ajvResolver } from '@hookform/resolvers/ajv'
import { objectFieldResolver, FieldResolver } from '@saas-ui/forms'

import { JSONSchemaType } from 'ajv'

const jsonSchemaFieldResolver = (schema: JSONSchemaType<unknown>) => {
  return objectFieldResolver(schema.properties)
}

interface JsonSchemaFormReturn {
  schema: JSONSchemaType<unknown>
  fieldResolver: FieldResolver
  resolver: ReturnType<typeof ajvResolver>
}

export const jsonSchemaForm = (
  schema: JSONSchemaType<unknown>
): JsonSchemaFormReturn => {
  return {
    schema,
    fieldResolver: jsonSchemaFieldResolver(schema),
    resolver: ajvResolver(schema),
  }
}
