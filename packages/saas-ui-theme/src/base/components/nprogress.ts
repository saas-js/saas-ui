import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  return {
    bar: {
      bg: `${c}.500`,
      _dark: {
        bg: `${c}.300`,
      },
    },
  }
}

export default {
  defaultProps: {
    colorScheme: 'teal',
  },
  baseStyle,
}
