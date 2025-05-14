import * as React from 'react'

import { FieldValues, RegisterOptions } from 'react-hook-form'

import { InputField } from './default-fields'
import { useField } from './fields-context'
import { useFieldProps } from './form-context'
import { FieldProps, type FocusableElement } from './types'

export type FieldRules = Pick<
  RegisterOptions,
  'required' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern'
>

const defaultInputType = 'text'

/**
 * Form field component.
 * 
 * Build-in types:
 * text, number, password, textarea, select, native-select, checkbox, radio, switch, pin
 *
 * Will default to a text field if there is no matching type.

 * @see Docs https://saas-ui.dev/docs/components/forms/field
 */
export const Field = React.forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: FieldProps<TFieldValues>,
    ref: React.ForwardedRef<FocusableElement>,
  ) => {
    const { type = defaultInputType, name } = props
    const overrides = useFieldProps(name)
    const InputComponent = useField(overrides?.type || type, InputField)

    return <InputComponent ref={ref} {...props} {...overrides} />
  },
) as (<TFieldValues extends FieldValues>(
  props: FieldProps<TFieldValues> & {
    ref?: React.ForwardedRef<FocusableElement>
  },
) => React.ReactElement) & {
  displayName?: string
}
