import {
  mode,
  PartsStyleFunction,
  anatomy,
  transparentize,
} from '@chakra-ui/theme-tools'

const parts = anatomy('date-picker').parts(
  'dialog',
  'calendar',
  'header',
  'title',
  'weekday',
  'day',
  'dayButton',
  'dayLabel'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props: any) => {
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
    dialog: {},
    calendar: {},
    header: {
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 'sm',
      flex: 1,
      px: 3,
    },
    weekday: {
      fontWeight: 'normal',
      color: 'muted',
      fontSize: 'sm',
      h: 10,
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
        bg: mode('blackAlpha.50', 'whiteAlpha.50')(props),
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
        cursor: 'not-allowed',
        _hover: {
          bg: 'transparent',
        },
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
    year: {
      py: 2,
      px: 3,
      fontSize: 'sm',
      borderRadius: 'md',
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
  }
}

export const datePickerStyleConfig = {
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle,
}
