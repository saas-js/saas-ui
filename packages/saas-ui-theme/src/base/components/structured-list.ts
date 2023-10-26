import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { structuredListAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(structuredListAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  return {
    item: {
      py: 2,
      px: 4,
    },
    button: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      borderRadius: 'inherit',
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
  defaultProps: {
    size: 'md',
  },
  baseStyle,
  sizes: {
    sm: {
      item: {
        py: 1,
        px: 1,
      },
      button: {
        py: 1,
        px: 1,
      },
      cell: {
        px: 1,
      },
      icon: {
        px: 1,
      },
    },
    md: {
      item: {
        py: 2,
        px: 2,
      },
      button: { py: 2, px: 2 },
      cell: {
        px: 2,
      },
      icon: {
        px: 2,
      },
    },
  },
})
