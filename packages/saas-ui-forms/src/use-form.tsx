import {
  type FieldValues,
  UseFormProps as UseHookFormProps,
  useForm as useHookForm,
} from 'react-hook-form'

import { Field } from './field.tsx'

export interface UseFormProps<
  TFieldValues extends FieldValues,
  TContext extends object,
> extends UseHookFormProps<TFieldValues, TContext> {}

export function useForm<
  TFieldValues extends FieldValues,
  TContext extends object,
>(props: UseFormProps<TFieldValues, TContext> = {}) {
  const form = useHookForm<TFieldValues, TContext>(props)

  return {
    ...form,
    Field,
  }
}
