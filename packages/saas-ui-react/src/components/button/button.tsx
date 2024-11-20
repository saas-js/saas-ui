import { forwardRef } from 'react'

import type { ButtonProps as ButtonPrimitiveProps } from '@chakra-ui/react'
import {
  AbsoluteCenter,
  Button as ButtonPrimitive,
  Span,
  Spinner,
} from '@chakra-ui/react'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ButtonPrimitiveProps, ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      loading,
      disabled,
      loadingText,
      children,
      variant = 'glass',
      colorPalette = variant === 'glass' ? 'accent' : 'gray',
      ...rest
    } = props
    return (
      <ButtonPrimitive
        colorPalette={colorPalette}
        disabled={loading || disabled}
        variant={variant as any}
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
      </ButtonPrimitive>
    )
  },
)
