import * as React from 'react'

import {
  forwardRef,
  Input,
  Textarea,
  Checkbox,
  Switch,
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

import { NumberInput, NumberInputProps } from './number-input'
import { PasswordInput, PasswordInputProps } from './password-input'
import { RadioInput, RadioInputProps } from './radio'

import {
  Select,
  SelectButton,
  SelectList,
  SelectProps,
  NativeSelect,
  NativeSelectProps,
  SelectButtonProps,
  SelectListProps,
} from './select'

import { createField } from './create-field'

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

export interface TextareaFieldProps extends TextareaProps {}

export const TextareaField = createField<TextareaFieldProps>(Textarea)

export interface SwitchFieldProps extends SwitchProps {}

export const SwitchField = createField<SwitchFieldProps>(
  forwardRef(({ type, value, ...rest }, ref) => {
    return <Switch isChecked={!!value} {...rest} ref={ref} />
  }),
  {
    isControlled: true,
  }
)

export interface SelectFieldProps extends SelectProps<boolean> {
  buttonProps?: SelectButtonProps
  listProps?: SelectListProps
}

export const SelectField = createField<SelectFieldProps>(
  forwardRef((props, ref) => {
    const { buttonProps, listProps, ...rest } = props

    return (
      <Select ref={ref} {...rest}>
        <SelectButton {...buttonProps} />
        <SelectList {...listProps} />
      </Select>
    )
  }),
  {
    isControlled: true,
  }
)

export type CheckboxFieldProps = CheckboxProps

export const CheckboxField = createField<CheckboxFieldProps>(
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

export type RadioFieldProps = RadioInputProps

export const RadioField = createField<RadioFieldProps>(RadioInput, {
  isControlled: true,
})

export type NativeSelectFieldProps = NativeSelectProps

export const NativeSelectField = createField<NativeSelectFieldProps>(
  NativeSelect,
  {
    isControlled: true,
  }
)

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
  time: InputField,
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

export type DefaultFields = typeof defaultFieldTypes
