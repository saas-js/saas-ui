import { forwardRef } from 'react'

import { createContext } from '@chakra-ui/react'

import {
  type HTMLSystemProps,
  type SlotRecipeProps,
  createSlotRecipeContext,
  sui,
} from '#system'

import { UseNavbarProps, splitNavbarProps, useNavbar } from './use-navbar'
import type { UseNavbarReturn } from './use-navbar'

export const [NavbarProvider, useNavbarContext] =
  createContext<UseNavbarReturn>({
    name: 'NavbarContext',
    strict: true,
    errorMessage:
      'useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />',
  })

const {
  withProvider,
  withContext,
  useStyles: useNavbarStyles,
} = createSlotRecipeContext({
  key: 'navbar',
})

export { useNavbarStyles }
export interface NavbarRootProps
  extends UseNavbarProps,
    Omit<HTMLSystemProps<'div'>, 'height'>,
    SlotRecipeProps<'navbar'> {
  children?: React.ReactNode | React.ReactNode[]
}

export const NavbarRoot = withProvider<HTMLDivElement, NavbarRootProps>(
  forwardRef<HTMLDivElement, NavbarRootProps>((props, ref) => {
    const { children, ...rest } = props

    const [navbarProps, rootProps] = splitNavbarProps(rest)

    const context = useNavbar({ ...navbarProps, ref })

    return (
      <NavbarProvider value={context}>
        <sui.div
          {...rootProps}
          {...context.rootProps}
          style={
            {
              '--navbar-height': context.height,
              ...props.style,
            } as Record<string, any>
          }
        >
          {children}
        </sui.div>
      </NavbarProvider>
    )
  }),
  'root',
)

export const NavbarBrand = withContext<HTMLDivElement, HTMLSystemProps<'div'>>(
  'div',
  'brand',
)

export const NavbarContent = withContext<
  HTMLUListElement,
  HTMLSystemProps<'ul'>
>('ul', 'content')

export const NavbarItem = withContext<HTMLLIElement, HTMLSystemProps<'li'>>(
  'li',
  'item',
)

export const NavbarLink = withContext<HTMLAnchorElement, HTMLSystemProps<'a'>>(
  'a',
  'link',
)
