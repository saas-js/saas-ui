import {
  mode,
  PartsStyleFunction,
  transparentize,
} from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction = (props) => {
  const { colorScheme: c } = props

  const selected = {
    bg: `${c}.500`,
    color: 'white',
    _dark: {
      bg: `${c}.500`,
      color: 'white',
    },
  }

  return {
    segment: {
      px: '0.5',
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
        background: 'primary.500',
        color: 'white',
      },
      '&[data-read-only]': {
        bg: 'transparent',
        color: 'muted',
      },
    },
    day: {
      py: '1px',
      position: 'relative',
    },
    dayButton: {
      borderRadius: 'md',
      fontSize: 'sm',
      px: 3,
      h: 8,
      outline: 'none',
      _focus: {
        outline: 'none',
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: 'outline',
        borderRadius: 'md',
      },
      '&[data-today]': {
        bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
      },
      _hover: {
        bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
        borderRadius: 'md',
      },
      _selected: selected,
      _highlighted: {
        bg: `${c}.100`,
        borderRadius: 'none',
        color: 'black',
        _dark: {
          bg: transparentize(`${c}.400`, 0.2)(props.theme),
          color: 'white',
        },
        '&[data-range-start]': {
          borderStartRadius: 'md',
        },
        '&[data-range-end]': {
          borderEndRadius: 'md',
        },
        '&[data-selection-start]': {
          borderStartRadius: 'md',
          color: 'white',
          _before: {
            content: '""',
            position: 'absolute',
            inset: '1px',
            borderRadius: 'md',
            ...selected,
          },
        },
        '&[data-selection-end]': {
          borderEndRadius: 'md',
          color: 'white',
          _before: {
            content: '""',
            position: 'absolute',
            inset: '1px',
            borderRadius: 'md',
            ...selected,
          },
        },
      },
      _disabled: {
        color: 'muted',
      },
      '&[data-week-start], &[data-month-start]': { borderStartRadius: 'md' },
      '&[data-week-end], &[data-month-end]': {
        borderEndRadius: 'md',
      },
    },
    dayLabel: {
      position: 'relative',
      zIndex: 1,
    },
  }
}

export const datePickerStyleConfig = {
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle,
}
