import * as React from 'react'
import { Link as ChakraLink, LinkProps, forwardRef } from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'
import { useLink } from '@saas-ui/provider'

export type { LinkProps }

/**
 * Chakra UI `Link` component wrapped in a router specific link component.
 * Falls back to a plain `Link` if no Saas UI context is available or no `linkComponent` is configured
 * The router link component can be configured in `SaasProvider`.
 *
 */
export const Link = forwardRef<LinkProps, 'a'>((props, ref) => {
  const LinkWrapper = useLink()

  const { href, ...rest } = props

  const link = <ChakraLink ref={ref} href={href} {...rest} />

  if (LinkWrapper) {
    return <LinkWrapper href={href}>{link}</LinkWrapper>
  }

  return link
})

if (__DEV__) {
  Link.displayName = 'Link'
}
