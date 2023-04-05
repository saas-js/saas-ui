import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
} from '@saas-ui/forms'
import { yupResolver } from './yup-resolver'
import { ObjectSchema, InferType } from 'yup'
import React from 'react'
import { AnyObjectSchema } from './types'
type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps<FieldDefs>
  extends CreateFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export const createYupForm = <FieldDefs>(
  options?: CreateYupFormProps<FieldDefs>
) => {
  return createForm({
    resolver: (schema) =>
      yupResolver(schema, options?.schemaOptions, options?.resolverOptions),
    ...options,
  }) as <
    TSchema extends AnyObjectSchema = AnyObjectSchema,
    TContext extends object = object
  >(
    props: WithFields<
      FormProps<InferType<TSchema>, TContext, TSchema>,
      FieldDefs
    >
  ) => React.ReactElement
}
