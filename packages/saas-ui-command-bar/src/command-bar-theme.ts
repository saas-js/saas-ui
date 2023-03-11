import { anatomy } from '@chakra-ui/theme-tools'

export const commandBarAnatomy = anatomy('command-bar').parts(
  'container',
  'dialog',
  'input',
  'list',
  'loading',
  'empty',
  'group',
  'item',
  'separator'
)

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(commandBarAnatomy.keys)

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
    _selected: {
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

export const commandBarTheme = defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
})
