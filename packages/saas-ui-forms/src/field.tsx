import * as React from 'react'
import {
  useFormContext,
  FormState,
  Controller,
  get,
  RegisterOptions,
  FieldValues,
  FieldPath,
} from 'react-hook-form'

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
  InputGroup,
  InputProps,
  NumberInputProps,
  TextareaProps,
  SwitchProps,
  CheckboxProps,
  PinInputProps,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import { NumberInput } from '@saas-ui/number-input'
import { PasswordInput, PasswordInputProps } from '@saas-ui/password-input'
import { RadioInput, RadioInputProps } from '@saas-ui/radio'
import { PinInput } from '@saas-ui/pin-input'
import {
  Select,
  SelectProps,
  NativeSelect,
  NativeSelectProps,
} from '@saas-ui/select'
import { FocusableElement } from '@chakra-ui/utils'

export interface Option {
  value: string
  label?: string
  [key: string]: unknown
}

export type FieldRules = Pick<
  RegisterOptions,
  'required' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern'
>

export interface FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormControlProps, 'label' | 'type'> {
  /**
   * The field name
   */
  name: TName
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
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  /**
   * The field type
   * Build-in types:
   * - text
   * - number
   * - password
   * - textarea
   * - select
   * - native-select
   * - checkbox
   * - radio
   * - switch
   * - pin
   *
   * Will default to a text field if there is no matching type.
   * @default 'text'
   */
  type?: keyof FieldTypes | string
  /**
   * The input placeholder
   */
  placeholder?: string
}

const inputTypes: Record<string, React.FC<any>> = {}

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
    <FormControl variant={variant} {...controlProps} isInvalid={!!error}>
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

if (__DEV__) {
  BaseField.displayName = 'BaseField'
}

export type As<Props = any> = React.ElementType<Props>

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  type?: FieldTypes
}

export const Field = React.forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: FieldProps<TFieldValues> & FieldTypeProps,
    ref: React.ForwardedRef<FocusableElement>
  ) => {
    const { type = defaultInputType } = props
    const InputComponent = getInput(type)

    return <InputComponent ref={ref} {...props} />
  }
) as (<TFieldValues extends FieldValues>(
  props: FieldProps<TFieldValues> &
    FieldTypeProps & {
      ref?: React.ForwardedRef<FocusableElement>
    }
) => React.ReactElement) & {
  displayName?: string
}

interface CreateFieldProps {
  displayName: string
  hideLabel?: boolean
  BaseField: React.FC<any>
}

const createField = (
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
      isOptional,
      rules,
      variant,
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
        isOptional={isOptional}
        variant={variant}
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

export const withControlledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<FieldProps, typeof InputComponent>(
    ({ name, rules, ...inputProps }, ref) => {
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
    }
  )
}

export const withUncontrolledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<FieldProps, typeof InputComponent>(
    ({ name, rules, ...inputProps }, ref) => {
      const { register } = useFormContext()

      const { ref: _ref, ...field } = register(name, rules)

      return (
        <InputComponent
          {...field}
          {...inputProps}
          ref={useMergeRefs(ref, _ref)}
        />
      )
    }
  )
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
 * @param options.hideLabel Hide the field label, for example for the checkbox field.
 */
export const registerFieldType = <T extends object>(
  type: string,
  component: React.FC<T>,
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
  }) as React.FC<T & FieldProps>

  inputTypes[type] = Field

  return Field
}

export interface InputFieldProps extends InputProps {
  type?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

export const InputField = registerFieldType<InputFieldProps>(
  'text',
  forwardRef(({ type = 'text', leftAddon, rightAddon, size, ...rest }, ref) => {
    const input = <Input type={type} size={size} {...rest} ref={ref} />
    if (leftAddon || rightAddon) {
      return (
        <InputGroup size={size}>
          {leftAddon}
          {input}
          {rightAddon}
        </InputGroup>
      )
    }
    return input
  })
)

export interface NumberInputFieldProps extends NumberInputProps {
  type: 'number'
}

export const NumberInputField = registerFieldType<NumberInputFieldProps>(
  'number',
  NumberInput,
  {
    isControlled: true,
  }
)
export const PasswordInputField = registerFieldType<PasswordInputProps>(
  'password',
  PasswordInput
)
export const TextareaField = registerFieldType<TextareaProps>(
  'textarea',
  Textarea
)
export const SwitchField = registerFieldType<SwitchProps>(
  'switch',
  forwardRef(({ type, ...rest }, ref) => {
    return <Switch {...rest} ref={ref} />
  }),
  {
    isControlled: true,
  }
)
export const SelectField = registerFieldType<SelectProps>('select', Select, {
  isControlled: true,
})

export const CheckboxField = registerFieldType<CheckboxProps>(
  'checkbox',
  forwardRef(({ label, type, ...props }, ref) => {
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
export const RadioField = registerFieldType<RadioInputProps>(
  'radio',
  RadioInput,
  {
    isControlled: true,
  }
)
export const PinField = registerFieldType<PinInputProps>('pin', PinInput, {
  isControlled: true,
})
export const NativeSelectField = registerFieldType<NativeSelectProps>(
  'native-select',
  NativeSelect,
  { isControlled: true }
)

const fieldTypes = {
  text: InputField,
  email: InputField,
  url: InputField,
  number: NumberInputField,
  password: PasswordInputField,
  textarea: TextareaField,
  switch: SwitchField,
  checkbox: CheckboxField,
  radio: RadioField,
  pin: PinField,
  select: SelectField,
  'native-select': NativeSelectField,
}

type FieldTypes = typeof fieldTypes

type FieldTypeProps =
  | {
      [Property in keyof FieldTypes]: PropsOf<FieldTypes[Property]> & {
        type: Property
      }
    }[keyof FieldTypes]
  | { type?: string }
