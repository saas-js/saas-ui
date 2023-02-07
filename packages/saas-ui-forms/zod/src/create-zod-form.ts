import { createForm, CreateFormProps, FormProps } from '@saas-ui/forms'
import { zodResolver } from './zod-resolver'
import { z } from 'zod'

type ResolverArgs = Parameters<typeof zodResolver>

export interface CreateZodFormProps extends CreateFormProps {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export const createZodForm = (options?: CreateZodFormProps) => {
  return createForm<z.AnyZodObject>({
    resolver: (schema) =>
      zodResolver(schema, options?.schemaOptions, options?.resolverOptions),
    ...options,
  }) as <
    TSchema extends z.AnyZodObject = z.AnyZodObject,
    TContext extends object = object
  >(
    props: FormProps<z.infer<TSchema>, TContext, TSchema>
  ) => React.ReactElement
}
