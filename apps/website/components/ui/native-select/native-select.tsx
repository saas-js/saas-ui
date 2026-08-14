'use client'

import * as React from 'react'
import type { ComponentType } from 'react'

import { NativeSelect as Select } from '@chakra-ui/react/native-select'

import { ChevronDownIcon } from '../../icons/chevron-down-icon'

type NativeSelectFieldProps = React.ComponentProps<typeof Select.Field>

type NativeSelectControlledFieldProps = Pick<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  | 'defaultValue'
  | 'form'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'required'
  | 'value'
>

type NativeSelectFieldWithNativeProps = Omit<
  NativeSelectFieldProps,
  keyof NativeSelectControlledFieldProps
> &
  NativeSelectControlledFieldProps

const Field = Select.Field as ComponentType<NativeSelectFieldWithNativeProps>

export type NativeSelectProps = Omit<
  Select.RootProps,
  keyof NativeSelectControlledFieldProps
> &
  NativeSelectControlledFieldProps & {
    icon?: React.ReactNode
    placeholder?: string
    fieldProps?: Omit<
      NativeSelectFieldWithNativeProps,
      'children' | 'placeholder'
    >
  }

export const NativeSelect = React.forwardRef<HTMLDivElement, NativeSelectProps>(
  function NativeSelect(props, ref) {
    const {
      icon = <ChevronDownIcon />,
      placeholder,
      children,
      fieldProps,
      defaultValue = fieldProps?.defaultValue,
      form = fieldProps?.form,
      name = fieldProps?.name,
      onBlur = fieldProps?.onBlur,
      onChange = fieldProps?.onChange,
      required = fieldProps?.required,
      value = fieldProps?.value,
      ...rest
    } = props
    return (
      <Select.Root ref={ref} {...rest}>
        <Field
          {...fieldProps}
          defaultValue={defaultValue}
          form={form}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
        >
          {children}
        </Field>
        <Select.Indicator>{icon}</Select.Indicator>
      </Select.Root>
    )
  },
)
