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
import { ObjectField } from './object-field'
import { ArrayField } from './array-field'

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

export interface SelectFieldProps extends SelectProps {
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

export type DefaultFields = typeof defaultFieldTypes
