import { extendTheme } from '@chakra-ui/react'

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
  baseTheme
)
