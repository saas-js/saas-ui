import * as React from 'react'
import {
  useFormContext,
  useWatch,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'

export interface DisplayIfProps<TFieldValues> {
  children: React.ReactElement
  name: string
  defaultValue?: unknown
  isDisabled?: boolean
  isExact?: boolean
  condition: (value: unknown, context: UseFormReturn<TFieldValues>) => boolean
}

export const DisplayIf = <TFieldValues extends FieldValues = FieldValues>({
  children,
  name,
  defaultValue,
  isDisabled,
  isExact,
  condition,
}: DisplayIfProps<TFieldValues>) => {
  const value = useWatch({
    name,
    defaultValue,
    disabled: isDisabled,
    exact: isExact,
  })
  const context = useFormContext<TFieldValues>()
  return condition(value, context) ? children : null
}
