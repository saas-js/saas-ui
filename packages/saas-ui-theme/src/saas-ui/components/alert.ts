import { alertAnatomy as parts } from '@chakra-ui/anatomy'
import {
  mode,
  PartsStyleFunction,
  PartsStyleObject,
} from '@chakra-ui/theme-tools'

const variantSnackbar: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    container: {
      bg: `white`,
      _dark: {
        bg: `black`,
      },
      borderWidth: '1px',
    },
    icon: {
      color: `${c}.500`,
      _dark: {
        color: `${c}.500`,
      },
      '& .chakra-spinner': {
        color: `black`,
        _dark: {
          color: `white`,
        },
      },
    },
    title: { fontWeight: 'semibold' },
    description: {
      color: `gray.500`,
      _dark: {
        color: `gray.400`,
      },
    },
  }
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    borderRadius: 'md',
  },
}

export default {
  parts: parts.keys,
  defaultProps: {
    size: 'sm',
  },
  baseStyle,
  variants: {
    snackbar: variantSnackbar,
  },
}
