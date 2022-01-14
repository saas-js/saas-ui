import { mode } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

export const getStateColors = (props: Dict) => {
  const { colorScheme: c } = props
  if (c === 'gray') {
    return {
      base: mode('gray.300', 'whiteAlpha.300')(props),
      hover: mode('gray.400', 'whiteAlpha.400')(props),
      active: mode('gray.500', 'whiteAlpha.500')(props),
    }
  }

  if (c === 'white') {
    return {
      base: 'whiteAlpha.900',
      hover: 'whiteAlpha.700',
      active: 'whiteAlpha.500',
    }
  }

  return {
    base: mode(`${c}.500`, `${c}.500`)(props),
    hover: mode(`${c}.600`, `${c}.600`)(props),
    active: mode(`${c}.700`, `${c}.700`)(props),
  }
}
