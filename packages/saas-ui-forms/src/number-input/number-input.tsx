import * as React from 'react'

import {
  forwardRef,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputFieldProps,
} from '@chakra-ui/react'

import { ChevronDownIcon, ChevronUpIcon } from '@saas-ui/core'

interface NumberInputOptions {
  /**
   * Hide the stepper.
   */
  hideStepper?: boolean
  /**
   * Render a custom increment icon.
   */
  incrementIcon?: React.ReactNode
  /**
   * Render a custom decrement icon.
   */
  decrementIcon?: React.ReactNode
  /**
   * The placeholder text when no value is selected.
   */
  placeholder?: string
  /**
   * Props to pass to the NumberInputField component.
   */
  fieldProps?: NumberInputFieldProps
}

export interface NumberInputProps
  extends ChakraNumberInputProps,
    NumberInputOptions {}

export const NumberInput = forwardRef<NumberInputProps, 'div'>((props, ref) => {
  const {
    hideStepper = false,
    incrementIcon = <ChevronUpIcon />,
    decrementIcon = <ChevronDownIcon />,
    placeholder,
    fieldProps: _fieldProps,
    ...rest
  } = props

  const fieldProps = { placeholder, ..._fieldProps }

  return (
    <ChakraNumberInput {...rest} ref={ref}>
      <NumberInputField {...fieldProps} />

      {!hideStepper && (
        <NumberInputStepper>
          <NumberIncrementStepper children={incrementIcon} />
          <NumberDecrementStepper children={decrementIcon} />
        </NumberInputStepper>
      )}
    </ChakraNumberInput>
  )
})

NumberInput.displayName = 'NumberInput'
