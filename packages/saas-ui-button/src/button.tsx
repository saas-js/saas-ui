import * as React from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button'

import { forwardRef } from '@chakra-ui/system'

export interface ButtonProps extends ChakraButtonProps {
  label?: React.ReactNode
  isPrimary?: boolean
  isSecondary?: boolean
}

export const Button = forwardRef<ButtonProps, typeof ChakraButton>(
  ({ label, isPrimary, isSecondary, children, ...props }, ref) => {
    let colorScheme
    if (isPrimary) {
      colorScheme = 'primary'
    }
    if (isSecondary) {
      colorScheme = 'secondary'
    }
    return (
      <ChakraButton ref={ref} colorScheme={colorScheme} {...props}>
        {label || children}
      </ChakraButton>
    )
  },
)
