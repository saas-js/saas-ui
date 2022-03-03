import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

import { parts } from '../../base/components/stepper'

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      bg: mode(`gray.500`, `gray.600`)(props),
      color: 'white',
      '[data-active=true] &': {
        bg: `${c}.500`,
      },
      '[data-completed=true] &': {
        bg: `${c}.500`,
      },
    },
    separator: {
      '&[data-active=true]': {
        borderColor: `${c}.500`,
      },
    },
  }
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      bg: mode(`gray.500`, `gray.600`)(props),
      color: 'white',
      '[data-active=true] &': {
        bg: `${c}.500`,
        outlineColor: `${c}.500`,
        outlineWidth: '1px',
        outlineStyle: 'solid',
        outlineOffset: '2px',
      },
      '[data-completed=true] &': {
        bg: `${c}.500`,
      },
    },
    separator: {
      '&[data-active=true]': {
        borderColor: `${c}.500`,
      },
    },
  }
}

const variants = {
  solid: variantSolid,
  outline: variantOutline,
}

const defaultProps = {
  variant: 'outline',
  colorScheme: 'purple',
  size: 'md',
}

export default {
  defaultProps,
  variants,
}
