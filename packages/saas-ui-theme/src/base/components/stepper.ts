import { anatomy, getColor, mode, transparentize } from '@chakra-ui/theme-tools'
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

  const isVertical = orientation === 'vertical'

  const borderWidth = size === 'lg' ? 2 : 1

  const separator = isVertical
    ? {
        minHeight: 4,
        borderLeftWidth: borderWidth,
        borderTopWidth: 0,
        mx: 4,
      }
    : {
        borderTopWidth: borderWidth,
        mx: 3,
      }

  const content = isVertical
    ? {
        borderLeftWidth: borderWidth,
        ms: size === 'lg' ? 4 : 3,
        ps: 5,
      }
    : {}

  return {
    container: {
      flexDirection: 'column',
    },
    steps: {
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: isVertical ? 'stretch' : 'center',
    },
    step: {
      flexDirection: 'row',
      py: 2,
    },
    separator: {
      ...separator,
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    icon: {
      bg: 'whiteAlpha.400',
      lineHeight: 1,
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
      '[data-active=true] &': {
        bg: getBg(props),
        color: mode(`${c}.500`, `${c}.200`)(props),
      },
      '[data-completed=true] &': {
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
      '[data-active=true] &': {
        bg: mode(`${c}.500`, `${c}.200`)(props),
      },
      '[data-completed=true] &': {
        bg: mode(`${c}.500`, `${c}.200`)(props),
      },
    },
    separator: {
      '&[data-active=true]': {
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
    separator: {
      mx: 3,
    },
  },
  lg: {
    icon: {
      boxSize: 8,
      me: 2,
    },
    title: {
      fontSize: 'lg',
    },
    separator: {},
  },
}

const defaultProps = {
  variant: 'solid',
  colorScheme: 'blue',
  size: 'lg',
}

export default {
  parts: parts.keys,
  defaultProps,
  baseStyle,
  variants,
  sizes,
}
