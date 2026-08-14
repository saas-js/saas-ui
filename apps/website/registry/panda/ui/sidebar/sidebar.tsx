import { sidebar, sidebarItem } from '@saas-ui/panda-preset/recipes'

import * as Sidebar from './sidebar.primitive'
import { createStyleContext } from '../context'
import { HTMLSuiProps } from '../types'
import type { SidebarProviderProps } from './sidebar.context'

const { withContext, withProvider } = createStyleContext(sidebar)

export const SidebarContext = Sidebar.Context

export const SidebarProvider = withProvider(function SidebarProvider(
  props: SidebarProviderProps,
) {
  const { children, ...ctx } = props

  return <Sidebar.Provider {...ctx}>{children}</Sidebar.Provider>
})

export interface SidebarRootProps extends HTMLSuiProps<'div'> {}

export const SidebarRoot = withContext<HTMLDivElement, SidebarRootProps>(
  Sidebar.Root,
  'root',
)

export interface SidebarTriggerProps extends HTMLSuiProps<'button'> {}

export const SidebarTrigger = withContext<
  HTMLButtonElement,
  SidebarTriggerProps
>(Sidebar.Trigger, 'trigger', {
  defaultProps: {
    asChild: true,
  },
})

export interface SidebarFlyoutTriggerProps extends HTMLSuiProps<'button'> {}

export const SidebarFlyoutTrigger = withContext<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>(Sidebar.FlyoutTrigger, 'flyoutTrigger', {
  defaultProps: {
    asChild: true,
  },
})

export interface SidebarBackdropProps extends HTMLSuiProps<'div'> {}

export const SidebarBackdrop = withContext<
  HTMLDivElement,
  SidebarBackdropProps
>(Sidebar.Backdrop, 'backdrop')

export const SidebarHeader = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  Sidebar.Header,
  'header',
)

export const SidebarBody = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  Sidebar.Body,
  'body',
)

export const SidebarFooter = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  Sidebar.Footer,
  'footer',
)

export const SidebarTrack = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  Sidebar.Track,
  'track',
  {
    defaultProps: { asChild: true },
  },
)

export const SidebarGroup = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  Sidebar.Group,
  'group',
)

export const SidebarGroupHeader = withContext<
  HTMLDivElement,
  HTMLSuiProps<'div'>
>(Sidebar.GroupHeader, 'groupHeader')

export const SidebarGroupTitle = withContext<
  HTMLHeadingElement,
  HTMLSuiProps<'h5'>
>(Sidebar.GroupTitle, 'groupTitle')

export const SidebarGroupEndElement = withContext<
  HTMLDivElement,
  HTMLSuiProps<'div'>
>(Sidebar.GroupEndElement, 'groupEndElement')

export const SidebarGroupContent = withContext<
  HTMLDivElement,
  HTMLSuiProps<'div'>
>(Sidebar.GroupContent, 'groupContent')

const {
  withProvider: withSidebarItemProvider,
  withContext: withSidebarItemContext,
} = createStyleContext(sidebarItem)

export interface SidebarNavItemProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItem = withSidebarItemProvider<
  HTMLDivElement,
  SidebarNavItemProps
>(Sidebar.NavItem, 'item')

export interface SidebarNavButtonProps extends HTMLSuiProps<'div'> {
  active?: boolean
}

export const SidebarNavButton = withSidebarItemContext<
  HTMLDivElement,
  SidebarNavButtonProps
>(Sidebar.NavButton, 'button')

export const SidebarNavItemEndElement = withSidebarItemContext<
  HTMLDivElement,
  HTMLSuiProps<'div'>
>(Sidebar.NavItemEndElement, 'endElement')
