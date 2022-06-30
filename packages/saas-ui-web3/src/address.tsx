import * as React from 'react'

import { chakra, HTMLChakraProps } from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

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
    <chakra.span {...rest} className={cx('saas-web3-address', props.className)}>
      {start}...{end}
    </chakra.span>
  )
}

if (__DEV__) {
  Web3Address.displayName = 'Web3Address'
}
