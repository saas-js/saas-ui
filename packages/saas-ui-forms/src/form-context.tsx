import * as React from 'react'
import {
  FormProvider as HookFormProvider,
  FormProviderProps as HookFormProviderProps,
  useFormContext as useHookFormContext,
  FieldValues,
} from 'react-hook-form'
import { FieldResolver } from './field-resolver'
import { BaseFieldProps, FieldProps } from './types'

export type FormContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
> = {
  fieldResolver?: FieldResolver
  schema?: TSchema
  fields?: {
    [key: string]: unknown
  }
}

export type FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
> = HookFormProviderProps<TFieldValues, TContext> & {
  fieldResolver?: FieldResolver
  schema?: TSchema
  fields?: {
    [key: string]: unknown
  }
}

const FormContext = React.createContext<FormContextValue | null>(null)

export const useFormContext = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
>() => {
  const context = React.useContext(FormContext)
  const hookContext = useHookFormContext()

  if (!context) {
    throw new Error('FormProvider must be used within a Form component')
  }

  return {
    ...hookContext,
    ...context,
  }
}

export const useFieldProps = <TFieldValues extends FieldValues = FieldValues>(
  name: string
): BaseFieldProps<TFieldValues> | undefined => {
  const parsedName = name?.replace(/\.[0-9]/g, '.$')
  const context = useFormContext()
  return (context?.fields?.[parsedName] as any) || {}
}

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
> = ReturnType<typeof useFormContext>

export const FormProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
>(
  props: FormProviderProps<TFieldValues, TContext, TSchema>
) => {
  const { children, fieldResolver, schema, fields, ...rest } = props
  return (
    <HookFormProvider {...rest}>
      <FormContext.Provider value={{ fieldResolver, schema, fields }}>
        {children}
      </FormContext.Provider>
    </HookFormProvider>
  )
}
