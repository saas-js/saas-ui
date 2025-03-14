import { forwardRef } from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { cx } from '@saas-ui/core/utils'
import {
  type DefaultValues,
  type FieldValues,
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

export interface UseFormProps<
  TFieldValues extends FieldValues,
  TContext extends object,
> extends UseHookFormProps<TFieldValues, TContext> {}

export interface UseFormReturn<
  TFieldValues extends FieldValues,
  TContext extends object,
> extends UseHookFormReturn<TFieldValues, TContext> {
  Form: React.FC<Omit<FormProps<TFieldValues, TContext>, 'form'>>
  Field: React.FC<FieldProps<TFieldValues>>
  DisplayIf: React.FC<DisplayIfProps<TFieldValues>>
  ArrayField: React.FC<
    ArrayFieldProps<TFieldValues> & React.RefAttributes<UseArrayFieldReturn>
  >
  ObjectField: React.FC<ObjectFieldProps<TFieldValues>>
}

export function useForm<
  TFieldValues extends FieldValues,
  TContext extends object,
>(props: UseFormProps<TFieldValues, TContext> = {}) {
  const form = useHookForm<TFieldValues, TContext>(props)

  const FormComponent = forwardRef<HTMLFormElement, Omit<FormProps, 'form'>>(
    function FormComponent(props, ref) {
      return <Form {...props} form={form} ref={ref} />
    },
  )

  return {
    ...form,
    Form: FormComponent,
    Field,
    DisplayIf,
    ArrayField,
    ObjectField,
  } as UseFormReturn<TFieldValues, TContext>
}

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
> extends HTMLChakraProps<'form'> {
  children: React.ReactNode
  form: ReturnType<typeof useHookForm<TFieldValues, TContext>>
  onSubmit: (data: any) => void
  onError?: (errors: any) => void
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  function Form(props, ref) {
    const { children, form, onSubmit, onError, ...rest } = props
    return (
      <FormProvider {...form}>
        <chakra.form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit, onError)}
          {...rest}
          className={cx('sui-form', props.className)}
        >
          {props.children}
        </chakra.form>
      </FormProvider>
    )
  },
) as <TFieldValues extends FieldValues, TContext extends object>(
  props: FormProps<TFieldValues, TContext> & {
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
  defaultValues?:
    | DefaultValues<InferObjectSchema<TSchema>>
    | AsyncDefaultValues<InferObjectSchema<TSchema>>
}

export function useZodForm<
  TSchema extends
    | z.AnyZodObject
    | z.ZodEffects<z.AnyZodObject> = z.AnyZodObject,
  TFieldValues extends InferObjectSchema<TSchema> = InferObjectSchema<TSchema>,
  TContext extends object = object,
>(props: UseZodFormProps<TSchema, TFieldValues, TContext>) {
  const { schema, ...rest } = props

  return useForm({
    resolver: zodResolver(schema) as any,
    ...rest,
  })
}

type InferObjectSchema<T extends z.ZodTypeAny | z.ZodEffects<z.ZodTypeAny>> =
  T extends z.ZodEffects<infer TSchema> ? z.infer<TSchema> : z.infer<T>

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>
