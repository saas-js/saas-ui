import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { structuredListAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(structuredListAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  return {
    button: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      outline: 'none',
      _hover: {
        bg: 'blackAlpha.50',
        _dark: {
          bg: 'whiteAlpha.50',
        },
      },
      _focusVisible: {
        boxShadow: 'outline',
      },
      _focus: {
        bg: 'blackAlpha.50',
        _dark: {
          bg: 'whiteAlpha.50',
        },
      },
      _active: {
        bg: 'blackAlpha.100',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      },
    },
  }
})

export const structuredListTheme = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    compact: {
      item: {
        py: 1,
      },
      label: {
        p: 0,
      },
    },
  },
})
