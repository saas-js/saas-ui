import { createContext } from '@chakra-ui/react-utils'
import { ThemeTypings, UseDisclosureReturn } from '@chakra-ui/react'

type Variants = 'condensed' | 'default'

export interface UseSidebarReturn extends UseDisclosureReturn {
  isMobile?: boolean
  variant?: 'Sidebar' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Sidebar']['variants']
    : Variants
  size?: 'Sidebar' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Sidebar']['sizes']
    : string
}

export const [SidebarProvider, useSidebarContext] =
  createContext<UseSidebarReturn>({
    name: 'SidebarContext',
    strict: false,
  })
