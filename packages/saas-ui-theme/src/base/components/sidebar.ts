import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('sidebar').parts(
  'container',
  'overlay',
  'section',
  'toggleWrapper',
  'toggle'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

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
    section: {
      px: 4,
    },
    toggleWrapper: {
      h: 8,
    },
  }
}

const variantCondensed: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      width: '12',
      py: 3,
    },
    toggleWrapper: {
      display: 'none',
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
