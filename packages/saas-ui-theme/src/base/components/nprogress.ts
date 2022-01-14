import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  return {
    bar: {
      bg: mode(`${c}.500`, `${c}.300`)(props),
    },
  }
}

export default {
  defaultProps: {
    colorScheme: 'teal',
  },
  baseStyle,
}
