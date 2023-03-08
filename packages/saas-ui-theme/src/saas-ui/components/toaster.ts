import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle((props) => {
  return {
    bg: `whiteAlpha.800`,
    boxShadow: 'sm',
    border: '1px',
    borderColor: `gray.200`,
    _dark: {
      bg: `blackAlpha.800`,
      borderColor: `gray.700`,
    },
  }
})

export const toasterTheme = defineStyleConfig({
  baseStyle,
})
