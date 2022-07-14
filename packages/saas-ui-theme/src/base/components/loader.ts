import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantOverlay: SystemStyleFunction = (props) => {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    bg: mode('whiteAlpha.300', 'blackAlpha.300')(props),
  }
}

const variantFullscreen: SystemStyleFunction = (props) => {
  return {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    bg: mode('white', 'gray.800')(props),
    zIndex: 'modal',
  }
}

export default {
  defaultProps: {
    variant: 'fill',
  },
  baseStyle: {
    fontSize: 'sm',
  },
  variants: {
    fill: {
      flex: 1,
      height: '100%',
    },
    overlay: variantOverlay,
    fullscreen: variantFullscreen,
  },
}
