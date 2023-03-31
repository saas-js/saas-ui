import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { radioAnatomy } from '@chakra-ui/anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys)

export const radioTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) => {
    const { colorScheme } = props
    return {
      control: {
        _checked: {
          borderColor: `${colorScheme}.500`,
          bg: `${colorScheme}.500`,
          color: 'white',
        },
      },
    }
  }),
})
