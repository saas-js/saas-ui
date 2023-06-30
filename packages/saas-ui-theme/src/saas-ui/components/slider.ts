import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { sliderAnatomy } from '@chakra-ui/anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(sliderAnatomy.keys)

export const sliderTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle: definePartsStyle((props) => {
    const { colorScheme } = props
    return {
      filledTrack: {
        bg: `${colorScheme}.500`,
      },
    }
  }),
})
