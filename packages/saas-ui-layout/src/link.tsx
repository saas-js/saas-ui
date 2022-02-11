import * as React from 'react'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

import { useLink } from '@saas-ui/provider'

/**
 * Chakra UI `Link` component wrapped in a router specific link component.
 * Falls back to a plain `Link` if no Saas UI context is available or no `linkComponent` is configured
 * The router link component can be configured in `SaasProvider`.
 *
 */
export const Link: React.FC<LinkProps> = (props) => {
  const LinkWrapper = useLink()

  const { href, ...rest } = props

  const link = <ChakraLink href={href} {...rest} />

  if (LinkWrapper) {
    return <LinkWrapper href={href}>{link}</LinkWrapper>
  }

  return link
}
