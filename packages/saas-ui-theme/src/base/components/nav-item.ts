import {
  anatomy,
  mode,
  transparentize,
  PartsStyleFunction,
} from '@chakra-ui/theme-tools'
import { theme as baseTheme } from '@chakra-ui/react'

const parts = anatomy('nav-item').parts(
  'item',
  'link',
  'inner',
  'icon',
  'label'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    item: {
      my: '2px',
    },
    link: {
      display: 'flex',
      rounded: 'md',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textDecoration: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      color: 'gray.900',
      _dark: {
        color: 'whiteAlpha.900',
      },
      _hover: {
        textDecoration: 'none',
      },
      _focusVisible: {
        boxShadow: 'outline',
      },
      ['[data-condensed] &']: {
        padding: 0,
      },
    },
    inner: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'stretch',
      ['[data-condensed] &']: {
        justifyContent: 'center',
      },
    },
    icon: {
      display: 'flex',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      color: 'gray.900',
      _dark: {
        color: 'whiteAlpha.900',
      },
      '[data-condensed] &': {
        me: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  }
}

const variantNeutral: PartsStyleFunction<typeof parts> = (props) => {
  const hoverBg = mode('blackAlpha.100', 'whiteAlpha.200')(props)
  const activeBg = mode('blackAlpha.200', 'whiteAlpha.300')(props)

  return {
    link: {
      _hover: {
        bg: hoverBg,
      },
      _active: {
        bg: activeBg,
      },
    },
    icon: {
      opacity: 0.8,
      '[data-active] &': {
        opacity: 1,
      },
    },
  }
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  const color = mode(`${c}.700`, `${c}.200`)(props)
  const activeBg = mode(
    transparentize(`${c}.500`, 0.3)(theme),
    transparentize(`${c}.500`, 0.3)(theme)
  )(props)

  return {
    link: {
      _hover: {
        bg: mode('blackAlpha.100', 'whiteAlpha.200')(props),
      },
      _active: {
        bg: activeBg,
        fontWeight: 'semibold',
      },
      color,
    },
    icon: {
      color,
    },
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  const activeBg = `${c}.500`
  const hoverBg = mode('blackAlpha.100', 'whiteAlpha.200')(props)

  return {
    link: {
      _hover: {
        bg: hoverBg,
      },
      _active: {
        bg: activeBg,
      },
      color: 'white',
    },
    icon: {
      color: 'white',
    },
    label: {},
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    size: 'sm',
    colorScheme: 'primary',
    variant: 'neutral',
  },
  baseStyle,
  sizes: {
    xs: {
      link: baseTheme.components.Button.sizes?.xs,
      icon: {
        me: 2,
        fontSize: 'xs',
      },
    },
    sm: {
      link: baseTheme.components.Button.sizes?.sm,
      icon: {
        me: 2,
        fontSize: 'sm',
      },
    },
    md: {
      link: baseTheme.components.Button.sizes?.md,
      icon: {
        me: 2,
        fontSize: 'md',
      },
    },
    lg: {
      link: baseTheme.components.Button.sizes?.lg,
      icon: {
        me: 2,
        fontSize: 'lg',
      },
    },
  },
  variants: {
    neutral: variantNeutral,
    subtle: variantSubtle,
    solid: variantSolid,
  },
}
