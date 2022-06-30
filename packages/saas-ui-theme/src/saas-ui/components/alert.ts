import { alertAnatomy as parts } from '@chakra-ui/anatomy'
import {
  mode,
  PartsStyleFunction,
  PartsStyleObject,
} from '@chakra-ui/theme-tools'

const variantSnackbar: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    container: { bg: mode('white', 'black')(props), borderWidth: '1px' },
    icon: {
      color: mode(`${c}.500`, `${c}.500`)(props),
      '& .chakra-spinner': {
        color: mode('black', 'white')(props),
      },
    },
    title: { fontWeight: 'semibold' },
    description: { color: mode('gray.500', 'gray.400')(props) },
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
