'use client'

import * as React from 'react'

import { createSlotRecipeContext, useMediaQuery } from '@chakra-ui/react'
import {
  type SidebarVariantProps,
  sidebarSlotRecipe,
} from '@saas-ui/chakra-preset/slot-recipes/sidebar'
import {
  type SidebarNavItemVariantProps,
  sidebarNavItemSlotRecipe,
} from '@saas-ui/chakra-preset/slot-recipes/sidebar-nav-item'

export type SidebarMode = 'flyout' | 'collapsible' | 'compact'

export interface SidebarOptions {
  mode?: SidebarMode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (details: { open: boolean; mode: SidebarMode }) => void
  onModeChange?: (details: { mode: SidebarMode }) => void
}

export interface UseSidebarReturn {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  mode: SidebarMode
  setMode: (mode: SidebarMode) => void
}

const SidebarContext = React.createContext<UseSidebarReturn | undefined>(
  undefined,
)

export interface SidebarBehaviorProviderProps extends SidebarOptions {
  children: React.ReactNode
}

export function SidebarBehaviorProvider(props: SidebarBehaviorProviderProps) {
  const {
    children,
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    mode: modeProp,
    onModeChange,
  } = props

  const [isMobile = false] = useMediaQuery(['(max-width: 767px)'], {
    fallback: [false],
  })
  const [uncontrolledMode, setUncontrolledMode] = React.useState<SidebarMode>(
    modeProp ?? 'collapsible',
  )
  const requestedMode = modeProp ?? uncontrolledMode
  const mode = modeProp === 'flyout' && isMobile ? 'collapsible' : requestedMode
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    modeProp === 'flyout' ? false : defaultOpen,
  )
  const [openMobile, setOpenMobile] = React.useState(false)
  const open = isMobile ? openMobile : (openProp ?? uncontrolledOpen)

  const setOpen = React.useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (value) => {
      if (isMobile) {
        setOpenMobile(value)
        return
      }
      if (openProp !== undefined) {
        const nextOpen = typeof value === 'function' ? value(openProp) : value
        if (nextOpen !== openProp) {
          onOpenChange?.({ open: nextOpen, mode })
        }
        return
      }
      setUncontrolledOpen(value)
    },
    [isMobile, mode, onOpenChange, openProp],
  )

  const setMode = React.useCallback(
    (nextMode: SidebarMode) => {
      if (nextMode === mode) return
      if (modeProp === undefined) {
        setUncontrolledMode(nextMode)
      }
      onModeChange?.({ mode: nextMode })
    },
    [mode, modeProp, onModeChange],
  )

  const value = React.useMemo<UseSidebarReturn>(
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

  return React.createElement(SidebarContext.Provider, { value }, children)
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within Sidebar.Provider')
  }
  return context
}

export const {
  withContext,
  useRecipeResult,
  StylesProvider,
  ClassNamesProvider,
  useStyles: useSidebarStyles,
} = createSlotRecipeContext({
  recipe: sidebarSlotRecipe,
})

export const {
  withProvider: withItemProvider,
  withContext: withItemContext,
  useStyles: useSidebarItemStyles,
} = createSlotRecipeContext({
  recipe: sidebarNavItemSlotRecipe,
})

export type { SidebarNavItemVariantProps, SidebarVariantProps }
