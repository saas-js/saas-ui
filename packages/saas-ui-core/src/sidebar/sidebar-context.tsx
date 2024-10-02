import { createContext } from '@chakra-ui/utils'
import { SystemStyleObject } from '@chakra-ui/react'

export const [SidebarStylesProvider, useSidebarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SidebarStylesContext`,
  hookName: `useSidebarStyles`,
  providerName: '<Sidebar />',
})
