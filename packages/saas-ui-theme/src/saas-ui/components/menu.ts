import { menuAnatomy } from '@chakra-ui/anatomy'

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  return {
    list: {
      borderWidth: 1,
      borderColor: `blackAlpha.200`,
      boxShadow: `lg`,
      _dark: {
        borderWidth: 0,
        borderColor: `whiteAlpha.300`,
        boxShadow: `dark-lg`,
      },
    },
    divider: {
      borderColor: `blackAlpha.200`,
      _dark: {
        borderColor: `whiteAlpha.300`,
      },
    },
    groupTitle: {
      mx: 3,
    },
  }
})

const variantDialog = definePartsStyle(() => {
  return {
    item: {
      px: 6,
    },
    groupTitle: {
      color: 'muted',
      px: 3,
    },
  }
})

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    dialog: variantDialog,
  },
})
