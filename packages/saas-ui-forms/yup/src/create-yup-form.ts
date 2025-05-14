import React from 'react'

import {
  CreateFormProps,
  FormProps,
  GetBaseField,
  WithFields,
  createForm,
} from '@saas-ui/forms'
import { AnyObjectSchema, InferType } from 'yup'

import { yupFieldResolver, yupResolver } from './yup-resolver'

type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps<
  FieldDefs,
  TGetBaseField extends GetBaseField = GetBaseField,
> extends CreateFormProps<FieldDefs, TGetBaseField> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

export type YupFormType<
  FieldDefs,
  ExtraProps = object,
  ExtraFieldProps extends object = object,
  ExtraOverrides = object,
  Type extends 'yup' = 'yup',
> = (<
  TSchema extends AnyObjectSchema = AnyObjectSchema,
  TFieldValues extends Required<InferType<TSchema>> = Required<
    InferType<TSchema>
  >,
  TContext extends object = object,
>(
  props: WithFields<
    FormProps<TSchema, TFieldValues, TContext, ExtraFieldProps>,
    FieldDefs,
    ExtraOverrides
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps,
) => React.ReactElement) & {
  displayName?: string
  id?: 'YupForm'
}

export const createYupForm = <
  FieldDefs,
  TGetBaseField extends GetBaseField = GetBaseField,
>(
  options?: CreateYupFormProps<FieldDefs, TGetBaseField>,
) => {
  type ExtraFieldProps =
    TGetBaseField extends GetBaseField<infer ExtraFieldProps>
      ? ExtraFieldProps
      : object

  const YupForm = createForm({
    resolver: (schema: any) =>
      yupResolver(
        schema,
        options?.schemaOptions,
        options?.resolverOptions,
      ) as any,
    fieldResolver: yupFieldResolver,
    ...options,
  })

  YupForm.displayName = 'YupForm'
  YupForm.id = 'YupForm'

  return YupForm as YupFormType<FieldDefs, object, ExtraFieldProps>
}
