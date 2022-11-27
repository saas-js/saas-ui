import { createContext } from '@chakra-ui/react-context'
import { SystemStyleObject } from '@chakra-ui/react'

export const [SidebarStylesProvider, useSidebarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SidebarStylesContext`,
  hookName: `useSidebarItemStyles`,
  providerName: '<Sidebar />',
})
