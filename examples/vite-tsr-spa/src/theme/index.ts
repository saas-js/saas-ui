import { extendTheme } from '@chakra-ui/react'

import { theme as baseTheme } from '@saas-ui/react'
// Remove the above line and uncomment the below line if you're using Saas UI Pro.
// import {theme as baseTheme} from '@saas-ui-pro/react'

export const theme = extendTheme(
  {
    // Add your theme config here
  },
  baseTheme
)
