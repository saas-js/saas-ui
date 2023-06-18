import {
  HTMLChakraProps,
  createStylesContext,
  useControllableState,
  useFormControl,
} from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import React from 'react'
import { FieldOptions } from '../types'
import { mapOptions } from '../utils'
import { SelectOption } from './select'

export const [SelectStylesProvider, useSelectStyles] =
  createStylesContext('SuiSelect')

export const [SelectProvider, useSelectContext] = createContext<
  ReturnType<typeof useSelect>
>({
  strict: true,
})

export interface SelectOptions {
  /**
   * The name of the input field in a native form.
   */
  name: string
  /**
   * The value of the select field.
   */
  value?: string | string[]
  /**
   * The initial value of the select field.
   */
  defaultValue?: string | string[]
  /**
   * The callback invoked when the value of the select field changes.
   * @param value The value of the select field.
   */
  onChange?: (value: string | string[]) => void
  /**
   * The placeholder text when there's no value.
   */
  placeholder?: string
  /**
   * If `true`, the select will be disabled.
   */
  isDisabled?: boolean
  /**
   * An array of options
   * If you leave this empty the children prop will be rendered.
   */
  options?: FieldOptions<SelectOption>
  /**
   * Enable multiple select.
   */
  multiple?: boolean
  /**
   * The function used to render the value of the select field.
   * @param value The value of the select field.
   * @returns The rendered value.
   */
  renderValue?: (value: string | string[]) => React.ReactNode
}

export const useSelect = (props: SelectOptions) => {
  const {
    name,
    value,
    defaultValue,
    onChange,
    multiple,
    placeholder,
    options: optionsProp,
    isDisabled,
    renderValue = (value) =>
      typeof value === 'string' ? value : value?.join(', '),
  } = props
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  })

  const controlProps = useFormControl({ name } as HTMLChakraProps<'input'>)

  const options = React.useMemo(
    () => optionsProp && mapOptions(optionsProp),
    [optionsProp]
  )

  const handleChange = (value: string | string[]) => {
    setCurrentValue(value)
  }

  const getDisplayValue = React.useCallback(
    (value: string) => {
      if (!options) {
        return value
      }

      for (const option of options) {
        if (option.value === value) {
          return option.label || option.value
        }
      }

      return value
    },
    [options]
  )

  const displayValue = React.useMemo(
    () =>
      currentValue
        ? (Array.isArray(currentValue) ? currentValue : [currentValue]).map(
            getDisplayValue
          )
        : [],
    [currentValue, getDisplayValue]
  )

  return {
    defaultValue,
    value: currentValue,
    displayValue,
    renderValue,
    onChange: handleChange,
    options,
    multiple,
    controlProps,
    placeholder,
    isDisabled,
  }
}
