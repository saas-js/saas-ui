import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('list').parts(
  'list',
  'item',
  'button',
  'header',
  'primary',
  'secondary',
  'tertiary',
  'action'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    button: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      outline: 'none',
      _hover: {
        bg: mode('blackAlpha.100', 'whiteAlpha.200')(props),
      },
      _focus: {
        boxShadow: 'outline',
        bg: mode('blackAlpha.200', 'whiteAlpha.300')(props),
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
      _active: {
        bg: mode('blackAlpha.300', 'whiteAlpha.400')(props),
      },
    },
  }
}

export default {
  baseStyle: baseStyle,
  variants: {
    'data-list': {
      icon: {
        marginEnd: 4,
      },
    },
  },
  sizes: {
    condensed: {
      item: {
        py: 1,
      },
      label: {
        p: 0,
      },
    },
  },
}
