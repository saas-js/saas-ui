import React, { forwardRef } from 'react'

import { Presence } from '@ark-ui/react'

import { type HTMLSystemProps, createSlotRecipeContext, sui } from '#system'

import {
  SidebarProvider as SidebarProviderContext,
  type SidebarProviderProps,
  useSidebar,
  useSidebarTrigger,
} from './sidebar.context'
import { SidebarProps } from './sidebar.types'

const { withRootProvider, withContext } = createSlotRecipeContext({
  key: 'sidebar',
})

const SidebarRootPrimitive = React.forwardRef<HTMLDivElement, SidebarProps>(
  (props, ref) => {
    const { children, ...containerProps } = props

    const { open } = useSidebar()

    return (
      <sui.div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
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

export const SidebarProvider = withRootProvider<SidebarProviderProps>(
  SidebarProviderContext,
)

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

export const SidebarBackdropPrimitive = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  const { setOpen, open } = useSidebar()

  return (
    <Presence present={open}>
      <sui.div ref={ref} onClick={() => setOpen(false)} {...props} />
    </Presence>
  )
})

/**
 * Overlay shown when sidebar is open on mobile.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBackdrop = withContext(SidebarBackdropPrimitive, 'overlay')

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
export const SidebarHeader = withContext('div', 'section', {
  defaultProps: {
    flexDirection: 'row',
  },
})

/**
 * Sidebar body section, used for the main content of the sidebar.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBody = withContext('div', 'section', {
  defaultProps: {
    flex: 1,
    overflowY: 'auto',
  },
})

/**
 * Sidebar footer section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarFooter = withContext('div', 'section')

const SidebarTrackPrimitive = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  const { setOpen } = useSidebar()
  return <sui.div ref={ref} onClick={() => setOpen(false)} {...props} />
})

/**
 * Sidebar track section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarTrack = withContext(SidebarTrackPrimitive, 'track', {
  forwardAsChild: true,
})
