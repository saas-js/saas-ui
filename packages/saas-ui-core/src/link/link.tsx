import { Link as ChakraLink, LinkProps, forwardRef } from '@chakra-ui/react'
import { useLink } from '../provider'

export type { LinkProps }

/**
 * Chakra UI `Link` component wrapped in a router specific link component.
 * Falls back to a plain `Link` if no Saas UI context is available or no `linkComponent` is configured
 * The router link component can be configured in `SaasProvider`.
 * @see https://saas-ui.dev/docs/core/getting-started
 */
export const Link = forwardRef<LinkProps, 'a'>((props, ref) => {
  const LinkComponent = useLink()

  const { href, ...rest } = props

  return <ChakraLink as={LinkComponent} ref={ref} href={href} {...rest} />
})

Link.displayName = 'Link'
