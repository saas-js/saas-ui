'use client'

import React from 'react'

import type { HTMLChakraProps } from '@chakra-ui/react'
import { type RootBaseProps, Sidebar, useSidebar } from '@saas-ui/react/sidebar'

import {
  ClassNamesProvider,
  type SidebarNavItemVariantProps,
  type SidebarVariantProps,
  StylesProvider,
  useRecipeResult,
  withContext,
  withItemContext,
  withItemProvider,
} from './sidebar.context'

interface SidebarProviderProps
  extends Sidebar.ProviderProps, Omit<SidebarVariantProps, 'mode'> {}

function SidebarProvider(props: SidebarProviderProps) {
  const {
    children,
    defaultOpen,
    mode,
    open,
    onOpenChange,
    onModeChange,
    ...recipe
  } = props

  return (
    <Sidebar.Provider
      defaultOpen={defaultOpen}
      mode={mode}
      open={open}
      onOpenChange={onOpenChange}
      onModeChange={onModeChange}
    >
      <RecipeProvider {...recipe}>{children}</RecipeProvider>
    </Sidebar.Provider>
  )
}

function RecipeProvider(
  props: Omit<SidebarVariantProps, 'mode'> & {
    children: React.ReactNode
  },
) {
  const { mode } = useSidebar()
  const { children, ...recipeProps } = props
  const { styles, classNames } = useRecipeResult({
    ...recipeProps,
    mode,
  })

  return (
    <StylesProvider value={styles}>
      <ClassNamesProvider value={classNames}>{children}</ClassNamesProvider>
    </StylesProvider>
  )
}

interface SidebarRootProps
  extends HTMLChakraProps<'div'>, Sidebar.RootBaseProps {}

const SidebarRootBase = withContext<HTMLDivElement, SidebarRootProps>(
  Sidebar.Root,
  'root',
)

const toSidebarWidth = (value: SidebarRootProps['width']) =>
  typeof value === 'number' ? `sizes.${value}` : value

/**
 * The recipe sizes the sidebar and its open/close animation with the
 * `--sidebar-width` variables, so the width props are mapped to those
 * variables to keep them in sync.
 */
const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarRootProps>(
  function SidebarRoot(props, ref) {
    const { width, minWidth, maxWidth, css, ...rest } = props

    return (
      <SidebarRootBase
        ref={ref}
        css={[
          {
            '--sidebar-width': toSidebarWidth(width),
            '--sidebar-min-width': toSidebarWidth(minWidth ?? width),
            '--sidebar-max-width': toSidebarWidth(maxWidth ?? width),
          },
          css,
        ]}
        {...rest}
      />
    )
  },
)

interface SidebarTriggerProps extends HTMLChakraProps<'button'> {}

const SidebarTrigger = withContext<HTMLButtonElement, SidebarTriggerProps>(
  Sidebar.Trigger,
  'trigger',
  { forwardAsChild: true },
)

interface SidebarFlyoutTriggerProps extends HTMLChakraProps<'button'> {}

const SidebarFlyoutTrigger = withContext<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>(Sidebar.FlyoutTrigger, 'flyoutTrigger', {
  forwardAsChild: true,
})

const SidebarBackdrop = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Backdrop,
  'backdrop',
  { forwardAsChild: true },
)

const SidebarHeader = withContext<HTMLElement, HTMLChakraProps<'header'>>(
  Sidebar.Header,
  'header',
)
const SidebarBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Body,
  'body',
)
const SidebarFooter = withContext<HTMLElement, HTMLChakraProps<'footer'>>(
  Sidebar.Footer,
  'footer',
)
const SidebarTrack = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Track,
  'track',
  { forwardAsChild: true },
)
const SidebarInset = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'inset',
)
const SidebarGroup = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Group,
  'group',
  { defaultProps: { role: 'group' } },
)
const SidebarGroupHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.GroupHeader,
  'groupHeader',
)
const SidebarGroupTitle = withContext<
  HTMLHeadingElement,
  HTMLChakraProps<'h5'>
>(Sidebar.GroupTitle, 'groupTitle')
const SidebarGroupEndElement = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.GroupEndElement, 'groupEndElement')
const SidebarGroupContent = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.GroupContent,
  'groupContent',
)

interface SidebarNavItemProps
  extends SidebarNavItemVariantProps, HTMLChakraProps<'div'> {}

const SidebarNavItem = withItemProvider<HTMLDivElement, SidebarNavItemProps>(
  Sidebar.NavItem,
  'item',
)

interface SidebarNavButtonProps extends HTMLChakraProps<'button'> {
  active?: boolean
}

const SidebarNavButton = withItemContext<
  HTMLButtonElement,
  SidebarNavButtonProps
>(Sidebar.NavButton, 'button', { forwardAsChild: true })

const SidebarNavButtonEndElement = withItemContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.NavItemEndElement, 'endElement', {
  defaultProps: { 'data-slot': 'endElement' },
})

const SidebarContext = Sidebar.Context

export {
  SidebarProvider as Provider,
  SidebarContext as Context,
  SidebarRoot as Root,
  SidebarTrigger as Trigger,
  SidebarFlyoutTrigger as FlyoutTrigger,
  SidebarBackdrop as Backdrop,
  SidebarHeader as Header,
  SidebarBody as Body,
  SidebarFooter as Footer,
  SidebarTrack as Track,
  SidebarInset as Inset,
  SidebarGroup as Group,
  SidebarGroupHeader as GroupHeader,
  SidebarGroupTitle as GroupTitle,
  SidebarGroupEndElement as GroupEndElement,
  SidebarGroupContent as GroupContent,
  SidebarNavItem as NavItem,
  SidebarNavButton as NavButton,
  SidebarNavButtonEndElement as NavButtonEndElement,
}

export type {
  RootBaseProps,
  SidebarProviderProps as ProviderProps,
  SidebarRootProps as RootProps,
  SidebarTriggerProps as TriggerProps,
  SidebarFlyoutTriggerProps as FlyoutTriggerProps,
  SidebarNavItemProps as NavItemProps,
  SidebarNavButtonProps as NavButtonProps,
}
