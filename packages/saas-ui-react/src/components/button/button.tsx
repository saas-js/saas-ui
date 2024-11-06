import { forwardRef } from 'react'

import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from '@chakra-ui/react'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      loading,
      disabled,
      loadingText,
      children,
      variant,
      colorPalette = variant === 'primary' ? 'accent' : 'gray',
      ...rest
    } = props
    return (
      <ChakraButton
        colorPalette={colorPalette}
        disabled={loading || disabled}
        variant={variant}
        ref={ref}
        {...rest}
      >
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    )
  },
)
