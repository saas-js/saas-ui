import * as React from 'react'
import {
  useWatch,
  FieldValues,
  UseFormReturn,
  FieldPath,
} from 'react-hook-form'

import { useFormContext } from './form-context'

export interface DisplayIfProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  children: React.ReactElement
  name: TName
  defaultValue?: unknown
  isDisabled?: boolean
  isExact?: boolean
  condition?: (value: unknown, context: UseFormReturn<TFieldValues>) => boolean
  onToggle?: (
    conditionMatched: boolean,
    context: UseFormReturn<TFieldValues>
  ) => void
}
/**
 * Conditionally render parts of a form.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 */
export const DisplayIf = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  children,
  name,
  defaultValue,
  isDisabled,
  isExact,
  condition = (value) => !!value,
  onToggle,
}: DisplayIfProps<TFieldValues, TName>) => {
  const initializedRef = React.useRef(false)
  const matchesRef = React.useRef(false)

  const value = useWatch<TFieldValues>({
    name,
    defaultValue: defaultValue as any,
    disabled: isDisabled,
    exact: isExact,
  })
  const context = useFormContext() as any

  const matches = condition(value, context)

  React.useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      return
    }
    if (matchesRef.current === matches) return
    matchesRef.current = matches
    onToggle?.(matches, context)
  }, [value])

  return matches ? children : null
}

DisplayIf.displayName = 'DisplayIf'
