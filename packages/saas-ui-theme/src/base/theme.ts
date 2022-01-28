import { extendTheme, ChakraTheme } from '@chakra-ui/react'

import components from './components'

export const baseTheme = extendTheme({
  semanticTokens: {
    colors: {
      'presence.online': 'green.500',
      'presence.offline': 'gray.400',
      'presence.busy': 'orange.500',
      'presence.dnd': 'red.500',
      'presence.away': 'gray.400',
    },
  },
  components,
}) as ChakraTheme
