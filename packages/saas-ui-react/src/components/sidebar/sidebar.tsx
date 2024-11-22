import React from 'react'

import type { HTMLChakraProps, SlotRecipeProps } from '@chakra-ui/react'
import { createSlotRecipeContext } from '@chakra-ui/react'
import { Sidebar, useSidebar } from '@saas-ui/core/sidebar'

const {
  withContext,
  useRecipeResult,
  StylesProvider,
  ClassNamesProvider,
  useStyles: useSidebarStyles,
} = createSlotRecipeContext({
  key: 'sidebar',
})

export { useSidebar, useSidebarStyles }

export interface SidebarProviderProps
  extends Sidebar.ProviderProps,
    Omit<SlotRecipeProps<'sidebar'>, 'mode'> {}

export const SidebarProvider = function SidebarProvider(
  props: SidebarProviderProps,
) {
  return (
    <Sidebar.Provider {...props}>
      <RecipeProvider {...props}>{props.children}</RecipeProvider>
    </Sidebar.Provider>
  )
}

function RecipeProvider(
  props: SlotRecipeProps<'sidebar'> & { children: React.ReactNode },
) {
  const { mode } = useSidebar()

  const { styles, classNames } = useRecipeResult({
    ...props,
    mode,
  })

  return (
    <StylesProvider value={styles}>
      <ClassNamesProvider value={classNames}>
        {props.children}
      </ClassNamesProvider>
    </StylesProvider>
  )
}

export interface SidebarRootProps
  extends Sidebar.RootProps,
    HTMLChakraProps<'div'> {}

/**
 * Side navigation, commonly used as the primary navigation
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarRoot = withContext<HTMLDivElement, SidebarRootProps>(
  Sidebar.Root,
  'root',
)

export interface SidebarTriggerProps extends HTMLChakraProps<'button'> {}

/**
 * Button that toggles the sidebar visibility.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarTrigger = withContext<
  HTMLButtonElement,
  SidebarTriggerProps
>(Sidebar.Trigger, 'trigger', {
  forwardAsChild: true,
})

export interface SidebarFlyoutTriggerProps extends HTMLChakraProps<'button'> {}

/**
 * Opens the sidebar when hovering over the trigger.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarFlyoutTrigger = withContext<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>(Sidebar.FlyoutTrigger, 'flyoutTrigger', {
  forwardAsChild: true,
})

/**
 * Overlay shown when sidebar is open on mobile.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBackdrop = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.Backdrop, 'backdrop', {
  forwardAsChild: true,
})

/**
 * Sidebar header section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarHeader = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.Header, 'header')

/**
 * Sidebar body section, used for the main content of the sidebar.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Body,
  'body',
)

/**
 * Sidebar footer section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarFooter = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.Footer, 'footer')

/**
 * Sidebar track section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarTrack = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Track,
  'track',
  {
    forwardAsChild: true,
  },
)

export const SidebarGroup = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Group,
  'group',
  {
    defaultProps: {
      role: 'group',
    },
  },
)

export const SidebarGroupHeader = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.GroupHeader, 'groupHeader')

export const SidebarGroupTitle = withContext<
  HTMLHeadingElement,
  HTMLChakraProps<'h5'>
>(Sidebar.GroupTitle, 'groupTitle')

export const SidebarGroupEndElement = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.GroupEndElement, 'groupEndElement')

export const SidebarGroupContent = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.GroupContent, 'groupContent')

const {
  withProvider: withItemProvider,
  withContext: withItemContext,
  useStyles: useSidebarItemStyles,
} = createSlotRecipeContext({
  key: 'sidebarNavItem',
})

export { useSidebarItemStyles }

export const SidebarNavItem = withItemProvider<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.NavItem, 'item')

export interface SidebarNavButtonProps extends Sidebar.NavButtonProps {
  active?: boolean
}

export const SidebarNavButton = withItemContext<
  HTMLButtonElement,
  SidebarNavButtonProps
>(Sidebar.NavButton, 'button', {
  forwardAsChild: true,
})

export const SidebarNavItemEndElement = withItemContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.NavItemEndElement, 'endElement')
