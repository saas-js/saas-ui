import { forwardRef, useMemo } from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cx } from '@saas-ui/core/utils'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import {
  type DefaultValues,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  UseFormProps as UseHookFormProps,
  type UseFormReturn as UseHookFormReturn,
  useForm as useHookForm,
} from 'react-hook-form'
import type { z } from 'zod'

import { ArrayField, type ArrayFieldProps } from './array-field'
import { DisplayIf, type DisplayIfProps } from './display-if'
import { Field } from './field.tsx'
import { FormProvider } from './form-context'
import { ObjectField, type ObjectFieldProps } from './object-field'
import type { FieldProps } from './types'
import type { UseArrayFieldReturn } from './use-array-field'

export type { StandardSchemaV1 } from '@standard-schema/spec'

export interface UseFormProps<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends UseHookFormProps<TFieldValues, TContext, TTransformedValues> {
  schema?: StandardSchemaV1<TFieldValues, TTransformedValues>
  onSubmit: SubmitHandler<TTransformedValues>
  onInvalid?: SubmitErrorHandler<FieldValues>
}

export interface UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends UseHookFormReturn<TFieldValues, TContext, TTransformedValues> {
  Form: React.FC<Omit<FormProps<TFieldValues, TContext>, 'form'>>
  Field: React.FC<FieldProps<TFieldValues>>
  DisplayIf: React.FC<DisplayIfProps<TFieldValues>>
  ArrayField: React.FC<
    ArrayFieldProps<TFieldValues> & React.RefAttributes<UseArrayFieldReturn>
  >
  ObjectField: React.FC<ObjectFieldProps<TFieldValues>>
}

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(props: UseFormProps<TFieldValues, TContext, TTransformedValues>) {
  const { onSubmit, onInvalid, resolver, ...rest } = props

  const form = useHookForm<TFieldValues, TContext, TTransformedValues>({
    ...rest,
    resolver: props.schema
      ? standardSchemaResolver<TFieldValues, TContext, TTransformedValues>(
          props.schema,
        )
      : resolver,
  })

  const FormComponent = useMemo(
    () =>
      forwardRef<HTMLFormElement, Omit<FormProps, 'form'>>(
        function FormComponent(props, ref) {
          return (
            <Form
              {...props}
              form={form}
              onSubmit={
                props.onSubmit ?? form.handleSubmit(onSubmit, onInvalid)
              }
              ref={ref}
            />
          )
        },
      ),
    [form, onSubmit, onInvalid],
  )

  const submit = useMemo(() => {
    return form.handleSubmit(onSubmit, onInvalid)
  }, [form, onSubmit, onInvalid])

  return {
    ...form,
    submit,
    Form: FormComponent,
    Field,
    DisplayIf,
    ArrayField,
    ObjectField,
  } as UseFormReturn<TFieldValues, TContext, TTransformedValues>
}

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends HTMLChakraProps<'form'> {
  children: React.ReactNode
  form: ReturnType<
    typeof useHookForm<TFieldValues, TContext, TTransformedValues>
  >
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  function Form(props, ref) {
    const { children, form, ...rest } = props
    return (
      <FormProvider {...form}>
        <chakra.form
          ref={ref}
          {...rest}
          className={cx('sui-form', props.className)}
        >
          {props.children}
        </chakra.form>
      </FormProvider>
    )
  },
) as <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(
  props: FormProps<TFieldValues, TContext, TTransformedValues> & {
    ref?: React.Ref<HTMLFormElement>
  },
) => React.ReactElement

export interface UseZodFormProps<
  TSchema extends
    | z.AnyZodObject
    | z.ZodEffects<z.AnyZodObject> = z.AnyZodObject,
  TFieldValues extends InferObjectSchema<TSchema> = InferObjectSchema<TSchema>,
  TContext extends object = object,
> extends Omit<UseHookFormProps<TFieldValues, TContext>, 'defaultValues'> {
  schema: TSchema
  onSubmit: SubmitHandler<TFieldValues>
  onInvalid?: SubmitErrorHandler<FieldValues>
  defaultValues?: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>
}

/**
 * @deprecated Use useForm instead, which supports standard schema out of the box.
 */
export function useZodForm<
  TSchema extends
    | z.AnyZodObject
    | z.ZodEffects<z.AnyZodObject> = z.AnyZodObject,
  TFieldValues extends InferObjectSchema<TSchema> = InferObjectSchema<TSchema>,
  TContext extends object = object,
>(props: UseZodFormProps<TSchema, TFieldValues, TContext>) {
  const { schema, ...rest } = props

  return useForm<TFieldValues, TContext>({
    resolver: zodResolver(schema as any),
    ...rest,
  })
}

type InferObjectSchema<T extends z.ZodTypeAny | z.ZodEffects<z.ZodTypeAny>> =
  T extends z.ZodEffects<infer TSchema> ? z.infer<TSchema> : z.infer<T>

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>
