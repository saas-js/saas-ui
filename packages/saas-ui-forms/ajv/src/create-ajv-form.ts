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

type ParseJsonSchema<T> = T extends JTDDataType<any> ? T : never

export type AjvFormType<
  FieldDefs,
  ExtraProps = object,
  JsonSchema extends Record<string, any> = Record<string, any>
> = (<
  TFieldValues extends FieldValues = FieldValues, // placeholder
  TContext extends object = object,
  TSchema extends JsonSchema = JsonSchema
>(
  props: WithFields<
    FormProps<ParseJsonSchema<TSchema>, TContext, TSchema>,
    FieldDefs
  > & {
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
