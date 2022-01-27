import {
  extendTheme,
  withDefaultColorScheme,
  ChakraTheme,
} from '@chakra-ui/react'

import styles from './styles'
import colors from './foundations/colors'
import { fonts, fontSizes, textStyles } from './foundations/typography'
import sizes from './foundations/sizes'
import shadows from './foundations/shadows'
import components from './components'

const config = {
  useSystemColorMode: false,
}

export const theme = extendTheme(
  {
    config,
    colors,
    fonts,
    fontSizes,
    textStyles,
    sizes,
    styles,
    components,
    shadows,
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Radio', 'Switch', 'Checkbox'],
  })
) as ChakraTheme
