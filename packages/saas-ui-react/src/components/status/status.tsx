import { forwardRef } from 'react'

import { Status as ChakraStatus, type Token } from '@chakra-ui/react'

export type StatusTokens = Extract<Token, `colors.status.${string}`>

export interface StatusProps extends ChakraStatus.RootProps {
  /**
   * The status value, used to determine the color of the status
   * colors can be configured as semantic tokens under the `colors.status` key.
   */
  value?: StatusTokens extends never ? string : StatusTokens
}

/**
 * Status component
 */
export const Status = forwardRef<HTMLDivElement, StatusProps>(
  function Status(props, ref) {
    const { children, value, ...rest } = props

    const color = value ? `status.${value}` : undefined

    return (
      <ChakraStatus.Root ref={ref} bg={color} {...rest}>
        <ChakraStatus.Indicator />
        {children}
      </ChakraStatus.Root>
    )
  },
)
