import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

export default {
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle: (props: StyleFunctionProps) => {
    const { colorScheme } = props
    return {
      filledTrack: {
        bg: `${colorScheme}.500`,
      },
    }
  },
}
