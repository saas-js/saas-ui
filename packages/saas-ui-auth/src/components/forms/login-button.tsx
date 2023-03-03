import * as React from 'react'

import { Button, ButtonProps, useTheme } from '@chakra-ui/react'

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

LoginButton.displayName = 'LoginButton'
