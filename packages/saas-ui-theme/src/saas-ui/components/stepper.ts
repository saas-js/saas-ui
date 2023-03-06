import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'
import { getBinaryMetadata } from '@swc/core'

import { parts } from '../../base/components/stepper'

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      bg: `gray.500`,
      _dark: {
        bg: `gray.600`,
      },
      color: 'white',
      '[data-active] &': {
        bg: `${c}.500`,
      },
      '[data-completed] &': {
        bg: `${c}.500`,
      },
    },
    separator: {
      '&[data-active]': {
        borderColor: `${c}.500`,
      },
    },
    step: {
      '&[data-active]:before, &[data-completed]': {
        borderColor: `${c}.500`,
      },
    },
  }
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      bg: 'gray.500',
      _dark: {
        bg: `gray.600`,
      },
      color: 'white',
      '[data-active] &': {
        bg: `${c}.500`,
        outlineColor: `${c}.500`,
        outlineWidth: '1px',
        outlineStyle: 'solid',
        outlineOffset: '2px',
      },
      '[data-completed] &': {
        bg: `${c}.500`,
      },
    },
    separator: {
      '&[data-active]': {
        borderColor: `${c}.500`,
      },
    },
    step: {
      '&[data-active]:before, &[data-completed]': {
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
  colorScheme: 'primary',
  size: 'md',
}

export default {
  defaultProps,
  variants,
}
