import {
  createForm,
  CreateFormProps,
  FieldValues,
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

type ParseJsonSchema<T> = T extends { type: 'object' }
  ? JTDDataType<T> extends infer R
    ? R extends object
      ? R
      : never
    : never
  : never

export type AjvFormType<
  FieldDefs,
  ExtraProps = object,
  JsonSchema extends Record<string, any> = Record<string, any>
> = (<
  TSchema extends JsonSchema = JsonSchema,
  TFieldValues extends ParseJsonSchema<TSchema> = ParseJsonSchema<TSchema>,
  TContext extends object = object
>(
  props: WithFields<FormProps<TSchema, TFieldValues, TContext>, FieldDefs> & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: string
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
  return createForm({
    resolver: (schema: any) =>
      ajvResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: ajvFieldResolver,
    ...options,
  }) as AjvFormType<FieldDefs>
}
