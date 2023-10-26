import * as React from 'react'
import { Controller } from 'react-hook-form'

import { forwardRef, useMergeRefs } from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { BaseFieldProps, FieldProps } from './types'
import { BaseField } from './base-field'
import { useFormContext } from './form-context'

interface CreateFieldProps {
  displayName: string
  hideLabel?: boolean
  BaseField: React.FC<any>
}

const _createField = (
  InputComponent: React.FC<any>,
  { displayName, hideLabel, BaseField }: CreateFieldProps
) => {
  const Field = forwardRef((props, ref) => {
    const {
      id,
      name,
      label,
      help,
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
      rules,
      ...inputProps
    } = props

    const inputRules = {
      required: isRequired,
      ...rules,
    }

    return (
      <BaseField
        id={id}
        name={name}
        label={label}
        help={help}
        hideLabel={hideLabel}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        <InputComponent
          ref={ref}
          id={id}
          name={name}
          label={hideLabel ? label : undefined} // Only pass down the label when it should be inline.
          rules={inputRules}
          {...inputProps}
        />
      </BaseField>
    )
  })

  Field.displayName = displayName

  return Field
}

const withControlledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<FieldProps, typeof InputComponent>(
    ({ name, rules, ...inputProps }, ref) => {
      const { control } = useFormContext()

      const onChange = inputProps.onChange as (...event: any[]) => void

      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { ref: _ref, ...field } }) => (
            <InputComponent
              {...field}
              {...inputProps}
              onChange={callAllHandlers(onChange, field.onChange)}
              onBlur={callAllHandlers(inputProps.onBlur, field.onBlur)}
              ref={useMergeRefs(ref, _ref)}
            />
          )}
        />
      )
    }
  )
}

const withUncontrolledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<FieldProps, typeof InputComponent>(
    ({ name, rules, ...inputProps }, ref) => {
      const { register } = useFormContext()

      const { ref: _ref, ...field } = register(name, rules)

      const onChange = inputProps.onChange as (...event: any[]) => void

      return (
        <InputComponent
          {...field}
          {...inputProps}
          onChange={callAllHandlers(onChange, field.onChange)}
          onBlur={callAllHandlers(inputProps.onBlur, field.onBlur)}
          ref={useMergeRefs(ref, _ref)}
        />
      )
    }
  )
}

export interface CreateFieldOptions {
  isControlled?: boolean
  hideLabel?: boolean
  BaseField?: React.FC<any>
}

/**
 * Register a new field type
 * @param type The name for this field in kebab-case, eg `email` or `array-field`
 * @param component The React component
 * @param options
 * @param options.isControlled Set this to true if this is a controlled field.
 * @param options.hideLabel Hide the field label, for example for the checkbox field.
 */
export const createField = <TProps extends object>(
  component: React.FC<TProps>,
  options?: CreateFieldOptions
) => {
  let InputComponent
  if (options?.isControlled) {
    InputComponent = withControlledInput(component)
  } else {
    InputComponent = withUncontrolledInput(component)
  }

  const Field = _createField(InputComponent, {
    displayName: `${component.displayName ?? 'Custom'}Field`,
    hideLabel: options?.hideLabel,
    BaseField: options?.BaseField || BaseField,
  }) as React.FC<Omit<BaseFieldProps, keyof TProps> & TProps>

  return Field
}
