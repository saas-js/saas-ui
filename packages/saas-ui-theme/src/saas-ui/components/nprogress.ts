import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  return {
    bar: {
      bg: mode(`${c}.500`, `${c}.500`)(props),
    },
  }
}

export default {
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle,
}
