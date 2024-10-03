const parts = [
  'container',
  'dialog',
  'input',
  'list',
  'loading',
  'empty',
  'group',
  'item',
  'separator',
]

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts)

const baseStyle = definePartsStyle({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 1,
    borderRadius: 'md',
    bg: 'white',
    color: 'inherit',
    py: 2,
    zIndex: 'modal',
    flex: 1,
    _dark: {
      bg: 'gray.700',
    },
  },
  input: {
    px: 4,
    py: 2,
    mb: 2,
    outline: 'none',
    bg: 'transparent',
    w: 'full',
  },
  list: {
    borderTopWidth: '1px',
    overflow: 'auto',
    overscrollBehavior: 'contain',
    flex: 1,
  },
  group: {
    '& > [cmdk-group-heading]': {
      px: 4,
      py: 2,
      fontSize: 'sm',
      fontWeight: 'semibold',
      color: 'muted',
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 'md',
    h: 12,
    px: 4,
    gap: 4,
    userSelect: 'none',
    transition: 'common',
    transitionDuration: 'normal',
    '&[data-disabled=true]': {
      opacity: 0.6,
    },
    '&[data-selected=true]': {
      bg: 'gray.100',
      _dark: {
        bg: 'whiteAlpha.100',
      },
    },
    _active: {
      bg: 'gray.50',
      _dark: {
        bg: 'whiteAlpha.50',
      },
      _disabled: {
        bg: 'transparent',
        cursor: 'inherit',
      },
    },
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'muted',
    fontSize: 'md',
    h: 16,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    color: 'muted',
    fontSize: 'md',
    px: 4,
    py: 2,
    h: 12,
  },
})

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === 'full') {
    return definePartsStyle({
      dialog: {
        maxW: '100vw',
        minH: '$100vh',
        my: '0',
        borderRadius: '0',
      },
    })
  }
  return definePartsStyle({
    dialog: { maxW: value },
  })
}

const sizes = {
  xs: getSize('xs'),
  sm: getSize('sm'),
  md: getSize('md'),
  lg: getSize('lg'),
  xl: getSize('xl'),
  '2xl': getSize('2xl'),
  '3xl': getSize('3xl'),
  '4xl': getSize('4xl'),
  '5xl': getSize('5xl'),
  '6xl': getSize('6xl'),
  full: getSize('full'),
}

export const commandBarTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'md',
  },
  baseStyle,
  sizes,
})
