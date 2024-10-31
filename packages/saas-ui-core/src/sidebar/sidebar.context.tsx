import { useCallback, useMemo, useState } from 'react'

import {
  UseDisclosureReturn,
  createContext,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import type { HTMLSystemProps } from '#system'

import { callAll } from '../utils/call-all.ts'
import { getBreakpoints } from './sidebar-utils.ts'
import type { SidebarProps } from './sidebar.types.ts'

export interface UseSidebarReturn {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  isMobile?: boolean
  openMobile?: boolean
  setOpenMobile: (open: boolean) => void
  breakpoints?: boolean
}

const [SidebarContextProvider, useSidebar] = createContext<UseSidebarReturn>({
  name: 'SidebarProvider',
  strict: true,
})

export interface SidebarProviderProps extends SidebarProps {
  /**
   * Define the breakpoint for the mobile nav. Use `false` to disable the mobile nav.
   *
   * @default "lg"
   */
  toggleBreakpoint?: false | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
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
  const { children, toggleBreakpoint, defaultOpen, open, onOpenChange } = props

  const isMobile = useBreakpointValue(getBreakpoints(toggleBreakpoint), {
    fallback: undefined,
  })

  const [openMobile, setOpenMobile] = useState(false)

  const disclosure = useDisclosure({
    defaultOpen: isMobile ? openMobile : defaultOpen,
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
    }
  }, [disclosure, toggleBreakpoint, isMobile, openMobile])

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

  return {
    open: context?.open,
    isMobile: context?.isMobile,
    getButtonProps,
  }
}
