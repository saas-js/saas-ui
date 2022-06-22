import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

export default {
  baseStyle: (props: StyleFunctionProps) => {
    const { colorScheme } = props
    return {
      track: {
        _checked: {
          bg: `${colorScheme}.500`,
        },
      },
    }
  },
}
