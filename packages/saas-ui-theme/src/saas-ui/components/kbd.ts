import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const variantSolid = defineStyle((props) => {
  return {
    color: `blackAlpha.300`,
    _dark: {
      bg: `whiteAlpha.300`,
    },
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: '1px',
    display: 'inline-block',
    borderRadius: '3px',
    minW: '20px',
    textAlign: 'center',
    mr: 1,
    ':last-child': {
      mr: 0,
    },
  }
})

export const kbdTheme = defineStyleConfig({
  defaultProps: {
    variant: 'solid',
  },
  variants: {
    basic: {
      opacity: 0.6,
    },
    solid: variantSolid,
  },
})
