import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  return {
    bg: mode('whiteAlpha.800', 'blackAlpha.800')(props),
    boxShadow: 'sm',
    border: '1px',
    borderColor: mode('gray.200', 'gray.700')(props),
  }
}

export default {
  baseStyle,
}
