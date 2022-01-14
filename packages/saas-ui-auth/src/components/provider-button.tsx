import * as React from 'react'

import { useTheme } from '@chakra-ui/react'

import { Button, ButtonProps } from '@saas-ui/button'

export function ProviderButton({ children, ...rest }: ButtonProps) {
  const theme = useTheme()

  const defaultProps = {
    p: 6,
    variant: 'outline',
    ...theme.components.ProviderButton?.defaultProps,
  }

  return (
    <Button {...defaultProps} {...rest}>
      {children}
    </Button>
  )
}
