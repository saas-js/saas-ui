'use client'

import { forwardRef } from 'react'

import { useLink } from 'compositions/lib/use-link/use-link'
import type { HTMLChakraProps } from '@chakra-ui/react'
import type { SlotRecipeProps } from '@saas-ui/chakra-preset'
import type { NavbarVariantProps } from '@saas-ui/chakra-preset/slot-recipes/navbar'
import { Navbar } from '@saas-ui/react/navbar'

import { withContext, withProvider } from './navbar.context'

interface NavbarRootProps
  extends
    SlotRecipeProps<'suiNavbar', NavbarVariantProps>,
    HTMLChakraProps<'div', Navbar.RootProps> {}

const NavbarRoot = withProvider<HTMLDivElement, NavbarRootProps>(
  Navbar.Root,
  'root',
)

const NavbarBrand = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Navbar.Brand,
  'brand',
)

const NavbarContent = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Navbar.Content,
  'content',
)

const NavbarItemGroup = withContext<HTMLUListElement, HTMLChakraProps<'ul'>>(
  'ul',
  'itemGroup',
)

const NavbarItem = withContext<
  HTMLLIElement,
  HTMLChakraProps<'li', Navbar.ItemProps>
>(Navbar.Item, 'item')

interface NavbarLinkProps extends HTMLChakraProps<'a', Navbar.LinkProps> {
  active?: boolean
}

const NavbarLink = withContext<HTMLAnchorElement, NavbarLinkProps>(
  forwardRef<HTMLAnchorElement, NavbarLinkProps>(
    function NavbarLink(props, ref) {
      const { active, asChild, children, ...rest } = props
      const Link = useLink()

      if (asChild) {
        return (
          <Navbar.Link
            ref={ref}
            data-active={active ? '' : undefined}
            {...rest}
          >
            {children}
          </Navbar.Link>
        )
      }

      return (
        <Navbar.Link
          asChild
          ref={ref}
          data-active={active ? '' : undefined}
          {...rest}
        >
          <Link>{children}</Link>
        </Navbar.Link>
      )
    },
  ),
  'link',
  { forwardAsChild: true },
)

export {
  NavbarRoot as Root,
  NavbarContent as Content,
  NavbarBrand as Brand,
  NavbarItemGroup as ItemGroup,
  NavbarItem as Item,
  NavbarLink as Link,
}

export type { NavbarRootProps as RootProps, NavbarLinkProps as LinkProps }
