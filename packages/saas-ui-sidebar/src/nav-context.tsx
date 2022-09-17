import { createContext } from '@chakra-ui/react-utils'
import { SystemStyleObject } from '@chakra-ui/system'

export const [NavGroupStylesProvider, useNavGroupStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NavGroupStylesContext`,
  // hookName: `useNavItemStyles`,
  // providerName: '<NavItem />',
})

export const [NavItemStylesProvider, useNavItemStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NavItemStylesContext`,
  // hookName: `useNavItemStyles`,
  // providerName: '<NavItem />',
})
