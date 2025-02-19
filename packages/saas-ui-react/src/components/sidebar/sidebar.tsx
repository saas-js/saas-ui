import React from 'react'

import type {
  HTMLChakraProps,
  SlotRecipeProps,
} from '@chakra-ui/react/styled-system'
import { Sidebar, useSidebar } from '@saas-ui/core/sidebar'

import {
  ClassNamesProvider,
  StylesProvider,
  useRecipeResult,
  withContext,
  withItemContext,
  withItemProvider,
} from './sidebar.context.ts'

interface SidebarProviderProps
  extends Sidebar.ProviderProps,
    Omit<SlotRecipeProps<'suiSidebar'>, 'mode'> {}

const SidebarProvider = function SidebarProvider(props: SidebarProviderProps) {
  return (
    <Sidebar.Provider {...props}>
      <RecipeProvider {...props}>{props.children}</RecipeProvider>
    </Sidebar.Provider>
  )
}

function RecipeProvider(
  props: SlotRecipeProps<'suiSidebar'> & { children: React.ReactNode },
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

interface SidebarRootProps extends Sidebar.RootProps, HTMLChakraProps<'div'> {}

/**
 * Side navigation, commonly used as the primary navigation
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarRoot = withContext<HTMLDivElement, SidebarRootProps>(
  Sidebar.Root,
  'root',
)

interface SidebarTriggerProps extends HTMLChakraProps<'button'> {}

/**
 * Button that toggles the sidebar visibility.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarTrigger = withContext<HTMLButtonElement, SidebarTriggerProps>(
  Sidebar.Trigger,
  'trigger',
  {
    forwardAsChild: true,
  },
)

interface SidebarFlyoutTriggerProps extends HTMLChakraProps<'button'> {}

/**
 * Opens the sidebar when hovering over the trigger.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarFlyoutTrigger = withContext<
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
const SidebarBackdrop = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Backdrop,
  'backdrop',
  {
    forwardAsChild: true,
  },
)

/**
 * Sidebar header section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Header,
  'header',
)

/**
 * Sidebar body section, used for the main content of the sidebar.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Body,
  'body',
)

/**
 * Sidebar footer section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarFooter = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Footer,
  'footer',
)

/**
 * Sidebar track section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
const SidebarTrack = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Track,
  'track',
  {
    forwardAsChild: true,
  },
)

const SidebarGroup = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  Sidebar.Group,
  'group',
  {
    defaultProps: {
      role: 'group',
    },
  },
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
  extends SlotRecipeProps<'suiSidebarNavItem'>,
    HTMLChakraProps<'div'> {}

const SidebarNavItem = withItemProvider<HTMLDivElement, SidebarNavItemProps>(
  Sidebar.NavItem,
  'item',
)

interface SidebarNavButtonProps
  extends Sidebar.NavButtonProps,
    HTMLChakraProps<'button'> {
  active?: boolean
}

const SidebarNavButton = withItemContext<
  HTMLButtonElement,
  SidebarNavButtonProps
>(Sidebar.NavButton, 'button', {
  forwardAsChild: true,
})

const SidebarNavButtonEndElement = withItemContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(Sidebar.NavItemEndElement, 'endElement', {
  defaultProps: {
    'data-slot': 'endElement',
  },
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
  SidebarRootProps as RootProps,
  SidebarTriggerProps as TriggerProps,
  SidebarFlyoutTriggerProps as FlyoutTriggerProps,
  SidebarNavItemProps as NavItemProps,
  SidebarNavButtonProps as NavButtonProps,
}
