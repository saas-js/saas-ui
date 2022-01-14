import * as React from 'react'

import { useTheme } from '@chakra-ui/react'

import { Button, ButtonProps } from '@saas-ui/button'

export function LoginButton({ children, ...rest }: ButtonProps) {
  const theme = useTheme()

  const defaultProps = {
    p: 6,
    colorScheme: 'gray',
    ...theme.components.LoginButton?.defaultProps,
  }

  return (
    <Button {...defaultProps} {...rest}>
      {children}
    </Button>
  )
}
