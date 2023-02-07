import { createForm, CreateFormProps, FormProps } from '@saas-ui/forms'
import { yupResolver } from './yup-resolver'
import * as yup from 'yup'
import React from 'react'
type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps extends CreateFormProps {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export const createYupForm = (options?: CreateYupFormProps) => {
  return createForm({
    resolver: (schema) =>
      yupResolver(schema, options?.schemaOptions, options?.resolverOptions),
    ...options,
  }) as <
    TSchema extends yup.AnyObjectSchema = yup.AnyObjectSchema,
    TContext extends object = object
  >(
    props: FormProps<yup.InferType<TSchema>, TContext, TSchema>
  ) => React.ReactElement
}
