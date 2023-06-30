import * as React from 'react'

import { chakra, HTMLChakraProps } from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

export interface Web3AddressProps extends HTMLChakraProps<'span'> {
  address: string
  startLength?: number
  endLength?: number
}
/**
 * Display Web3 addresses in a more readable format.
 *
 * @see Docs https://saas-ui.dev/docs/components/web3/address
 */
export const Web3Address: React.FC<Web3AddressProps> = (props) => {
  const { address, startLength = 6, endLength = 4, ...rest } = props
  const start = address.slice(0, startLength)
  const end = address.slice(address.length - endLength, address.length)

  return (
    <chakra.span {...rest} className={cx('sui-web3-address', props.className)}>
      {start}...{end}
    </chakra.span>
  )
}

Web3Address.displayName = 'Web3Address'
