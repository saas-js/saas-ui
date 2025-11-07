import { forwardRef, useEffectEvent, useMemo } from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { cx } from '@saas-ui/core/utils'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import {
  type DefaultValues,
  type FieldErrors,
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
import type { FieldProps, FocusableElement } from './types'
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
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  Form: React.FC<Omit<FormProps<TFieldValues, TContext>, 'form'>>
  Field: React.FC<FieldProps<TFieldValues>> & {
    ref?: React.Ref<FocusableElement>
  }
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

  const stableOnSubmit = useEffectEvent((data: TTransformedValues) =>
    onSubmit(data),
  )
  const stableOnInvalid = useEffectEvent((errors: FieldErrors<TFieldValues>) =>
    onInvalid?.(errors),
  )

  return useMemo(() => {
    const extendedForm = form as any

    extendedForm.submit = form.handleSubmit(stableOnSubmit, stableOnInvalid)
    extendedForm.Form = function FormAPI(props: Omit<FormProps, 'form'>) {
      return (
        <Form
          {...props}
          form={form}
          onSubmit={props.onSubmit ?? extendedForm.submit}
        />
      )
    }

    extendedForm.Field = Field
    extendedForm.DisplayIf = DisplayIf
    extendedForm.ArrayField = ArrayField
    extendedForm.ObjectField = ObjectField

    return extendedForm as UseFormReturn<
      TFieldValues,
      TContext,
      TTransformedValues
    >
  }, [form])
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
  TSchema extends z.ZodObject<any>,
  TFieldValues extends InferObjectSchema<TSchema> = InferObjectSchema<TSchema>,
  TContext extends object = object,
> extends Omit<UseHookFormProps<TFieldValues, TContext>, 'defaultValues'> {
  schema: TSchema
  onSubmit: SubmitHandler<TFieldValues>
  onInvalid?: SubmitErrorHandler<FieldValues>
  defaultValues?: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>
}

type InferObjectSchema<T extends z.ZodTypeAny> = z.infer<T>

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>
