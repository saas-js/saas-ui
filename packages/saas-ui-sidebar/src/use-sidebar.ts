import { createContext } from '@chakra-ui/react-utils'
import { ResponsiveValue, UseDisclosureReturn } from '@chakra-ui/react'

export interface UseSidebarReturn extends UseDisclosureReturn {
  isMobile?: boolean
  variant?: ResponsiveValue<string>
  size?: ResponsiveValue<string>
}

export const [SidebarProvider, useSidebarContext] =
  createContext<UseSidebarReturn>({
    name: 'SidebarContext',
    strict: false,
  })
