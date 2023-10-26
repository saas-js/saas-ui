import { StyleFunctionProps } from '@chakra-ui/theme-tools'

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { progressAnatomy } from '@chakra-ui/anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(progressAnatomy.keys)

export const progressTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle: definePartsStyle((props) => {
    const { colorScheme } = props
    return {
      track: {
        borderRadius: 'md',
      },
      filledTrack: {
        bg: `${colorScheme}.500`,
      },
    }
  }),
})
