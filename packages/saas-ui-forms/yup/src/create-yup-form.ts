import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
} from '@saas-ui/forms'
import { yupResolver } from './yup-resolver'
import * as yup from 'yup'
import React from 'react'
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
    TSchema extends yup.AnyObjectSchema = yup.AnyObjectSchema,
    TContext extends object = object
  >(
    props: WithFields<
      FormProps<yup.InferType<TSchema>, TContext, TSchema>,
      FieldDefs
    >
  ) => React.ReactElement
}
