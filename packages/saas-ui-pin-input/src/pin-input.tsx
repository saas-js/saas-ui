import * as React from 'react'
import {
  forwardRef,
  PinInput as ChakraPinInput,
  UsePinInputProps,
  PinInputField,
  HStack,
  SystemProps,
} from '@chakra-ui/react'

import { __DEV__ } from '@chakra-ui/utils'

interface PinInputOptions {
  /**
   * The pin length.
   */
  pinLength?: number
  /**
   * Spacing between the inputs.
   */
  spacing?: SystemProps['margin']
}

export interface PinInputProps extends UsePinInputProps, PinInputOptions {}

/**
 * @deprecated
 */
export const PinInput = forwardRef<PinInputProps, 'div'>((props, ref) => {
  const { pinLength = 4, spacing, ...inputProps } = props

  const inputs: React.ReactNode[] = []
  for (let i = 0; i < pinLength; i++) {
    inputs.push(<PinInputField key={i} ref={ref} />)
  }

  return (
    <HStack spacing={spacing}>
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
