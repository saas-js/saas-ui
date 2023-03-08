import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { checkboxAnatomy } from '@chakra-ui/anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
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
})

export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
