import * as React from 'react'
import { createContext } from '@chakra-ui/react-utils'
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { Breakpoints, getBreakpoints } from '../sidebar/sidebar-utils'

export const [AppShellProvider, useAppShellContext] = createContext<
  ReturnType<typeof useAppShell>
>({
  strict: false,
  errorMessage: 'AppShell context not available.',
})

export interface UseAppShellProps {
  toggleBreakpoint?: Breakpoints
}

export const useAppShell = (props: UseAppShellProps) => {
  const disclosure = useDisclosure()

  const breakpoints = getBreakpoints(props.toggleBreakpoint)

  const isMobile = useBreakpointValue(breakpoints, {
    fallback: props.toggleBreakpoint || 'lg',
  })

  return {
    isSidebarOpen: disclosure.isOpen,
    closeSidebar: disclosure.onClose,
    openSidebar: disclosure.onOpen,
    toggleSidebar: disclosure.onToggle,
    isMobile,
  }
}
