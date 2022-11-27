import * as React from 'react'
import { __DEV__ } from '@chakra-ui/utils'
import {
  useFormContext,
  useWatch,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'

export interface DisplayIfProps<
  TFieldValues extends FieldValues = FieldValues
> {
  children: React.ReactElement
  name: string
  defaultValue?: unknown
  isDisabled?: boolean
  isExact?: boolean
  condition?: (value: unknown, context: UseFormReturn<TFieldValues>) => boolean
}

export const DisplayIf = <TFieldValues extends FieldValues = FieldValues>({
  children,
  name,
  defaultValue,
  isDisabled,
  isExact,
  condition = (value) => !!value,
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

if (__DEV__) {
  DisplayIf.displayName = 'DisplayIf'
}
