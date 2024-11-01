'use client'

import { useMemo, useState } from 'react'

import {
  createContext,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import type { HTMLSystemProps } from '#system'

import { callAll } from '../utils/call-all.ts'
import type { SidebarProps } from './sidebar.types.ts'

export type SidebarMode = 'flyout' | 'collapsible'

export interface UseSidebarReturn {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  isMobile?: boolean
  openMobile?: boolean
  setOpenMobile: (open: boolean) => void
  mode: SidebarMode
}

const [SidebarContextProvider, useSidebar] = createContext<UseSidebarReturn>({
  name: 'SidebarProvider',
  strict: true,
})

export interface SidebarProviderProps extends SidebarProps {
  /**
   * The mode of the sidebar.
   */
  mode: SidebarMode
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
  onOpenChange?: (open: boolean) => void
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
  } = props

  const isMobile = useBreakpointValue(
    { base: true, md: false },
    {
      fallback: undefined,
    },
  )

  const mode = modeProp === 'flyout' && isMobile ? 'collapsible' : modeProp
  const isFlyout = mode === 'flyout'

  const [openMobile, setOpenMobile] = useState(false)

  const disclosure = useDisclosure({
    defaultOpen: isMobile ? openMobile : isFlyout ? false : defaultOpen,
    open: isMobile ? openMobile : open,
    onOpen: () => {
      isMobile ? setOpenMobile(true) : onOpenChange?.(true)
    },
    onClose: () => (isMobile ? setOpenMobile(false) : onOpenChange?.(false)),
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
        console.log('enter', context)
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
