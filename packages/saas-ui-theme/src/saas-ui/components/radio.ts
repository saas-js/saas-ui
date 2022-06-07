import { StyleFunctionProps } from '@chakra-ui/theme-tools'

export default {
  baseStyle: (props: StyleFunctionProps) => {
    const { colorScheme } = props
    return {
      control: {
        _checked: {
          borderColor: `${colorScheme}.500`,
          bg: `${colorScheme}.500`,
          color: 'white',
        },
      },
    }
  },
}
