import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  return {
    bg: `whiteAlpha.800`,
    boxShadow: 'sm',
    border: '1px',
    borderColor: `gray.200`,
    _dark: {
      bg: `blackAlpha.800`,
      borderColor: `gray.700`,
    },
  }
}

export default {
  baseStyle,
}
