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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'

import { ChevronDownIcon, ChevronUpIcon } from '@saas-ui/core'

interface NumberInputOptions {
  /**
   * Hide the stepper. This will be true when `rightAddon` is provided.
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
  /**
   * Either `InputLeftAddon` or `InputLeftElement`
   */
  leftAddon?: React.ReactNode
  /**
   * Either `InputRightAddon` or `InputRightElement`
   */
  rightAddon?: React.ReactNode
}

const Input = forwardRef<NumberInputFieldProps, 'input'>((props, ref) => (
  <NumberInputField ref={ref} {...props} />
))
Input.displayName = 'NumberInputField'
Input.id = 'Input'

export interface NumberInputProps
  extends ChakraNumberInputProps,
    NumberInputOptions {}

export const NumberInput = forwardRef<NumberInputProps, 'div'>((props, ref) => {
  const {
    hideStepper = false,
    incrementIcon = <ChevronUpIcon />,
    decrementIcon = <ChevronDownIcon />,
    leftAddon,
    rightAddon,
    placeholder,
    fieldProps: _fieldProps,
    ...rest
  } = props

  const fieldProps = { placeholder, ..._fieldProps }

  return (
    <ChakraNumberInput {...rest} ref={ref}>
      <InputGroup>
        {leftAddon}
        <Input {...fieldProps} />
        {rightAddon}
      </InputGroup>
      {!hideStepper && !rightAddon ? (
        <NumberInputStepper>
          <NumberIncrementStepper children={incrementIcon} />
          <NumberDecrementStepper children={decrementIcon} />
        </NumberInputStepper>
      ) : null}
    </ChakraNumberInput>
  )
})

NumberInput.displayName = 'NumberInput'
