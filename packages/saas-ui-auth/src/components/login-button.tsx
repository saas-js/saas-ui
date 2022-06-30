import * as React from 'react'

import { useTheme } from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'
import { Button, ButtonProps } from '@saas-ui/button'

export const LoginButton: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props
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

if (__DEV__) {
  LoginButton.displayName = 'LoginButton'
}
