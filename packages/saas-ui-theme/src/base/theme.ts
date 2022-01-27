import { extendTheme, ChakraTheme } from '@chakra-ui/react'

import components from './components'

export const baseTheme = extendTheme({
  components,
}) as ChakraTheme
