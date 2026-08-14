'use client'

import * as React from 'react'

import type { HTMLChakraProps } from '@chakra-ui/react'
import { Presence, chakra } from '@chakra-ui/react'

import {
  ClassNamesProvider,
  SidebarBehaviorProvider,
  type SidebarNavItemVariantProps,
  type SidebarOptions,
  type SidebarVariantProps,
  StylesProvider,
  useRecipeResult,
  useSidebar,
  withContext,
  withItemContext,
  withItemProvider,
} from './sidebar.context.ts'

type SidebarProviderRecipeProps = Omit<SidebarVariantProps, 'mode'>

type SidebarProviderProps = SidebarOptions &
  SidebarProviderRecipeProps & {
    children: React.ReactNode
  }

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
    <SidebarBehaviorProvider
      defaultOpen={defaultOpen}
      open={open}
      mode={mode}
      onOpenChange={onOpenChange}
      onModeChange={onModeChange}
    >
      <RecipeProvider {...recipe}>{children}</RecipeProvider>
    </SidebarBehaviorProvider>
  )
}

function RecipeProvider(
  props: SidebarProviderRecipeProps & { children: React.ReactNode },
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

interface SidebarRootProps extends HTMLChakraProps<'div'> {}

const SidebarRootPrimitive = React.forwardRef<HTMLDivElement, SidebarRootProps>(
  function SidebarRoot(props, ref) {
    const { open, mode } = useSidebar()

    return (
      <chakra.div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-mode={mode}
        {...props}
      />
    )
  },
)

const SidebarRoot = withContext<HTMLDivElement, SidebarRootProps>(
  SidebarRootPrimitive,
  'root',
)

interface SidebarTriggerProps extends HTMLChakraProps<'button'> {}

const SidebarTriggerPrimitive = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(function SidebarTrigger(props, ref) {
  const { onClick, ...rest } = props
  const { open, toggle } = useSidebar()

  return (
    <chakra.button
      ref={ref}
      aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      data-state={open ? 'open' : 'closed'}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggle()
      }}
      {...rest}
    />
  )
})

const SidebarTrigger = withContext<HTMLButtonElement, SidebarTriggerProps>(
  SidebarTriggerPrimitive,
  'trigger',
  { forwardAsChild: true },
)

interface SidebarFlyoutTriggerProps extends HTMLChakraProps<'button'> {}

const SidebarFlyoutTriggerPrimitive = React.forwardRef<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>(function SidebarFlyoutTrigger(props, ref) {
  const { onMouseEnter, ...rest } = props
  const { open, setOpen } = useSidebar()

  return (
    <chakra.button
      ref={ref}
      data-state={open ? 'open' : 'closed'}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (!event.defaultPrevented) setOpen(true)
      }}
      {...rest}
    />
  )
})

const SidebarFlyoutTrigger = withContext<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>(SidebarFlyoutTriggerPrimitive, 'flyoutTrigger', {
  forwardAsChild: true,
})

interface SidebarBackdropProps extends HTMLChakraProps<'div'> {}

const SidebarBackdropPrimitive = React.forwardRef<
  HTMLDivElement,
  SidebarBackdropProps
>(function SidebarBackdrop(props, ref) {
  const { onClick, onMouseEnter, ...rest } = props
  const { isMobile, mode, open, setOpen } = useSidebar()

  if (!isMobile && mode !== 'flyout') return null

  return (
    <Presence present={open} lazyMount unmountOnExit asChild>
      <chakra.div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented && mode !== 'flyout') setOpen(false)
        }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          if (!event.defaultPrevented && mode === 'flyout') setOpen(false)
        }}
        {...rest}
      />
    </Presence>
  )
})

const SidebarBackdrop = withContext<HTMLDivElement, SidebarBackdropProps>(
  SidebarBackdropPrimitive,
  'backdrop',
  { forwardAsChild: true },
)

const SidebarHeader = withContext<HTMLElement, HTMLChakraProps<'header'>>(
  'header',
  'header',
)
const SidebarBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'body',
)
const SidebarFooter = withContext<HTMLElement, HTMLChakraProps<'footer'>>(
  'footer',
  'footer',
)

const SidebarTrackPrimitive = React.forwardRef<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>(function SidebarTrack(props, ref) {
  const { onClick, ...rest } = props
  const { mode, setOpen } = useSidebar()

  return (
    <chakra.div
      ref={ref}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && mode !== 'flyout') setOpen(false)
      }}
      {...rest}
    />
  )
})

const SidebarTrack = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  SidebarTrackPrimitive,
  'track',
  { forwardAsChild: true },
)

const SidebarInset = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'inset',
)
const SidebarGroup = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'group',
  { defaultProps: { role: 'group' } },
)
const SidebarGroupHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'groupHeader',
)
const SidebarGroupTitle = withContext<
  HTMLHeadingElement,
  HTMLChakraProps<'h5'>
>('h5', 'groupTitle')
const SidebarGroupEndElement = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>('div', 'groupEndElement')
const SidebarGroupContent = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'groupContent',
)

interface SidebarNavItemProps
  extends SidebarNavItemVariantProps, HTMLChakraProps<'div'> {}

const SidebarNavItem = withItemProvider<HTMLDivElement, SidebarNavItemProps>(
  'div',
  'item',
)

interface SidebarNavButtonProps extends HTMLChakraProps<'button'> {
  active?: boolean
}

const SidebarNavButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  SidebarNavButtonProps
>(function SidebarNavButton(props, ref) {
  const { active, onClick, ...rest } = props
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <chakra.button
      ref={ref}
      data-active={active ? '' : undefined}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && isMobile) setOpenMobile(false)
      }}
      {...rest}
    />
  )
})

const SidebarNavButton = withItemContext<
  HTMLButtonElement,
  SidebarNavButtonProps
>(SidebarNavButtonPrimitive, 'button', { forwardAsChild: true })

const SidebarNavButtonEndElement = withItemContext<
  HTMLDivElement,
  HTMLChakraProps<'div'>
>('div', 'endElement', {
  defaultProps: { 'data-slot': 'endElement' },
})

function SidebarContext(props: {
  children: (context: ReturnType<typeof useSidebar>) => React.ReactNode
}) {
  return props.children(useSidebar())
}

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
  SidebarOptions as RootBaseProps,
  SidebarProviderProps as ProviderProps,
  SidebarRootProps as RootProps,
  SidebarTriggerProps as TriggerProps,
  SidebarFlyoutTriggerProps as FlyoutTriggerProps,
  SidebarNavItemProps as NavItemProps,
  SidebarNavButtonProps as NavButtonProps,
}
