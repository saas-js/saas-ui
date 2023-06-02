import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

import { timelineAnatomy } from '../../anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(timelineAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  return {
    container: {},
    item: {
      minHeight: '32px',
      position: 'relative',
    },
    separator: {
      width: '24px',
      flexShrink: 0,
    },
    icon: {
      color: 'gray.300',
      py: '7px',
      _dark: {
        color: 'gray.600',
      },
    },
    dot: {
      width: '9px',
      height: '9px',
      bg: 'currentColor',
      borderRadius: 'full',
    },
    track: {
      bg: 'gray.300',
      width: '1px',
      flex: 1,
      _dark: {
        bg: 'gray.600',
      },
    },
    content: {
      pt: '1px',
      px: '2',
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  return {
    icon: {},
  }
})

const variantOutline = definePartsStyle((props) => {
  return {
    dot: {
      bg: 'transparent',
      borderColor: 'currentColor',
      borderWidth: '2px',
    },
  }
})

export const timelineTheme = defineMultiStyleConfig({
  defaultProps: { variant: 'solid', size: 'sm' },
  baseStyle,
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  sizes: {
    sm: {
      icon: {
        minH: '8px',
        minW: '8px',
      },
    },
  },
})
