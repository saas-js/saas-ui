import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
  FieldValues,
} from '@saas-ui/forms'
import { yupFieldResolver, yupResolver } from './yup-resolver'
import { InferType } from 'yup'
import React from 'react'
import { AnyObjectSchema } from './types'

type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps<FieldDefs>
  extends CreateFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export type YupFormType<
  FieldDefs,
  ExtraProps = object,
  ExtraOverrides = object,
  Type extends 'yup' = 'yup'
> = (<
  TSchema extends AnyObjectSchema = AnyObjectSchema,
  TFieldValues extends InferType<TSchema> = InferType<TSchema>, // placeholder
  TContext extends object = object
>(
  props: WithFields<
    FormProps<TFieldValues, TContext, TSchema>,
    FieldDefs,
    ExtraOverrides
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: 'YupForm'
}

export const createYupForm = <FieldDefs>(
  options?: CreateYupFormProps<FieldDefs>
) => {
  const YupForm = createForm({
    resolver: (schema: any) =>
      yupResolver(
        schema,
        options?.schemaOptions,
        options?.resolverOptions
      ) as any,
    fieldResolver: yupFieldResolver,
    ...options,
  })

  YupForm.displayName = 'YupForm'
  YupForm.id = 'YupForm'

  return YupForm as YupFormType<FieldDefs>
}
