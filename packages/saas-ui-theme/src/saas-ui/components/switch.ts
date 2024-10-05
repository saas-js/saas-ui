import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

export const switchTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle: definePartsStyle((props) => {
    const { colorScheme } = props
    return {
      track: {
        _checked: {
          bg: `${colorScheme}.500`,
        },
      },
    }
  }),
})
