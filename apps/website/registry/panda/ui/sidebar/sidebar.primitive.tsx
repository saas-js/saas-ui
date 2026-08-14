'use client'

import {
  type ComponentProps,
  type MouseEvent,
  forwardRef,
  useState,
} from 'react'

import { Presence, ark } from '@ark-ui/react'

import { dataAttr } from '../../utils/attr'
import { callAll } from '../../utils/call-all'
import {
  SidebarProvider,
  type SidebarProviderProps,
  useSidebar,
} from './sidebar.context'

type DivProps = ComponentProps<typeof ark.div>
type ButtonProps = ComponentProps<typeof ark.button>

export interface RootProps extends DivProps {}

export function Context(props: {
  children: (context: ReturnType<typeof useSidebar>) => React.ReactNode
}) {
  return props.children(useSidebar())
}

export const Root = forwardRef<HTMLDivElement, RootProps>(
  function SidebarRoot(props, ref) {
    const { open, mode } = useSidebar()
    return (
      <ark.div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-mode={mode}
        {...props}
      />
    )
  },
)

export interface TriggerProps extends ButtonProps {}

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  function SidebarTrigger(props, ref) {
    const { open, toggle } = useSidebar()
    return (
      <ark.button
        {...props}
        ref={ref}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        data-state={open ? 'open' : 'closed'}
        onClick={callAll(props.onClick, toggle)}
      />
    )
  },
)

export interface FlyoutTriggerProps extends ButtonProps {}

export const FlyoutTrigger = forwardRef<HTMLButtonElement, FlyoutTriggerProps>(
  function SidebarFlyoutTrigger(props, ref) {
    const { open, setOpen } = useSidebar()
    return (
      <ark.button
        {...props}
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        onMouseEnter={callAll(props.onMouseEnter, () => setOpen(true))}
      />
    )
  },
)

export const Backdrop = forwardRef<HTMLDivElement, DivProps>(
  function SidebarBackdrop(props, ref) {
    const { open, setOpen, isMobile, mode } = useSidebar()
    const [enabled, setEnabled] = useState(false)

    if (!isMobile && mode !== 'flyout') return null

    return (
      <Presence
        present={open}
        unmountOnExit
        lazyMount
        onAnimationStart={() => setEnabled(false)}
        onAnimationEnd={() => setEnabled(true)}
        asChild
      >
        <ark.div
          {...props}
          ref={ref}
          data-visible={enabled ? '' : undefined}
          onClick={callAll(props.onClick, () => {
            if (mode !== 'flyout') setOpen(false)
          })}
          onMouseEnter={callAll(props.onMouseEnter, () => {
            if (mode === 'flyout') setOpen(false)
          })}
        />
      </Presence>
    )
  },
)

export const Header = ark.header
export const Body = ark.div
export const Footer = ark.div

export const Track = forwardRef<HTMLDivElement, DivProps>(
  function SidebarTrack(props, ref) {
    const { setOpen, mode } = useSidebar()
    return (
      <ark.div
        {...props}
        ref={ref}
        onClick={callAll(props.onClick, (event: MouseEvent<HTMLDivElement>) => {
          if (!event.defaultPrevented && mode !== 'flyout') setOpen(false)
        })}
      />
    )
  },
)

export const Group = ark.div
export const GroupHeader = ark.div
export const GroupTitle = ark.h5
export const GroupEndElement = ark.div
export const GroupContent = ark.div
export const NavItem = ark.div

export interface NavButtonProps extends DivProps {
  active?: boolean
}

export const NavButton = forwardRef<HTMLDivElement, NavButtonProps>(
  function SidebarNavButton(props, ref) {
    const { active, ...rest } = props
    const { isMobile, setOpenMobile } = useSidebar()
    return (
      <ark.div
        {...rest}
        ref={ref}
        data-active={dataAttr(active)}
        role="button"
        onClick={callAll(rest.onClick, (event: MouseEvent<HTMLDivElement>) => {
          if (!event.defaultPrevented && isMobile) setOpenMobile(false)
        })}
      />
    )
  },
)

export const NavItemEndElement = ark.div

export { SidebarProvider as Provider }
export type { SidebarProviderProps as ProviderProps }
