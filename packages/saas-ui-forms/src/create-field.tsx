import React, {
  type ForwardRefRenderFunction,
  type PropsWithoutRef,
  forwardRef,
} from 'react'

import { callAll, mergeRefs, splitProps } from '@saas-ui/core/utils'
import { Controller, type RegisterOptions } from 'react-hook-form'

import { BaseField } from './base-field'
import { useFieldsContext } from './fields-context'
import { useFormContext } from './form-context'
import { BaseFieldProps, GetBaseField } from './types'

interface CreateFieldProps<ExtraFieldProps extends object = object> {
  displayName: string
  hideLabel?: boolean
  getBaseField: GetBaseField<ExtraFieldProps>
}

const _createField = (
  InputComponent: React.FC<any>,
  { displayName, hideLabel, getBaseField: getBaseFieldProp }: CreateFieldProps,
) => {
  const Field = forwardRef<HTMLDivElement, any>((props, ref) => {
    const { id, name, label, isRequired, rules } = props

    const inputRules = {
      required: isRequired,
      ...rules,
    }

    const fieldContext = useFieldsContext()

    const getBaseField = fieldContext?.getBaseField ?? getBaseFieldProp

    const { extraProps, BaseField } = React.useMemo(
      () => getBaseField(),
      [getBaseField],
    )

    const [, inputProps] = splitProps(
      props,
      [
        'children',
        'name',
        'label',
        'required',
        'disabled',
        'invalid',
        'readOnly',
        'help',
        'hideLabel',
      ].concat(extraProps),
    )

    return (
      <BaseField name={name} hideLabel={hideLabel} {...props}>
        <InputComponent
          ref={ref}
          id={id}
          name={name}
          label={hideLabel ? label : undefined} // Only pass down the label when it should be inline.
          {...inputProps}
          rules={inputRules}
        />
      </BaseField>
    )
  })

  Field.displayName = displayName

  return Field
}

const withControlledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<typeof InputComponent, ControlProps>((props, ref) => {
    const { name, rules, ...inputProps } = props
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
            onChange={callAll(onChange, field.onChange)}
            onBlur={callAll(inputProps.onBlur, field.onBlur)}
            ref={mergeRefs(ref, _ref)}
          />
        )}
      />
    )
  })
}

const withUncontrolledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<typeof InputComponent, ControlProps>(
    ({ name, rules, ...inputProps }, ref) => {
      const { register } = useFormContext()

      const { ref: _ref, ...field } = register(name, rules)

      const onChange = inputProps.onChange as (...event: any[]) => void

      return (
        <InputComponent
          {...field}
          {...inputProps}
          onChange={callAll(onChange, field.onChange)}
          onBlur={callAll(inputProps.onBlur, field.onBlur)}
          ref={mergeRefs(ref, _ref)}
        />
      )
    },
  )
}

export interface CreateFieldOptions {
  isControlled?: boolean
  hideLabel?: boolean
  BaseField?: React.FC<any>
}

interface ControlProps {
  name: string
  onChange: (...event: any[]) => void
  onBlur: (...event: any[]) => void
  value: unknown
  disabled?: boolean
  rules?: RegisterOptions
}

/**
 * Register a new field type
 * @param type The name for this field in kebab-case, eg `email` or `array-field`
 * @param component The React component
 * @param options
 * @param options.isControlled Set this to true if this is a controlled field.
 * @param options.hideLabel Hide the field label, for example for the checkbox field.
 */
export const createField = <TType = unknown, TProps extends object = object>(
  component: ForwardRefRenderFunction<
    TType,
    PropsWithoutRef<TProps & ControlProps>
  >,
  options?: CreateFieldOptions,
) => {
  let InputComponent
  if (options?.isControlled) {
    InputComponent = withControlledInput(forwardRef(component))
  } else {
    InputComponent = withUncontrolledInput(forwardRef(component))
  }

  const Field = _createField(InputComponent, {
    displayName: `${component.displayName ?? 'Custom'}Field`,
    hideLabel: options?.hideLabel,
    getBaseField: () => ({
      extraProps: [],
      BaseField,
    }),
  }) as React.FC<Omit<BaseFieldProps, keyof TProps> & TProps>

  return Field
}
