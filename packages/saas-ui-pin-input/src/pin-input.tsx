import * as React from 'react'
import {
  forwardRef,
  PinInput as ChakraPinInput,
  PinInputProps as ChakraPinInputProps,
  PinInputField,
  HStack,
} from '@chakra-ui/react'

import { __DEV__ } from '@chakra-ui/utils'

interface PinInputOptions {
  pinLength?: number
}

export interface PinInputProps extends ChakraPinInputProps, PinInputOptions {}

export const PinInput = forwardRef<PinInputProps, 'div'>((props, ref) => {
  const { pinLength = 4, ...inputProps } = props

  const inputs: React.ReactNode[] = []
  for (let i = 0; i < pinLength; i++) {
    inputs.push(<PinInputField key={i} ref={ref} />)
  }

  return (
    <HStack>
      <ChakraPinInput {...inputProps}>{inputs}</ChakraPinInput>
    </HStack>
  )
})

PinInput.defaultProps = {
  pinLength: 4,
}

if (__DEV__) {
  PinInput.displayName = 'PinInput'
}
