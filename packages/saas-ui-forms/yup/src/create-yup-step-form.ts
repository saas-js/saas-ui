import {
  createForm,
  CreateFormProps,
  FormProps,
  WithFields,
  FieldValues,
  createStepForm,
  StepsOptions,
  UseStepFormProps,
  Form,
} from '@saas-ui/forms'
import { yupFieldResolver, yupResolver } from './yup-resolver'
import { InferType, object, string } from 'yup'
import React from 'react'
import { AnyObjectSchema } from './types'

type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps<FieldDefs>
  extends CreateFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

type InferStepType<T extends Required<StepsOptions<AnyObjectSchema>>> =
  T extends [infer Step, ...infer Rest]
    ? Step extends { schema: AnyObjectSchema }
      ? InferType<Step['schema']> &
          (Rest extends Required<StepsOptions<AnyObjectSchema>>
            ? InferStepType<Rest>
            : object)
      : object
    : object

type YupStepFormType<
  FieldDefs,
  ExtraProps = object,
  ExtraOverrides = object
> = (<
  TSteps extends Required<StepsOptions<AnyObjectSchema>> = Required<
    StepsOptions<AnyObjectSchema>
  >,
  TFieldValues extends InferStepType<TSteps> = InferStepType<TSteps>,
  TContext extends object = object
>(
  props: UseStepFormProps<TSteps, TFieldValues, TContext> & {
    steps: TSteps
    ref?: React.ForwardedRef<HTMLFormElement>
  }
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export const createYupStepForm = <FieldDefs>(
  options?: CreateYupFormProps<FieldDefs>
) => {
  const YupStepForm = createStepForm<any, any, any>({
    resolver: (schema: any) =>
      yupResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: yupFieldResolver,
    ...options,
  })

  YupStepForm.displayName = 'YupStepForm'
  YupStepForm.id = 'YupStepForm'

  return YupStepForm as YupStepFormType<FieldDefs>
}
