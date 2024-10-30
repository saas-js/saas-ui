import { createContext } from '@chakra-ui/react'
import type { SystemStyleObject } from '@chakra-ui/react'

export const [NavGroupStylesProvider, useNavGroupStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NavGroupStylesContext`,
  hookName: `useNavItemStyles`,
  providerName: '<NavItem />',
})

export const [NavItemStylesProvider, useNavItemStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NavItemStylesContext`,
  hookName: `useNavItemStyles`,
  providerName: '<NavItem />',
})
