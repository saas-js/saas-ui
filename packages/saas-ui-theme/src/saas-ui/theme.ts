import {
  extendTheme,
  withDefaultColorScheme,
  ChakraTheme,
} from '@chakra-ui/react'

import { baseTheme } from '../base/theme'

import { styles } from './styles'
import { foundations } from './foundations'
import { components } from './components'

export const theme = extendTheme(
  {
    ...foundations,
    styles,
    components,
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Radio', 'Switch', 'Checkbox'],
  }),
  baseTheme
) as ChakraTheme
