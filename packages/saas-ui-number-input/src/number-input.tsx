import * as React from 'react'

import {
  forwardRef,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps as ChakraNumberInputProps,
} from '@chakra-ui/react'

interface NumberInputOptions {
  hideStepper?: boolean
}

export interface NumberInputProps
  extends ChakraNumberInputProps,
    NumberInputOptions {}

export const NumberInput = forwardRef<NumberInputProps, 'div'>((props, ref) => {
  return (
    <ChakraNumberInput {...props} ref={ref}>
      <NumberInputField />

      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  )
})
