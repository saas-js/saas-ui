import {
  anatomy,
  mode,
  SystemStyleFunction,
  PartsStyleFunction,
} from '@chakra-ui/theme-tools'

export const parts = anatomy('persona').parts(
  'container',
  'avatar',
  'label',
  'secondaryLabel',
  'tertiaryLabel'
)

const baseStyleLabel: SystemStyleFunction = (props) => {
  return {
    color: mode('gray.500', 'whiteAlpha.600')(props),
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props: any) => {
  return {
    label: {},
    secondaryLabel: baseStyleLabel(props),
    tertiaryLabel: baseStyleLabel(props),
  }
}

const sizes = {
  '2xs': {
    details: { ms: 2 },
    label: {
      fontSize: 'xs',
    },
    secondaryLabel: { display: 'none' },
    tertiaryLabel: { display: 'none' },
  },
  xs: {
    details: { ms: 2 },
    label: {
      fontSize: 'md',
    },
    secondaryLabel: { display: 'none' },
    tertiaryLabel: { display: 'none' },
  },
  sm: {
    details: { ms: 2 },
    label: { fontSize: 'md' },
    secondaryLabel: { fontSize: 'sm' },
    tertiaryLabel: { display: 'none' },
  },
  md: {
    details: { ms: 2 },
    label: {
      fontSize: 'md',
    },
    secondaryLabel: {
      fontSize: 'sm',
    },
    tertiaryLabel: { display: 'none' },
  },
  lg: {
    details: { ms: 3 },
    label: {
      fontSize: 'md',
    },
    secondaryLabel: {
      fontSize: 'sm',
    },
    tertiaryLabel: {
      fontSize: 'sm',
    },
  },
  xl: {
    details: { ms: 3 },
    label: {
      fontSize: 'xl',
    },
    secondaryLabel: {
      fontSize: 'md',
    },
    tertiaryLabel: { fontSize: 'md' },
  },
  '2xl': {
    details: { ms: 4 },
    label: {
      fontSize: '2xl',
    },
    secondaryLabel: {
      fontSize: 'lg',
    },
    tertiaryLabel: { fontSize: 'lg' },
  },
}

export default {
  parts: parts.keys,
  defaultProps: {
    size: 'md',
  },
  baseStyle,
  sizes,
}
