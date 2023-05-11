import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
  DefaultFieldOverrides,
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
  TFieldOverrides extends DefaultFieldOverrides = DefaultFieldOverrides,
  YupSchema extends AnyObjectSchema = AnyObjectSchema
> = (<
  TFieldValues extends FieldValues = InferType<YupSchema>, // placeholder
  TContext extends object = object,
  TSchema extends YupSchema = YupSchema
>(
  props: WithFields<FormProps<TFieldValues, TContext, TSchema>, FieldDefs> & {
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
      yupResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: yupFieldResolver,
    ...options,
  })

  YupForm.displayName = 'YupForm'
  YupForm.id = 'YupForm'

  return YupForm as YupFormType<FieldDefs>
}
