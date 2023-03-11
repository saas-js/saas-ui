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
  TextareaProps,
  SwitchProps,
  CheckboxProps,
  PinInputField,
  HStack,
  PinInput,
  UsePinInputProps,
  SystemProps,
} from '@chakra-ui/react'
import { FocusableElement, callAllHandlers } from '@chakra-ui/utils'

import { NumberInput, NumberInputProps } from './number-input'
import { PasswordInput, PasswordInputProps } from './password-input'
import { RadioInput, RadioInputProps } from './radio'

import { Select, SelectProps, NativeSelect, NativeSelectProps } from './select'
import { createContext } from '@chakra-ui/react-utils'

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
   * Build-in types:
   * text, number, password, textarea, select, native-select, checkbox, radio, switch, pin
   *
   * Will default to a text field if there is no matching type.
   */
  type?: string
  /**
   * The input placeholder
   */
  placeholder?: string
}

const defaultInputType = 'text'

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
  const { name, label, help, hideLabel, children, ...controlProps } = props

  const { formState } = useFormContext()

  const error = getError(name, formState)

  return (
    <FormControl {...controlProps} isInvalid={!!error}>
      {label && !hideLabel ? <FormLabel>{label}</FormLabel> : null}
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

BaseField.displayName = 'BaseField'

const FieldsContext = React.createContext<Record<string, React.FC<any>> | null>(
  null
)

export const FieldsProvider: React.FC<{
  value: Record<string, React.FC<any>>
  children: React.ReactNode
}> = (props) => {
  const fields = { ...defaultFieldTypes, ...props.value }
  return (
    <FieldsContext.Provider value={fields}>
      {props.children}
    </FieldsContext.Provider>
  )
}

export const useField = (type: string): React.FC<any> => {
  const context = React.useContext(FieldsContext)
  return context?.[type] || InputField
}

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
    ref: React.ForwardedRef<FocusableElement>
  ) => {
    const { type = defaultInputType } = props
    const InputComponent = useField(type)
    return <InputComponent ref={ref} {...props} />
  }
) as (<TFieldValues extends FieldValues>(
  props: FieldProps<TFieldValues> & {
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

      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { ref: _ref, ...field } }) => (
            <InputComponent
              {...field}
              {...inputProps}
              onChange={callAllHandlers(inputProps.onChange, field.onChange)}
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

      return (
        <InputComponent
          {...field}
          {...inputProps}
          onChange={callAllHandlers(inputProps.onChange, field.onChange)}
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
  }) as React.FC<TProps & FieldProps>

  return Field
}

export interface InputFieldProps extends InputProps {
  type?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

export const InputField = createField<InputFieldProps>(
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

export const NumberInputField = createField<NumberInputFieldProps>(
  NumberInput,
  {
    isControlled: true,
  }
)

export const PasswordInputField = createField<PasswordInputProps>(
  forwardRef((props, ref) => <PasswordInput ref={ref} {...props} />)
)

export const TextareaField = createField<TextareaProps>(Textarea)

export const SwitchField = createField<SwitchProps>(
  forwardRef(({ type, value, ...rest }, ref) => {
    return <Switch isChecked={!!value} {...rest} ref={ref} />
  }),
  {
    isControlled: true,
  }
)

export const SelectField = createField<SelectProps>(Select, {
  isControlled: true,
})

export const CheckboxField = createField<CheckboxProps>(
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

export const RadioField = createField<RadioInputProps>(RadioInput, {
  isControlled: true,
})

export const NativeSelectField = createField<NativeSelectProps>(NativeSelect, {
  isControlled: true,
})

export interface PinFieldProps extends Omit<UsePinInputProps, 'type'> {
  pinLength?: number
  pinType?: 'alphanumeric' | 'number'
  spacing?: SystemProps['margin']
}

export const PinField = createField<PinFieldProps>(
  forwardRef((props, ref) => {
    const { pinLength = 4, pinType, spacing, ...inputProps } = props

    const inputs: React.ReactNode[] = []
    for (let i = 0; i < pinLength; i++) {
      inputs.push(<PinInputField key={i} ref={ref} />)
    }

    return (
      <HStack spacing={spacing}>
        <PinInput {...inputProps} type={pinType}>
          {inputs}
        </PinInput>
      </HStack>
    )
  }),
  {
    isControlled: true,
  }
)

export const defaultFieldTypes = {
  text: InputField,
  email: InputField,
  url: InputField,
  phone: InputField,
  number: NumberInputField,
  password: PasswordInputField,
  textarea: TextareaField,
  switch: SwitchField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  pin: PinField,
  'native-select': NativeSelectField,
}
