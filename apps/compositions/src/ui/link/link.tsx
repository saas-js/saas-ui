'use client'

import * as React from 'react'

import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react'

import { useLink } from 'compositions/lib/use-link/use-link'

export type { LinkProps }

/**
 * A Chakra Link rendered through the router component configured by Provider.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { children, ...rest } = props
    const LinkComponent = useLink()

    return (
      <ChakraLink asChild {...rest}>
        <LinkComponent ref={ref}>{children}</LinkComponent>
      </ChakraLink>
    )
  },
)
