'use client'

import * as React from 'react'

import { createListCollection } from '@chakra-ui/react'

import { Select } from 'compositions/ui/select/index'

import { useFieldContext } from '../form-context'
import { getErrorText } from '../utils'
import { FieldRoot } from './field-root'
import type { BaseFieldProps } from './types'

export interface SelectFieldOption {
  label: string
  value: string
}

/** A list of select options. */
export type FieldOptions = SelectFieldOption[]

export interface SelectFieldProps extends BaseFieldProps {
  options: SelectFieldOption[]
  multiple?: boolean
  placeholder?: string
}

/**
 * Select field backed by the Chakra 3 collection API. Adapts the scalar field
 * value (single select) to the array value the underlying `Select` expects.
 */
export function SelectField(props: SelectFieldProps) {
  const {
    label,
    help,
    orientation,
    required,
    rootProps,
    options,
    multiple,
    placeholder,
  } = props

  const field = useFieldContext<string | string[]>()
  const errorText = getErrorText(field.state.meta.errors)
  const invalid = field.state.meta.isTouched && !!errorText

  const collection = React.useMemo(
    () => createListCollection({ items: options }),
    [options],
  )

  const value = multiple
    ? ((field.state.value as string[] | undefined) ?? [])
    : field.state.value
      ? [field.state.value as string]
      : []

  return (
    <FieldRoot
      label={label}
      help={help}
      orientation={orientation}
      required={required}
      rootProps={rootProps}
      invalid={invalid}
      errorText={errorText}
    >
      <Select.Root
        name={field.name}
        multiple={multiple}
        collection={collection}
        value={value}
        onValueChange={({ value }) =>
          field.handleChange(multiple ? value : (value[0] ?? ''))
        }
        onInteractOutside={() => field.handleBlur()}
      >
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content portalled={false}>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </FieldRoot>
  )
}
