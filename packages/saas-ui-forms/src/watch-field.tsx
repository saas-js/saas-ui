import { FieldValues, useWatch } from 'react-hook-form'
import { useFormContext, UseFormReturn } from './form-context'

export interface WatchFieldProps<
  Value = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
> {
  name: string
  defaultValue?: Value
  isDisabled?: boolean
  isExact?: boolean
  children: (
    value: Value,
    form: UseFormReturn<TFieldValues, TContext>
  ) => React.ReactElement | void
}

export const WatchField = <
  Value = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
>(
  props: WatchFieldProps<Value, TFieldValues, TContext>
) => {
  const { name, defaultValue, isDisabled, isExact } = props
  const form = useFormContext<TFieldValues, TContext>()

  const field = useWatch({
    name,
    defaultValue,
    disabled: isDisabled,
    exact: isExact,
  })

  return props.children(field, form) || null
}
