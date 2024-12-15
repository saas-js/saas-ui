import React, { useMemo } from 'react'

import {
  Input,
  InputProps,
  Stack,
  type SystemStyleObject,
  Textarea,
  TextareaProps,
  createListCollection,
} from '@chakra-ui/react'
import { Checkbox, type CheckboxProps } from '@saas-ui/react/checkbox'
import { InputGroup } from '@saas-ui/react/input-group'
import { NumberInput, type NumberInputProps } from '@saas-ui/react/number-input'
import {
  PasswordInput,
  type PasswordInputProps,
} from '@saas-ui/react/password-input'
import { PinInput, type PinInputProps } from '@saas-ui/react/pin-input'
import { Radio, RadioGroup, type RadioGroupProps } from '@saas-ui/react/radio'
import { Select } from '@saas-ui/react/select'
import { Switch, type SwitchProps } from '@saas-ui/react/switch'

import { createField } from './create-field.tsx'
import type { FieldOption, FieldOptions } from './types.ts'

export interface InputFieldProps extends InputProps {
  type?: string
  startElement?: React.ReactNode
  endElement?: React.ReactNode
}

export const InputField = createField<HTMLInputElement, InputFieldProps>(
  ({ type = 'text', startElement, endElement, size, ...rest }, ref) => {
    return (
      <InputGroup
        startElement={startElement}
        endElement={endElement}
        width="full"
      >
        <Input type={type} size={size} {...rest} ref={ref} />
      </InputGroup>
    )
  },
)

export interface NumberInputFieldProps extends NumberInputProps {
  type: 'number'
}

export const NumberInputField = createField<
  HTMLInputElement,
  NumberInputFieldProps
>((props, ref) => <NumberInput {...props} ref={ref} />, {
  isControlled: true,
})

export const PasswordInputField = createField<
  HTMLInputElement,
  PasswordInputProps
>(({ type = 'password', ...props }, ref) => (
  <PasswordInput ref={ref} {...props} />
))

export interface TextareaFieldProps extends TextareaProps {}

export const TextareaField = createField<
  HTMLTextAreaElement,
  TextareaFieldProps
>((props, ref) => <Textarea {...props} ref={ref} />)

export interface SwitchFieldProps extends SwitchProps {
  type: 'switch'
}

export const SwitchField = createField<HTMLInputElement, SwitchFieldProps>(
  ({ type, value, ...rest }, ref) => {
    return <Switch checked={!!value} {...rest} ref={ref} />
  },
  {
    isControlled: true,
  },
)

export interface SelectFieldProps<Multiple extends boolean = boolean>
  extends Omit<
    Select.RootProps<FieldOption>,
    'collection' | 'value' | 'multiple' | 'onChange' | 'onValueChange'
  > {
  multiple?: Multiple
  value?: Multiple extends true ? Array<string> : string
  onChange?: (value: Multiple extends true ? Array<string> : string) => void
  options: FieldOptions
  placeholder?: string
  triggerProps?: Select.TriggerProps
  contentProps?: Select.ContentProps
}

export const SelectField = createField<HTMLDivElement, SelectFieldProps>(
  (props, ref) => {
    const {
      triggerProps,
      contentProps,
      options,
      placeholder,
      onChange,
      onBlur,
      multiple = false,
      value: valueProp,
      ...rest
    } = props

    const collection = useMemo(
      () =>
        createListCollection({
          items: options,
        }),
      [options],
    )

    const value = multiple
      ? [...(valueProp ?? [])]
      : valueProp
        ? [valueProp as string]
        : []

    return (
      <Select.Root
        ref={ref}
        collection={collection}
        onValueChange={(details) => {
          onChange(multiple ? details.value : details.value[0])
        }}
        onInteractOutside={() => onBlur()}
        value={value}
        {...rest}
      >
        <Select.Trigger {...triggerProps}>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content {...contentProps}>
          {collection.items.map((option) => (
            <Select.Item key={option.value} item={option}>
              {option.label || option.value}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    )
  },
  {
    isControlled: true,
  },
)

export interface CheckboxFieldProps extends CheckboxProps {
  type: 'checkbox'
  label?: string
}

export const CheckboxField = createField<HTMLInputElement, CheckboxFieldProps>(
  ({ label, type, ...props }, ref) => {
    return (
      <Checkbox ref={ref} {...props}>
        {label}
      </Checkbox>
    )
  },
  {
    hideLabel: true,
  },
)

export interface RadioFieldProps extends RadioGroupProps {
  type: 'radio'
  options: FieldOptions
  flexDirection?: SystemStyleObject['flexDirection']
  gap?: SystemStyleObject['gap']
}

export const RadioField = createField<HTMLInputElement, RadioFieldProps>(
  (props, ref) => {
    const { options, onChange, flexDirection = 'column', gap, ...rest } = props
    return (
      <RadioGroup
        ref={ref}
        onValueChange={({ value }) => {
          onChange?.(value)
        }}
        {...rest}
      >
        <Stack flexDirection={flexDirection} gap={gap}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label || option.value}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    )
  },
  {
    isControlled: true,
  },
)

export interface PinFieldProps
  extends Omit<PinInputProps, 'type' | 'value' | 'onChange'> {
  type: 'pin'
  pinLength?: number
  pinType?: PinInputProps['type']
  value?: string
  onChange?: (value: string) => void
}

export const PinField = createField<HTMLInputElement, PinFieldProps>(
  (props, ref) => {
    const { pinType, value: valueProp, onChange, ...inputProps } = props

    const value = valueProp?.split('') || []

    return (
      <PinInput
        ref={ref}
        {...inputProps}
        value={value}
        onValueChange={(details) => {
          onChange(details.valueAsString)
        }}
        type={pinType}
      />
    )
  },
  {
    isControlled: true,
  },
)

export const defaultFieldTypes = {
  text: InputField,
  email: InputField,
  url: InputField,
  phone: InputField,
  time: InputField,
  number: NumberInputField,
  pin: PinField,
  checkbox: CheckboxField,
  radio: RadioField,
  password: PasswordInputField,
  select: SelectField,
  switch: SwitchField,
  textarea: TextareaField,
}

export type DefaultFields = typeof defaultFieldTypes
