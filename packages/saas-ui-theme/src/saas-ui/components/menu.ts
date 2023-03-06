import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    list: {
      borderWidth: 1,
      borderColor: `blackAlpha.200`,
      boxShadow: `lg`,
      _dark: {
        borderWidth: 0,
        borderColor: `whiteAlpha.300`,
        boxShadow: `dark-lg`,
      },
    },
    divider: {
      borderColor: `blackAlpha.200`,
      _dark: {
        borderColor: `whiteAlpha.300`,
      },
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
