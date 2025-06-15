import { forwardRef } from 'react'

import { Spinner as ChakraSpinner } from '@chakra-ui/react/spinner'
import type { SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react/spinner'

export interface SpinnerProps extends ChakraSpinnerProps {
  loading?: boolean
  children?: React.ReactNode
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(props, ref) {
    const { loading, children, ...rest } = props

    if (loading === false) {
      return <>{children}</>
    }

    return <ChakraSpinner ref={ref} {...rest} />
  },
)
