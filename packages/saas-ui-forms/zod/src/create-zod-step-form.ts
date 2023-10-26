import {
  CreateStepFormProps,
  createStepForm,
  StepsOptions,
  UseStepFormProps,
  WithStepFields,
} from '@saas-ui/forms'
import { zodFieldResolver, zodResolver } from './zod-resolver'
import { AnyZodObject, z } from 'zod'
import React from 'react'

type ResolverArgs = Parameters<typeof zodResolver>

export interface CreateZodStepFormProps<FieldDefs>
  extends CreateStepFormProps<FieldDefs> {
  schemaOptions?: ResolverArgs[1]
  resolverOptions?: ResolverArgs[2]
}

type InferStepType<T extends Required<StepsOptions<AnyZodObject>>> = T extends [
  infer Step,
  ...infer Rest
]
  ? Step extends { schema: AnyZodObject }
    ? z.infer<Step['schema']> &
        (Rest extends Required<StepsOptions<AnyZodObject>>
          ? InferStepType<Rest>
          : object)
    : object
  : object

type ZodStepFormType<
  FieldDefs,
  ExtraProps = object,
  ExtraOverrides = object
> = (<
  TSteps extends Required<StepsOptions<AnyZodObject>> = Required<
    StepsOptions<AnyZodObject>
  >,
  TFieldValues extends InferStepType<TSteps> = InferStepType<TSteps>,
  TContext extends object = object
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

export const createZodStepForm = <FieldDefs>(
  options?: CreateZodStepFormProps<FieldDefs>
) => {
  const ZodStepForm = createStepForm<any, any, any>({
    resolver: (schema: any) =>
      zodResolver(schema, options?.schemaOptions, options?.resolverOptions),
    fieldResolver: zodFieldResolver,
    ...options,
  })

  ZodStepForm.displayName = 'ZodStepForm'
  ZodStepForm.id = 'ZodStepForm'

  return ZodStepForm as ZodStepFormType<FieldDefs>
}
