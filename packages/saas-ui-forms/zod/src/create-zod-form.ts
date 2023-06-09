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

export type ZodFormType<
  FieldDefs,
  ExtraProps = object,
  ExtraOverrides = object,
  Type extends 'zod' = 'zod'
> = (<
  TSchema extends z.AnyZodObject = z.AnyZodObject,
  TFieldValues extends z.infer<TSchema> = z.infer<TSchema>,
  TContext extends object = object
>(
  props: WithFields<
    FormProps<TSchema, TFieldValues, TContext>,
    FieldDefs,
    ExtraOverrides
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export const createZodForm = <FieldDefs>(
  options?: CreateZodFormProps<FieldDefs>
) => {
  const ZodForm = createForm({
    resolver: (schema: any) =>
      zodResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: zodFieldResolver,
    ...options,
  })

  ZodForm.displayName = 'ZodForm'
  ZodForm.id = 'ZodForm'

  return ZodForm as ZodFormType<FieldDefs>
}
