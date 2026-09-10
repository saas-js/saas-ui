import { forwardRef } from 'react'

import { sidebar, sidebarItem } from '@saas-ui/panda-preset/recipes'
import { Sidebar } from '@saas-ui/react/sidebar'

import { createStyleContext } from '../context'
import { HTMLSuiProps } from '../types'

const { withContext, withProvider } = createStyleContext(sidebar)

export const SidebarContext = Sidebar.Context

export const SidebarProvider = withProvider(function SidebarProvider(
  props: Sidebar.ProviderProps,
) {
  const { children, ...ctx } = props

  return <Sidebar.Provider {...ctx}>{children}</Sidebar.Provider>
})

export interface SidebarRootProps extends HTMLSuiProps<'div'> {}

const SidebarRootBase = withContext<HTMLDivElement, SidebarRootProps>(
  Sidebar.Root,
  'root',
)

/**
 * The recipe sizes the sidebar and its open/close animation with the
 * `--sidebar-width` variables. Plain string width props are mapped to those
 * variables to keep them in sync; token and responsive values pass through
 * unchanged and require setting the variables manually.
 */
export const SidebarRoot = forwardRef<HTMLDivElement, SidebarRootProps>(
  function SidebarRoot(props, ref) {
    const { width, minWidth, maxWidth, style, ...rest } = props

    const vars: Record<string, string> = {}
    const passThrough: Partial<SidebarRootProps> = {}

    const map = (
      varName: string,
      key: 'width' | 'minWidth' | 'maxWidth',
      value: SidebarRootProps['width'],
      fallback?: SidebarRootProps['width'],
    ) => {
      const varValue = value ?? fallback
      if (typeof varValue === 'string') {
        vars[varName] = varValue
      }
      if (value !== undefined && typeof value !== 'string') {
        passThrough[key] = value
      }
    }

    map('--sidebar-width', 'width', width)
    map('--sidebar-min-width', 'minWidth', minWidth, width)
    map('--sidebar-max-width', 'maxWidth', maxWidth, width)

    return (
      <SidebarRootBase
        ref={ref}
        style={{ ...vars, ...style }}
        {...passThrough}
        {...rest}
      />
    )
  },
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

export const SidebarBackdrop = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  Sidebar.Backdrop,
  'backdrop',
)

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
