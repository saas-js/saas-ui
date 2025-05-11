'use client'

import { useMemo, useState } from 'react'

import { useControllableState, useIsMobile, useOpenState } from '@saas-ui/hooks'

import type { HTMLSystemProps } from '#system'
import { callAll, createContext } from '#utils'

import type { SidebarMode, SidebarOptions } from './sidebar.types.ts'

export interface UseSidebarReturn {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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

export interface SidebarProviderProps extends Omit<SidebarOptions, 'children'> {
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

  const openState = useOpenState({
    defaultOpen: isMobile ? openMobile : isFlyout ? false : defaultOpen,
    open: isMobile ? openMobile : open,
    onOpenChange(details) {
      if (isMobile) {
        setOpenMobile(details.open)
      } else {
        onOpenChange?.({
          open: details.open,
          mode,
        })
      }
    },
  })

  const context = useMemo(() => {
    return {
      open: openState.open ?? false,
      setOpen: openState.setOpen,
      toggle: () => openState.setOpen((prev) => !prev),
      isMobile,
      openMobile,
      setOpenMobile,
      mode,
      setMode,
    }
  }, [openState, isMobile, openMobile, mode])

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
