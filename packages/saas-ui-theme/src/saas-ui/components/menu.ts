import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  return {
    list: {
      borderWidth: mode(1, 0)(props),
      borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
      boxShadow: mode('lg', 'dark-lg')(props),
    },
    divider: {
      borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
    },
    groupTitle: {
      mx: 3,
    },
  }
}

export default {
  baseStyle,
}
