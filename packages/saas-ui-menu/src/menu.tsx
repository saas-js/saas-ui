import * as React from 'react'
import {
  forwardRef,
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from '@chakra-ui/react'

import { useLink } from '@saas-ui/provider'

export interface MenuItemProps extends ChakraMenuItemProps {
  label?: string
  href?: string
}

export const MenuItem = forwardRef<MenuItemProps, typeof ChakraMenuItem>(
  ({ label, href, children, ...props }, ref) => {
    const LinkWrapper = useLink()

    const item = (
      <ChakraMenuItem ref={ref} {...props}>
        {label || children}
      </ChakraMenuItem>
    )

    if (href) {
      return <LinkWrapper href={href}>{item}</LinkWrapper>
    }

    return item
  }
)
