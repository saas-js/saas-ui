import {
  createForm,
  CreateFormProps,
  FieldValues,
  FormProps,
} from '@saas-ui/forms'
import { ajvResolver } from './ajv-resolver'
import { JSONSchemaType } from 'ajv'

type ResolverArgs = Parameters<typeof ajvResolver>

export interface CreateAjvFormProps extends CreateFormProps<any> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export function createAjvForm(options?: CreateAjvFormProps): any {
  return createForm({
    resolver: (schema) =>
      ajvResolver(schema, options?.schemaOptions, options?.resolverOptions),
    ...options,
  }) as <
    TFieldValues extends FieldValues = FieldValues,
    TSchema extends JSONSchemaType<TFieldValues> = JSONSchemaType<TFieldValues>,
    TContext extends object = object
  >(
    props: FormProps<TFieldValues, TContext, TSchema>
  ) => React.ReactElement
}
