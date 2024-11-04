import { forwardRef } from 'react'

import type { SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react'
import { Spinner as ChakraSpinner } from '@chakra-ui/react'

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
