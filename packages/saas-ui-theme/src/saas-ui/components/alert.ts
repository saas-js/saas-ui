import { alertAnatomy as parts } from '@chakra-ui/anatomy'
import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const variantSnackbar: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: { bg: mode('white', 'black')(props), borderWidth: '1px' },
    icon: { color: mode(`${c}.500`, `${c}.500`)(props) },
    title: { fontWeight: 'semibold' },
    description: { color: mode('gray.500', 'gray.400')(props) },
  }
}

export default {
  defaultProps: {
    size: 'sm',
  },
  baseStyle: {
    container: {
      borderRadius: 'md',
    },
  },
  variants: {
    snackbar: variantSnackbar,
  },
  sizes: {
    sm: {
      container: {
        py: 2,
        px: 3,
      },
      icon: {
        w: 4,
        h: 4,
        mt: 1,
      },
      title: {
        fontSize: 'sm',
      },
      description: {
        fontSize: 'sm',
      },
    },
    md: {
      container: {
        py: 3,
        px: 4,
      },
      icon: {},
      title: {
        fontSize: 'md',
      },
      description: {
        fontSize: 'md',
      },
    },
  },
}
