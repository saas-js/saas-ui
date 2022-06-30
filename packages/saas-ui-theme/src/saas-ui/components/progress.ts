import { StyleFunctionProps } from '@chakra-ui/theme-tools'

export default {
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle: (props: StyleFunctionProps) => {
    const { colorScheme } = props
    return {
      track: {
        borderRadius: 'md',
      },
      filledTrack: {
        bg: `${colorScheme}.500`,
      },
    }
  },
}
