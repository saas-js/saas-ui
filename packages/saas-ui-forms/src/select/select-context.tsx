import {
  HTMLChakraProps,
  useControllableState,
  useFormControl,
} from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import React from 'react'
import { FieldOptions } from '../types'
import { mapOptions } from '../utils'
import { SelectOption } from './select'

export const [SelectProvider, useSelectContext] = createContext<
  ReturnType<typeof useSelect>
>({
  strict: true,
})

export interface SelectOptions {
  name: string
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
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
