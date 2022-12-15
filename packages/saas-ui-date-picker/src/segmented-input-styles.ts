import { SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = ({ colorScheme }) => {
  return {
    px: '0.1rem',
    textAlign: 'end',
    outline: 'none',
    rounded: 'md',
    ['&[data-placeholder]']: {
      color: 'muted',
    },
    ['&[data-placeholder]+[data-literal]']: {
      color: 'muted',
    },
    _focus: {
      background: `${colorScheme}.500`,
      color: 'white',
    },
    '&[data-read-only]': {
      bg: 'transparent',
      color: 'muted',
    },
  }
}

export default {
  baseStyle,
  defaultProps: {
    colorScheme: 'primary',
  },
}
