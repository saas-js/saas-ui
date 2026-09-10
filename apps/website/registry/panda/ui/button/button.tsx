import { type ComponentProps, forwardRef } from 'react'

import { type PolymorphicProps, ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda-preset/jsx'
import { button } from '@saas-ui/panda-preset/recipes'

import { Spinner } from '../spinner'
import { HTMLSuiProps } from '../types'

export interface ButtonProps extends ComponentProps<typeof StyledButton> {}

export const StyledButton = styled(ark.button, button)

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps
  extends HTMLSuiProps<'button'>,
    PolymorphicProps,
    ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props
    return (
      <StyledButton
        colorPalette={'gray'}
        disabled={loading || disabled}
        ref={ref}
        {...rest}
      >
        {loading && !loadingText ? (
          <>
            <div
              style={{
                display: 'inline-flex',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spinner color="inherit" />
            </div>
            <span style={{ opacity: 0 }}>{children}</span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </StyledButton>
    )
  },
)
