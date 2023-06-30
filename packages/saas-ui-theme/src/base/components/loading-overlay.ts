import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { loadingOverlayAnatomy } from '../../anatomy'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(loadingOverlayAnatomy.keys)

const baseStyle = definePartsStyle({
  overlay: {
    p: 4,
  },
  text: {},
})

const variantFill = definePartsStyle(() => {
  return {
    overlay: {
      flex: 1,
      height: '100%',
      bg: 'whiteAlpha.400',
      _dark: {
        bg: 'blackAlpha.400',
      },
    },
  }
})

const variantFullscreen = definePartsStyle(() => {
  return {
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 'modal',
      bg: 'white',
      _dark: {
        bg: 'gray.800',
      },
    },
  }
})

const variantOverlay = definePartsStyle(() => {
  return {
    overlay: {
      position: 'absolute',
      inset: 0,
      bg: 'whiteAlpha.300',
      _dark: {
        bg: 'blackAlpha.300',
      },
    },
  }
})

export const loadingOverlayTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'fill',
  },
  baseStyle,
  variants: {
    fill: variantFill,
    fullscreen: variantFullscreen,
    overlay: variantOverlay,
  },
})
