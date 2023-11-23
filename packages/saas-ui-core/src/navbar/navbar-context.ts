import { createContext } from '@chakra-ui/react-context'

import { UseNavbarReturn } from './use-navbar'
import { SystemStyleObject } from '@chakra-ui/styled-system'

export const [NavbarProvider, useNavbarContext] =
  createContext<UseNavbarReturn>({
    name: 'NavbarContext',
    strict: true,
    errorMessage:
      'useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />',
  })

export const [NavBarStylesProvider, useNavBarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NavBarStylesContext`,
  hookName: `useNavItemStyles`,
  providerName: '<NavBar />',
})
