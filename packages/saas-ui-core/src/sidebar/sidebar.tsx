import React, { forwardRef, useState } from 'react'

import { type HTMLProps, Presence, type PresenceProps } from '@ark-ui/react'

import { type HTMLSystemProps, createSlotRecipeContext, sui } from '#system'

import { callAll, dataAttr } from '../utils/index.ts'
import {
  SidebarProvider as SidebarProviderContext,
  type SidebarProviderProps,
  useSidebar,
  useSidebarTrigger,
} from './sidebar.context.tsx'
import { SidebarProps } from './sidebar.types.ts'

const { withContext, useRecipeResult, StylesProvider, ClassNamesProvider } =
  createSlotRecipeContext({
    key: 'sidebar',
  })

export const SidebarProvider = function SidebarProvider(
  props: SidebarProviderProps,
) {
  const { styles, classNames, props: rootProps } = useRecipeResult(props)

  return (
    <StylesProvider value={styles}>
      <ClassNamesProvider value={classNames}>
        <SidebarProviderContext {...rootProps} mode={props.mode} />
      </ClassNamesProvider>
    </StylesProvider>
  )
}

const SidebarRootPrimitive = React.forwardRef<HTMLDivElement, SidebarProps>(
  (props, ref) => {
    const { children, ...containerProps } = props

    const { open, mode } = useSidebar()

    return (
      <sui.div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-mode={mode}
        {...containerProps}
      >
        {children}
      </sui.div>
    )
  },
)

export interface SidebarTriggerProps extends HTMLSystemProps<'button'> {}

const ToggleTriggerPrimitive = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>((props, ref) => {
  const { children, ...rest } = props
  const { getButtonProps } = useSidebarTrigger()

  return (
    <sui.button {...getButtonProps(rest)} ref={ref} {...rest}>
      {children}
    </sui.button>
  )
})

export interface SidebarFlyoutTriggerProps extends HTMLSystemProps<'button'> {}

const FlyoutTriggerPrimitive = forwardRef<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>((props, ref) => {
  const { children, ...rest } = props
  const { getFlyoutButtonProps } = useSidebarTrigger()

  return (
    <sui.button {...getFlyoutButtonProps(rest)} ref={ref} {...rest}>
      {children}
    </sui.button>
  )
})

/**
 * Side navigation, commonly used as the primary navigation
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarRoot = withContext(SidebarRootPrimitive, 'root')

/**
 * Button that toggles the sidebar visibility.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarTrigger = withContext(ToggleTriggerPrimitive, 'trigger', {
  forwardAsChild: true,
})

/**
 * Opens the sidebar when hovering over the trigger.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarFlyoutTrigger = withContext(
  FlyoutTriggerPrimitive,
  'flyoutTrigger',
  {
    forwardAsChild: true,
  },
)

interface SidebarBackdropPrimitiveProps
  extends HTMLProps<'div'>,
    PresenceProps {}

export const SidebarBackdropPrimitive = forwardRef<
  HTMLDivElement,
  SidebarBackdropPrimitiveProps
>((props, ref) => {
  const { setOpen, open, mode } = useSidebar()

  const [enabled, setEnabled] = useState(false)

  const backdropProps = {
    onClick: () => {
      if (mode !== 'flyout') {
        setOpen(false)
      }
    },
    onMouseEnter: () => {
      if (mode === 'flyout') {
        setOpen(false)
      }
    },
  }

  return (
    <Presence
      present={open}
      unmountOnExit
      lazyMount
      onAnimationStart={() => {
        setEnabled(false)
      }}
      onAnimationEnd={() => {
        setEnabled(true)
      }}
      asChild
    >
      <sui.div
        ref={ref}
        {...backdropProps}
        pointerEvents={enabled ? 'auto' : 'none'}
        {...props}
      />
    </Presence>
  )
})

/**
 * Overlay shown when sidebar is open on mobile.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBackdrop = withContext(
  SidebarBackdropPrimitive,
  'backdrop',
  {
    forwardAsChild: true,
  },
)

/**
 * Sidebar section that can contain sidebar items.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarSection = withContext('div', 'section')

/**
 * Sidebar header section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarHeader = withContext('div', 'header')

/**
 * Sidebar body section, used for the main content of the sidebar.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBody = withContext('div', 'body')

/**
 * Sidebar footer section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarFooter = withContext('div', 'footer')

const SidebarTrackPrimitive = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  const { setOpen, mode } = useSidebar()
  return (
    <sui.div
      ref={ref}
      {...props}
      onClick={callAll(() => {
        if (mode !== 'flyout') {
          setOpen(false)
        }
      }, props.onClick)}
    />
  )
})

/**
 * Sidebar track section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarTrack = withContext(SidebarTrackPrimitive, 'track', {
  forwardAsChild: true,
})

export const SidebarGroup = withContext('div', 'group', {
  defaultProps: {
    role: 'group',
  },
})

export const SidebarGroupHeader = withContext('div', 'groupHeader')

export const SidebarGroupTitle = withContext('h5', 'groupTitle')

export const SidebarGroupEndElement = withContext('div', 'groupEndElement')

export const SidebarGroupContent = withContext('div', 'groupContent')

const { withProvider: withItemProvider, withContext: withItemContext } =
  createSlotRecipeContext({
    key: 'sidebarNavItem',
  })

export const SidebarNavItem = withItemProvider('div', 'item')

export interface SidebarNavButtonProps extends HTMLProps<'button'> {
  active?: boolean
}

export const SidebarNavButton = withItemContext(
  forwardRef<HTMLButtonElement, SidebarNavButtonProps>((props, ref) => {
    const { children, active, ...rest } = props

    return (
      <button ref={ref} data-active={dataAttr(active)} {...rest}>
        {children}
      </button>
    )
  }),
  'button',
  {
    forwardAsChild: true,
  },
)

export const SidebarNavItemEndElement = withItemContext('div', 'endElement')
