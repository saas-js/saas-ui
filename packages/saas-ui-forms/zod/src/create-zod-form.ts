import {
  createForm,
  CreateFormProps,
  WithFields,
  FormProps,
} from '@saas-ui/forms'
import { zodFieldResolver, zodResolver } from './zod-resolver'
import { z } from 'zod'

type ResolverArgs = Parameters<typeof zodResolver>

export interface CreateZodFormProps<FieldDefs>
  extends CreateFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export type ZodFormType<FieldDefs, ExtraProps = object> = <
  TSchema extends z.AnyZodObject = z.AnyZodObject,
  TContext extends object = object
>(
  props: WithFields<
    FormProps<z.infer<TSchema>, TContext, TSchema>,
    FieldDefs
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement

export const createZodForm = <FieldDefs>(
  options?: CreateZodFormProps<FieldDefs>
) => {
  return createForm({
    resolver: (schema) =>
      zodResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: zodFieldResolver,
    ...options,
  }) as ZodFormType<FieldDefs>
}
