import type { HTMLChakraProps, SlotRecipeProps } from '@chakra-ui/react'
import { Navbar } from '@saas-ui/core/navbar'

import { withContext, withProvider } from './navbar.context.ts'

interface NavbarRootProps
  extends Navbar.RootProps,
    SlotRecipeProps<'suiNavbar'>,
    Omit<HTMLChakraProps<'div'>, keyof Navbar.RootProps> {}

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

const NavbarItem = withContext<HTMLLIElement, HTMLChakraProps<'li'>>(
  Navbar.Item,
  'item',
)

const NavbarLink = withContext<HTMLAnchorElement, HTMLChakraProps<'a'>>(
  Navbar.Link,
  'link',
)

export {
  NavbarRoot as Root,
  NavbarBrand as Brand,
  NavbarContent as Content,
  NavbarItem as Item,
  NavbarLink as Link,
}

export type { NavbarRootProps as RootProps }
