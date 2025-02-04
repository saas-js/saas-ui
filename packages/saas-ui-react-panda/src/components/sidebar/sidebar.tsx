import { ComponentProps, PropsWithChildren } from 'react'

import { PolymorphicProps } from '@ark-ui/react'
import { Sidebar, type SidebarProviderProps } from '@saas-ui/core/sidebar'
import { sidebar, sidebarItem } from '@saas-ui/panda-preset/recipes'

import { createStyleContext } from '../context'
import { HTMLSuiProps } from '../types'

const { withContext, withProvider } = createStyleContext(sidebar)

export const SidebarContext = Sidebar.Context

export const SidebarProvider = withProvider(function SidebarProvider(
  props: SidebarProviderProps,
) {
  const { children, ...ctx } = props

  return <Sidebar.Provider {...ctx}>{props.children}</Sidebar.Provider>
})

export const SidebarRoot = withContext(Sidebar.Root, 'root')

// added PolymorphicProps, because it was showing that "asChild" does not exist, but it clearly does
export interface SidebarTriggerProps
  extends ComponentProps<typeof SidebarTrigger>,
    PolymorphicProps,
    PropsWithChildren {}

export const SidebarTrigger = withContext(Sidebar.Trigger, 'trigger', {
  defaultProps: {
    asChild: true,
  },
})

export interface SidebarFlyoutTriggerProps
  extends ComponentProps<typeof SidebarFlyoutTrigger>,
    PolymorphicProps {}

export const SidebarFlyoutTrigger = withContext(
  Sidebar.FlyoutTrigger,
  'flyoutTrigger',
  {
    defaultProps: {
      asChild: true,
    },
  },
)

export interface SidebarBackdropProps
  extends HTMLSuiProps<'div'>,
    PolymorphicProps {}

export const SidebarBackdrop = withContext(Sidebar.Backdrop, 'backdrop')

export const SidebarHeader = withContext(Sidebar.Header, 'header')
export const SidebarBody = withContext(Sidebar.Body, 'body')
export const SidebarFooter = withContext(Sidebar.Footer, 'footer')

export interface SidebarTrackProps extends HTMLSuiProps<'div'> {}

export const SidebarTrack = withContext(Sidebar.Track, 'track', {
  defaultProps: { asChild: true },
})

export interface SidebarGroupProps extends HTMLSuiProps<'div'> {}

export const SidebarGroup = withContext(Sidebar.Group, 'group')

export interface SidebarGroupHeaderProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupHeader = withContext(
  Sidebar.GroupHeader,
  'groupHeader',
)

export interface SidebarGroupTitleProps extends HTMLSuiProps<'h5'> {}

export const SidebarGroupTitle = withContext(Sidebar.GroupTitle, 'groupTitle')

export interface SidebarGroupEndElementProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupEndElement = withContext(
  Sidebar.GroupEndElement,
  'groupEndElement',
)

export interface SidebarGroupContentProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupContent = withContext(
  Sidebar.GroupContent,
  'groupContent',
)

const {
  withProvider: withSidebarItemProvider,
  withContext: withSidebarItemContext,
} = createStyleContext(sidebarItem)

export interface SidebarNavItemProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItem = withSidebarItemProvider(Sidebar.NavItem, 'item')

export interface SidebarNavButtonProps
  extends HTMLSuiProps<'div'>,
    PropsWithChildren {
  active?: boolean
}

export const SidebarNavButton = withSidebarItemContext(
  Sidebar.NavButton,
  'button',
)

export interface SidebarNavItemEndElementProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItemEndElement = withSidebarItemContext(
  Sidebar.NavItemEndElement,
  'endElement',
  { defaultProps: { 'data-slot': 'endElement' } },
)
