import { UseDisclosureReturn } from '@chakra-ui/react'
import { PropGetter, createContext } from '@chakra-ui/react-utils'
import { callAllHandlers } from '@chakra-ui/utils'

type Variants = 'compact' | 'default'

export interface UseSidebarReturn extends UseDisclosureReturn {
  isMobile?: boolean
  breakpoints?: boolean
}

export const [SidebarProvider, useSidebarContext] =
  createContext<UseSidebarReturn>({
    name: 'SidebarContext',
    strict: false,
  })

export const useSidebarToggleButton = () => {
  const context = useSidebarContext()

  const getButtonProps: PropGetter = (props) => {
    return {
      onClick: callAllHandlers(context?.onToggle, props?.onClick),
    }
  }

  return {
    isOpen: context?.open,
    isMobile: context?.isMobile,
    getButtonProps,
  }
}
