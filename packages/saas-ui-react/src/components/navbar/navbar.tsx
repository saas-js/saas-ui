import type { HTMLChakraProps } from '@chakra-ui/react'
import { createSlotRecipeContext } from '@chakra-ui/react'
import { Navbar } from '@saas-ui/core/navbar'

const {
  withProvider,
  withContext,
  useStyles: useNavbarStyles,
} = createSlotRecipeContext({
  key: 'navbar',
})

export { useNavbarStyles }

export interface NavbarRootProps
  extends Navbar.RootProps,
    Omit<HTMLChakraProps<'div'>, keyof Navbar.RootProps> {}

export const NavbarRoot = withProvider<HTMLDivElement, NavbarRootProps>(
  Navbar.Root,
  'root',
)

export const NavbarBrand = withContext(Navbar.Brand, 'brand')

export const NavbarContent = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Navbar.Content, 'content')

export const NavbarItem = withContext<HTMLLIElement, HTMLChakraProps<'li'>>(
  Navbar.Item,
  'item',
)

export const NavbarLink = withContext<HTMLAnchorElement, HTMLChakraProps<'a'>>(
  Navbar.Link,
  'link',
)
