import * as React from 'react'

import { useTheme } from '@chakra-ui/react'
import { SubmitButton, SubmitButtonProps } from '@saas-ui/forms'

export const LoginButton: React.FC<SubmitButtonProps> = (props) => {
  const { children, ...rest } = props
  const theme = useTheme()

  const defaultProps = {
    h: '10',
    variant: 'solid',
    colorScheme: 'primary',
    ...theme.components?.LoginButton?.defaultProps,
  }

  return (
    <SubmitButton {...defaultProps} {...rest}>
      {children}
    </SubmitButton>
  )
}

LoginButton.displayName = 'LoginButton'
