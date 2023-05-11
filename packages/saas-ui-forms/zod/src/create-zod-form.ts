import {
  createForm,
  CreateFormProps,
  WithFields,
  FormProps,
  DefaultFieldOverrides,
  FieldValues,
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
  TFieldOverrides extends DefaultFieldOverrides = DefaultFieldOverrides,
  ZodSchema extends z.AnyZodObject = z.AnyZodObject
> = (<
  TFieldValues extends FieldValues = z.infer<ZodSchema>, // placeholder
  TContext extends object = object,
  TSchema extends ZodSchema = ZodSchema
>(
  props: WithFields<FormProps<TFieldValues, TContext, TSchema>, FieldDefs> & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export const createZodForm = <
  FieldDefs,
  ExtraProps = object,
  TFieldOverrides extends DefaultFieldOverrides = DefaultFieldOverrides
>(
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

  return ZodForm as ZodFormType<FieldDefs, ExtraProps, TFieldOverrides>
}
