import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('command-bar').parts(
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

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { scrollBehavior } = props

  const bg = mode('white', 'gray.700')(props)

  return {
    container: {
      borderRadius: 'md',
      bg,
      color: 'inherit',
      py: 2,
      zIndex: 'modal',
      maxH: scrollBehavior === 'inside' ? 'calc(100% - 7.5rem)' : undefined,
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
        bg: mode('gray.100', 'whiteAlpha.100')(props),
      },
      _active: {
        bg: mode('gray.50', 'whiteAlpha.50')(props),
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
  }
}

export default {
  defaultProps: {},
  baseStyle,
}
