import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
} from '@saas-ui/forms'
import { ajvFieldResolver, ajvResolver } from './ajv-resolver'
import { JTDDataType } from 'ajv/dist/jtd'
type ResolverArgs = Parameters<typeof ajvResolver>

export interface CreateAjvFormProps<FieldDefs>
  extends CreateFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

/**
 * Create a Form component with AJV validation that accepts JSON Type Definition schema
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 * @see https://ajv.js.org/json-type-definition.html
 */
export function createAjvForm<FieldDefs>(
  options?: CreateAjvFormProps<FieldDefs>
) {
  return createForm<any>({
    resolver: (schema) =>
      ajvResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: ajvFieldResolver,
    ...options,
  }) as <
    TSchema extends Record<string, any>,
    TContext extends object = object,
    TJSONSchema = JTDDataType<TSchema>
  >(
    /** @ts-expect-error @todo properly fix these types */
    props: WithFields<FormProps<TJSONSchema, TContext, TSchema>, FieldDefs>
  ) => React.ReactElement
}
