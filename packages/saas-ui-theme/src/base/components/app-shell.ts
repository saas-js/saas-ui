import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('app-shell').parts('container', 'inner', 'main')

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    container: {},
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'fullscreen',
  },
  variants: {
    static: {},
    fullscreen: {
      container: {
        position: 'absolute',
        inset: 0,
      },
    },
  },
  baseStyle,
}
