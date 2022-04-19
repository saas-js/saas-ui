import {
  anatomy,
  getColor,
  mode,
  orient,
  transparentize,
} from '@chakra-ui/theme-tools'
import type {
  PartsStyleFunction,
  StyleFunctionProps,
} from '@chakra-ui/theme-tools'

export const parts = anatomy('stepper').parts(
  'container',
  'steps',
  'icon',
  'content',
  'title',
  'separator'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { orientation, size } = props

  const borderWidth = size === 'lg' ? 2 : 1

  const content = orient({
    orientation,
    vertical: {
      borderLeftWidth: borderWidth,
      ms: size === 'lg' ? 4 : 3,
      ps: 5,
    },
    horizontal: {},
  })

  const steps = orient({
    orientation,
    vertical: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: { base: 'flex-start', sm: 'center' },
      position: 'relative',
    },
  })

  const step = orient({
    orientation,
    vertical: {
      flexDirection: 'row',
    },
    horizontal: {
      flexDirection: { base: 'column', sm: 'row' },
      flex: { base: '1 1', sm: 'inherit' },
      position: 'relative',
      _before: {
        content: '""',
        transitionProperty: 'common',
        transitionDuration: 'normal',
        borderTopWidth: borderWidth,
        borderColor: 'inherit',
        display: 'block',
        position: { base: 'absolute', sm: 'static' },

        left: { base: 'calc(-50% + 24px)', sm: 0 },
        right: { base: 'calc(50% + 24px)', sm: 0 },
        top: 6,
      },
      '&:first-of-type:before': {
        display: 'none',
      },
    },
  })

  const title = orient({
    orientation,
    vertical: {},
    horizontal: {
      mt: { base: 2, sm: 0 },
      textAlign: 'center',
    },
  })

  const separator = orient({
    orientation,
    vertical: {
      minHeight: 4,
      borderLeftWidth: borderWidth,
      borderTopWidth: 0,
      mx: size === 'lg' ? 4 : 3,
    },
    horizontal: {
      borderTopWidth: borderWidth,
      mx: { base: 0, sm: 3 },
      mt: { base: 5, sm: 0 },
      alignSelf: { base: 'flex-start', sm: 'center' },
      flex: { base: 'inherit', sm: 1 },
    },
  })

  const icon = orient({
    orientation,
    vertical: { me: 2 },
    horizontal: {
      me: { base: 0, sm: 2 },
    },
  })

  return {
    container: {
      flexDirection: 'column',
    },
    steps,
    step: {
      ...step,
      py: 2,
    },
    title,
    separator: {
      ...separator,
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    icon: {
      ...icon,
      bg: 'whiteAlpha.400',
      lineHeight: 1,
      flexShrink: 0,
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    content,
  }
}

function getBg(props: StyleFunctionProps): string {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return mode(lightBg, darkBg)(props)
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      bg: mode('blackAlpha.300', 'whiteAlpha.200')(props),
      color: mode('blackAlpha.600', 'whiteAlpha.600')(props),
      '[data-active] &': {
        bg: getBg(props),
        color: mode(`${c}.500`, `${c}.200`)(props),
      },
      '[data-completed] &': {
        bg: getBg(props),
        color: mode(`${c}.500`, `${c}.200`)(props),
      },
    },
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    icon: {
      bg: `gray.500`,
      color: mode('white', 'gray.800')(props),
      '[data-active] &': {
        bg: mode(`${c}.500`, `${c}.200`)(props),
      },
      '[data-completed] &': {
        bg: mode(`${c}.500`, `${c}.200`)(props),
      },
    },
    separator: {
      '&[data-active]': {
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
      },
    },
    step: {
      '&[data-active]:before, &[data-completed]:before': {
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
      },
    },
  }
}

const variants = {
  subtle: variantSubtle,
  solid: variantSolid,
}

const sizes = {
  md: {
    icon: {
      boxSize: 6,
      fontSize: 'sm',
    },
    title: {
      fontSize: 'md',
    },
    step: {
      _before: {
        top: 5,
      },
    },
  },
  lg: {
    icon: {
      boxSize: 8,
    },
    title: {
      fontSize: 'lg',
    },
  },
}

const defaultProps = {
  variant: 'solid',
  colorScheme: 'blue',
  orientation: 'horizontal',
  size: 'lg',
}

export default {
  parts: parts.keys,
  defaultProps,
  baseStyle,
  variants,
  sizes,
}
