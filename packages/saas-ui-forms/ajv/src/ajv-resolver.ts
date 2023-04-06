import { ajvResolver } from '@hookform/resolvers/ajv'
import { objectFieldResolver, FieldResolver } from '@saas-ui/forms'

import { JSONSchemaType } from 'ajv'

export { ajvResolver }

export const ajvFieldResolver = (schema: JSONSchemaType<unknown>) => {
  return objectFieldResolver(schema.properties)
}
