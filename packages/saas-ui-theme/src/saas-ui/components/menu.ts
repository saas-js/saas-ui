import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
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

const variantDialog: PartsStyleFunction<typeof parts> = () => {
  return {
    item: {
      px: 6,
    },
    groupTitle: {
      color: 'muted',
      px: 3,
    },
  }
}

export default {
  baseStyle,
  variants: {
    dialog: variantDialog,
  },
}
