'use client'

import { useMemo, useState } from 'react'

import {
  useControllableState,
  useDisclosure,
  useIsMobile,
} from '@saas-ui/hooks'

import type { HTMLSystemProps } from '#system'
import { callAll, createContext } from '#utils'

import type { SidebarMode, SidebarProps } from './sidebar.types.ts'

export interface UseSidebarReturn {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  isMobile?: boolean
  openMobile?: boolean
  setOpenMobile: (open: boolean) => void
  mode: SidebarMode
  setMode: (mode: SidebarMode) => void
}

const [SidebarContextProvider, useSidebar] = createContext<UseSidebarReturn>({
  name: 'SidebarProvider',
  strict: true,
})

export interface SidebarProviderProps extends Omit<SidebarProps, 'children'> {
  /**
   * The mode of the sidebar. Flyout mode is only available on desktop.
   * @default 'collapsible'
   */
  mode?: SidebarMode
  /**
   * Control the default visibility of the sidebar.
   */
  defaultOpen?: boolean
  /**
   * Control the visibility of the sidebar.
   */
  open?: boolean
  /**
   * Callback invoked when the sidebar is opened.
   */
  onOpenChange?: (details: { open: boolean; mode: SidebarMode }) => void
  /**
   * Callback invoked when the mode of the sidebar is changed.
   */
  onModeChange?: (details: { mode: SidebarMode }) => void
  /**
   * The content of the sidebar.
   */
  children: React.ReactNode
}

export function SidebarProvider(props: SidebarProviderProps) {
  const {
    children,
    defaultOpen = true,
    open,
    onOpenChange,
    mode: modeProp,
    onModeChange,
  } = props

  const isMobile = useIsMobile()

  const [mode, setMode] = useControllableState<SidebarMode>({
    defaultValue: 'collapsible',
    value: modeProp === 'flyout' && isMobile ? 'collapsible' : modeProp,
    onChange: (mode) => {
      onModeChange?.({ mode })
    },
  })

  const isFlyout = mode === 'flyout'

  const [openMobile, setOpenMobile] = useState(false)

  const disclosure = useDisclosure({
    defaultOpen: isMobile ? openMobile : isFlyout ? false : defaultOpen,
    open: isMobile ? openMobile : open,
    onOpen: () => {
      isMobile
        ? setOpenMobile(true)
        : onOpenChange?.({
            open: true,
            mode,
          })
    },
    onClose: () =>
      isMobile
        ? setOpenMobile(false)
        : onOpenChange?.({
            open: false,
            mode,
          }),
  })

  const context = useMemo(() => {
    return {
      open: disclosure.open,
      setOpen: (open: boolean = true) =>
        open ? disclosure.onOpen() : disclosure.onClose(),
      toggle: disclosure.onToggle,
      isMobile,
      openMobile,
      setOpenMobile,
      mode,
      setMode,
    }
  }, [disclosure, isMobile, openMobile, mode])

  return (
    <SidebarContextProvider value={context}>{children}</SidebarContextProvider>
  )
}

export { useSidebar }

export const useSidebarTrigger = () => {
  const context = useSidebar()

  const getButtonProps = (props: HTMLSystemProps<'button'>) => {
    return {
      onClick: callAll(context?.toggle, props?.onClick),
      'aria-label': context.open ? 'Close sidebar' : 'Open sidebar',
      'data-state': context.open ? 'open' : 'closed',
    }
  }

  const getFlyoutButtonProps = (props: HTMLSystemProps<'button'>) => {
    return {
      onMouseEnter: callAll(() => {
        context?.setOpen(true)
      }, props?.onMouseEnter),
      'data-state': context.open ? 'open' : 'closed',
    }
  }

  return {
    open: context?.open,
    isMobile: context?.isMobile,
    getButtonProps,
    getFlyoutButtonProps,
  }
}
