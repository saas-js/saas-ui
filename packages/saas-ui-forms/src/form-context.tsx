import { createContext, useContext } from 'react'
import {
  FormProvider as HookFormProvider,
  FormProviderProps as HookFormProviderProps,
  useFormContext as useHookFormContext,
  FieldValues,
} from 'react-hook-form'
import { FieldResolver } from './field-resolver'

export type FormContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
> = {
  fieldResolver?: FieldResolver
  schema?: TSchema
}

export type FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
> = HookFormProviderProps<TFieldValues, TContext> & {
  fieldResolver?: FieldResolver
  schema?: TSchema
}

const FormContext = createContext<FormContextValue | null>(null)

export const useFormContext = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema = any
>() => {
  const context = useContext(FormContext)
  const hookContext = useHookFormContext()

  if (!context) {
    throw new Error('FormProvider must be used within a Form component')
  }

  return {
    ...hookContext,
    ...context,
  }
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
  const { children, fieldResolver, schema, ...rest } = props
  return (
    <HookFormProvider {...rest}>
      <FormContext.Provider value={{ fieldResolver, schema }}>
        {children}
      </FormContext.Provider>
    </HookFormProvider>
  )
}
