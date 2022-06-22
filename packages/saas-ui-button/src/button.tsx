import * as React from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button'
import { __DEV__ } from '@chakra-ui/utils'
import { forwardRef } from '@chakra-ui/system'

export interface ButtonProps extends ChakraButtonProps {
  /**
   * The button label, can be used as alternative to children.
   * Children always take precedence.
   */
  label?: React.ReactNode
}

export const Button = forwardRef<ButtonProps, typeof ChakraButton>(
  ({ label, children, ...props }, ref) => {
    return (
      <ChakraButton ref={ref} {...props}>
        {children || label}
      </ChakraButton>
    )
  }
)

if (__DEV__) {
  Button.displayName = 'Button'
}
