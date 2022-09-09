import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('sidebar').parts('container', 'overlay', 'overflow')

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  const bg = c ? `${c}.500` : mode('white', 'gray.800')(props)

  return {
    container: {
      bg,
      display: 'flex',
      flexDirection: 'column',
      borderRightWidth: '1px',
      '&[data-condensed]': {
        alignItems: 'center',
      },
    },
    overlay: {
      bg: 'blackAlpha.200',
    },
  }
}

const variantDefault: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      width: '280px',
      maxWidth: ['100vw', '320px'],
      minWidth: '220px',
      py: 3,
    },
    overflow: {
      px: 4,
    },
  }
}

const variantCondensed: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      width: '64px',
      py: 3,
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'default',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    condensed: variantCondensed,
  },
}
