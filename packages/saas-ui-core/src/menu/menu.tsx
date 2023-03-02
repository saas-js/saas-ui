import * as React from 'react'
import {
  forwardRef,
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from '@chakra-ui/react'
import { useLink } from '../provider'

export interface MenuItemProps extends ChakraMenuItemProps {
  /**
   * MenuItem label
   * Children always takes precedence over this prop.
   */
  label?: React.ReactNode
  /**
   * Wraps the item with the link wrapper configured in SaasProvider.
   */
  href?: string
}

export const MenuItem = forwardRef<MenuItemProps, typeof ChakraMenuItem>(
  ({ label, href, children, ...props }, ref) => {
    const LinkWrapper = useLink()

    const item = (
      <ChakraMenuItem ref={ref} {...props}>
        {children || label}
      </ChakraMenuItem>
    )

    if (href) {
      return <LinkWrapper href={href}>{item}</LinkWrapper>
    }

    return item
  }
)

MenuItem.displayName = 'MenuItem'
