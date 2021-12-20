import { mode } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

export default {
  defaultProps: {
    size: 'sm',
  },
  variants: {
    solid: (props: Dict) => {
      const { colorScheme: c } = props
      const background = mode(`${c}.500`, `${c}.500`)(props)
      return {
        bg: background,
        color: 'white',
        _hover: {
          bg: mode(`${c}.600`, `${c}.600`)(props),
          _disabled: {
            bg: background,
          },
        },
        _active: {
          bg: mode(`${c}.700`, `${c}.700`)(props),
        },
      }
    },
    outline: (props: Dict) => {
      const { colorScheme: c } = props
      const color = mode(`${c}.500`, `${c}.500`)(props)
      return {
        borderColor: color,
        // color: color,
        _hover: {
          borderColor: mode(`${c}.600`, `${c}.600`)(props),
        },
        _active: {
          borderColor: mode(`${c}.700`, `${c}.700`)(props),
        },
      }
    },
  },
}
