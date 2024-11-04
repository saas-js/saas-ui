import { forwardRef } from 'react'

import { type HTMLSystemProps, sui } from '#system'
import { createContext } from '#utils'

import { UseNavbarProps, splitNavbarProps, useNavbar } from './use-navbar'
import type { UseNavbarReturn } from './use-navbar'

export const [NavbarProvider, useNavbarContext] =
  createContext<UseNavbarReturn>({
    name: 'NavbarContext',
    strict: true,
    errorMessage:
      'useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />',
  })

export interface NavbarRootProps
  extends UseNavbarProps,
    Omit<HTMLSystemProps<'div'>, 'height'> {
  children?: React.ReactNode | React.ReactNode[]
}

export const NavbarRoot = forwardRef<HTMLDivElement, NavbarRootProps>(
  (props, ref) => {
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
  },
)

export const NavbarBrand = sui.div
export const NavbarContent = sui.ul
export const NavbarItem = sui.li
export const NavbarLink = sui.a
