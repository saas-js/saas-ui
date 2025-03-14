import React from 'react'

import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react/link'

import { useLink } from '../../provider'

export type { LinkProps }

/**
 * Chakra UI `Link` component wrapped in a router specific link component.
 * Falls back to a plain `Link` if no Saas UI context is available or no `linkComponent` is configured
 * The router link component can be configured in `SaasProvider`.
 * @see https://saas-ui.dev/docs/core/getting-started
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const LinkComponent = useLink()

    return (
      <ChakraLink asChild>
        <LinkComponent ref={ref} {...props} />
      </ChakraLink>
    )
  },
)

Link.displayName = 'Link'
