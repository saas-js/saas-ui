import * as React from 'react'

import { chakra, HTMLChakraProps } from '@chakra-ui/react'

export interface Web3AddressProps extends HTMLChakraProps<'span'> {
  address: string
  startLength?: number
  endLength?: number
}

export const Web3Address: React.FC<Web3AddressProps> = (props) => {
  const { address, startLength = 6, endLength = 4, ...rest } = props
  const start = address.slice(0, startLength)
  const end = address.slice(address.length - endLength, address.length)

  return (
    <chakra.span {...rest}>
      {start}...{end}
    </chakra.span>
  )
}
