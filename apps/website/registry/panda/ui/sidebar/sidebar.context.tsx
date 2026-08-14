'use client'

import { useMemo, useState } from 'react'

import { useControllableState } from '../../hooks/use-controllable-state'
import { useIsMobile } from '../../hooks/use-is-mobile'
import { createContext } from '../../utils/create-context'
import type { SidebarMode, SidebarOptions } from './sidebar.options'

export interface UseSidebarReturn {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  mode: SidebarMode
  setMode: (mode: SidebarMode) => void
}

const [SidebarContextProvider, useSidebar] = createContext<UseSidebarReturn>({
  name: 'SidebarContext',
  hookName: 'useSidebar',
  providerName: 'SidebarProvider',
})

export interface SidebarProviderProps extends SidebarOptions {
  children: React.ReactNode
}

export function SidebarProvider(props: SidebarProviderProps) {
  const {
    children,
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    mode: modeProp,
    onModeChange,
  } = props

  const isMobile = useIsMobile()
  const [mode, setMode] = useControllableState<SidebarMode>({
    defaultValue: 'collapsible',
    value: modeProp === 'flyout' && isMobile ? 'collapsible' : modeProp,
    onChange(mode) {
      onModeChange?.({ mode })
    },
  })

  const [openMobile, setOpenMobile] = useState(false)
  const [open = false, setOpen] = useControllableState<boolean>({
    defaultValue: isMobile
      ? openMobile
      : mode === 'flyout'
        ? false
        : defaultOpen,
    value: isMobile ? openMobile : openProp,
    onChange(open) {
      if (isMobile) {
        setOpenMobile(open)
      } else {
        onOpenChange?.({ open, mode })
      }
    },
  })

  const context = useMemo<UseSidebarReturn>(
    () => ({
      open,
      setOpen,
      toggle: () => setOpen((current) => !current),
      isMobile,
      openMobile,
      setOpenMobile,
      mode,
      setMode,
    }),
    [isMobile, mode, open, openMobile, setMode, setOpen],
  )

  return (
    <SidebarContextProvider value={context}>{children}</SidebarContextProvider>
  )
}

export { useSidebar }
