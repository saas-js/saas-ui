import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('structured-list').parts(
  'list',
  'item',
  'button',
  'header',
  'cell',
  'icon'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    button: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      outline: 'none',
      _hover: {
        bg: 'blackAlpha.50',
        _dark: {
          bg: 'whiteAlpha.50',
        },
      },
      _focusVisible: {
        boxShadow: 'outline',
      },
      _focus: {
        bg: 'blackAlpha.50',
        _dark: {
          bg: 'whiteAlpha.50',
        },
      },
      _active: {
        bg: 'blackAlpha.100',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      },
    },
  }
}

export default {
  baseStyle: baseStyle,
  sizes: {
    compact: {
      item: {
        py: 1,
      },
      label: {
        p: 0,
      },
    },
  },
}
