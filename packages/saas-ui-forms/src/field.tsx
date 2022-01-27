import * as React from 'react'
import { useFormContext, FormState, Controller, get } from 'react-hook-form'

import {
  forwardRef,
  Box,
  FormControl,
  FormControlProps,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Checkbox,
  Switch,
  useMergeRefs,
} from '@chakra-ui/react'

import { NumberInput } from '@saas-ui/number-input'
import { PasswordInput } from '@saas-ui/password-input'
import { RadioInput } from '@saas-ui/radio'
import { PinInput } from '@saas-ui/pin-input'
import { Select, NativeSelect } from '@saas-ui/select'

export interface FieldProps extends Omit<FormControlProps, 'label'> {
  /**
   * The field name
   */
  name: string
  /**
   * The field label
   */
  label?: string
  /**
   * Hide the field label
   */
  hideLabel?: boolean
  /**
   * Field help text
   */
  help?: string
  /**
   * React hook form rules
   */
  rules?: any
  /**
   * Options used for selects and radio fields
   */
  options?: any
  /**
   * The field type
   * Build-in types:
   * - text
   * - number
   * - password
   * - textarea
   * - select
   * - nativeselect
   * - checkbox
   * - radio
   * - switch
   * - pin
   *
   * Will default to a text field if there is no matching type.
   * @default 'text'
   */
  type?: string
  /**
   * The input placeholder
   */
  placeholder?: string
}

const inputTypes: Record<string, any> = {}

const defaultInputType = 'text'

const getInput = (type: string) => {
  return inputTypes[type] || inputTypes[defaultInputType]
}

const getError = (name: string, formState: FormState<{ [x: string]: any }>) => {
  return get(formState.errors, name)
}

const isTouched = (
  name: string,
  formState: FormState<{ [x: string]: any }>
) => {
  return get(formState.touchedFields, name)
}

export const BaseField: React.FC<FieldProps> = (props) => {
  const { name, label, help, variant, hideLabel, children, ...controlProps } =
    props

  const { formState } = useFormContext()

  const error = getError(name, formState)

  return (
    <FormControl isInvalid={!!error} variant={variant} {...controlProps}>
      {label && !hideLabel ? (
        <FormLabel variant={variant}>{label}</FormLabel>
      ) : null}
      <Box>
        {children}
        {help && !error?.message ? (
          <FormHelperText>{help}</FormHelperText>
        ) : null}
        {error?.message && (
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        )}
      </Box>
    </FormControl>
  )
}

export const Field = forwardRef<FieldProps, typeof FormControl>(
  (props, ref) => {
    const { type = defaultInputType } = props
    const InputComponent = getInput(type)

    return <InputComponent ref={ref} {...props} />
  }
)

interface CreateFieldProps {
  displayName: string
  hideLabel?: boolean
  BaseField: React.FC<any>
}

const createField = (
  InputComponent: React.FC<any>,
  { displayName, hideLabel, BaseField }: CreateFieldProps
) => {
  const Field = forwardRef<FieldProps, typeof FormControl>((props, ref) => {
    const {
      label,
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
      variant,
      ...inputProps
    } = props

    return (
      <BaseField
        label={label}
        hideLabel={hideLabel}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        variant={variant}
      >
        <InputComponent ref={ref} label={label} {...inputProps} />
      </BaseField>
    )
  })
  Field.displayName = displayName

  return Field
}

export const withControlledInput = (InputComponent: any) => {
  return forwardRef(({ name, rules, ...inputProps }, ref) => {
    const { control } = useFormContext()

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { ref: _ref, ...field } }) => (
          <InputComponent
            {...field}
            {...inputProps}
            ref={useMergeRefs(ref, _ref)}
          />
        )}
      />
    )
  })
}

export const withUncontrolledInput = (InputComponent: any) => {
  return forwardRef(({ name, rules, ...inputProps }, ref) => {
    const { register } = useFormContext()

    const { ref: _ref, ...field } = register(name, rules)

    return (
      <InputComponent
        {...field}
        {...inputProps}
        ref={useMergeRefs(ref, _ref)}
      />
    )
  })
}

export interface RegisterFieldTypeOptions {
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
 * @param options.hideLabel Hide the field label, for example for checkbox or switch field.
 */
export const registerFieldType = (
  type: string,
  component: any,
  options?: RegisterFieldTypeOptions
) => {
  let InputComponent
  if (options?.isControlled) {
    InputComponent = withControlledInput(component)
  } else {
    InputComponent = withUncontrolledInput(component)
  }

  const Field = createField(InputComponent, {
    displayName: `${type
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')}Field`,
    hideLabel: options?.hideLabel,
    BaseField: options?.BaseField || BaseField,
  })

  inputTypes[type] = Field

  return Field
}

// @todo Consider not registering all fields by default to lower the package size and computations.
// Not all types may be required in a project.
export const InputField = registerFieldType('text', Input)
export const NumberInputField = registerFieldType('number', NumberInput, {
  isControlled: true,
})
export const PasswordInputFIeld = registerFieldType('password', PasswordInput)
export const TextareaField = registerFieldType('textarea', Textarea)
export const SwitchField = registerFieldType(
  'switch',
  forwardRef(({ label, ...props }: { label?: string }, ref) => {
    return (
      <Switch ref={ref} {...props}>
        {label}
      </Switch>
    )
  }),
  {
    isControlled: true,
    hideLabel: true,
  }
)
export const SelectField = registerFieldType('select', Select, {
  isControlled: true,
})
export const CheckboxField = registerFieldType(
  'checkbox',
  forwardRef(({ label, ...props }: { label?: string }, ref) => {
    return (
      <Checkbox ref={ref} {...props}>
        {label}
      </Checkbox>
    )
  }),
  {
    hideLabel: true,
  }
)
export const RadioField = registerFieldType('radio', RadioInput, {
  isControlled: true,
})
export const PinField = registerFieldType('pin', PinInput, {
  isControlled: true,
})
export const NativeSelectField = registerFieldType(
  'native-select',
  NativeSelect,
  { isControlled: true }
)
