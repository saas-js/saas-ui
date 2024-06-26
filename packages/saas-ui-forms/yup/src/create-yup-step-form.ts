import {
  CreateStepFormProps,
  createStepForm,
  StepsOptions,
  UseStepFormProps,
  Form,
  WithStepFields,
  GetBaseField,
} from '@saas-ui/forms'
import { yupFieldResolver, yupResolver } from './yup-resolver'
import { InferType, object, string } from 'yup'
import React from 'react'
import { AnyObjectSchema } from './types'

type ResolverArgs = Parameters<typeof yupResolver>

export interface CreateYupFormProps<
  FieldDefs,
  TGetBaseField extends GetBaseField = GetBaseField,
> extends CreateStepFormProps<FieldDefs, TGetBaseField> {
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
  ExtraFieldProps extends object = object,
  ExtraOverrides = object,
> = (<
  TSteps extends Required<StepsOptions<AnyObjectSchema>> = Required<
    StepsOptions<AnyObjectSchema>
  >,
  TFieldValues extends InferStepType<TSteps> = InferStepType<TSteps>,
  TContext extends object = object,
>(
  props: WithStepFields<
    UseStepFormProps<TSteps, TFieldValues, TContext>,
    FieldDefs,
    ExtraOverrides
  > & {
    steps: TSteps
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export const createYupStepForm = <
  FieldDefs,
  TGetBaseField extends GetBaseField = GetBaseField,
>(
  options?: CreateYupFormProps<FieldDefs, TGetBaseField>
) => {
  type ExtraFieldProps =
    TGetBaseField extends GetBaseField<infer ExtraFieldProps>
      ? ExtraFieldProps
      : object

  const YupStepForm = createStepForm<any, any>({
    resolver: (schema: any) =>
      yupResolver(
        schema,
        options?.schemaOptions,
        options?.resolverOptions
      ) as any,
    fieldResolver: yupFieldResolver,
    ...options,
  })

  YupStepForm.displayName = 'YupStepForm'
  YupStepForm.id = 'YupStepForm'

  return YupStepForm as YupStepFormType<FieldDefs, object, ExtraFieldProps>
}
