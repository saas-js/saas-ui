import {
  FieldValues,
  useFormContext,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'

export interface WatchFieldProps<
  Value = unknown,
  TFieldValues extends FieldValues = FieldValues
> {
  name: string
  defaultValue?: Value
  isDisabled?: boolean
  isExact?: boolean
  children: (
    value: Value,
    form: UseFormReturn<TFieldValues>
  ) => React.ReactElement | void
}

export const WatchField = <
  Value = unknown,
  TFieldValues extends FieldValues = FieldValues
>(
  props: WatchFieldProps<Value, TFieldValues>
) => {
  const { name, defaultValue, isDisabled, isExact } = props
  const form = useFormContext<TFieldValues>()

  const field = useWatch({
    name,
    defaultValue,
    disabled: isDisabled,
    exact: isExact,
  })

  return props.children(field, form) || null
}
