import {
  anatomy,
  mode,
  transparentize,
  PartsStyleFunction,
} from '@chakra-ui/theme-tools'
import { theme as baseTheme } from '@chakra-ui/react'

const parts = anatomy('sidebar-item').parts(
  'container',
  'link',
  'inner',
  'icon',
  'label',
  'meta'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive } = props
  return {
    container: {
      margin: '1px',
      '.saas-sidebar__condensed &': {
        px: 0,
      },
    },
    link: {
      display: 'flex',
      rounded: 'md',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textDecoration: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      _hover: {
        textDecoration: 'none',
      },
      _focus: {
        outline: 0,
        boxShadow: 'outline',
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
      '.saas-sidebar__condensed &': {
        padding: 0,
        justifyContent: 'center',
      },
    },
    inner: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      flex: 1,
      '.saas-sidebar__condensed &': {
        display: 'none',
      },
    },
    icon: {
      display: 'flex',
      color: 'sidebar-muted',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      '.saas-sidebar__condensed &': {
        me: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  }
}

const variantNeutral: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive } = props

  const hoverBg = mode('blackAlpha.100', 'whiteAlpha.200')(props)
  const activeBg = mode('blackAlpha.200', 'whiteAlpha.300')(props)

  return {
    link: {
      bg: isActive && activeBg,
      _hover: {
        bg: isActive ? activeBg : hoverBg,
      },
      _active: {
        bg: activeBg,
      },
    },
    icon: {
      opacity: isActive ? 1 : 0.8,
    },
  }
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive, colorScheme: c, theme } = props

  const color = mode(`${c}.700`, `${c}.200`)(props)
  const activeBg = mode(
    transparentize(`${c}.500`, 0.3)(theme),
    transparentize(`${c}.500`, 0.3)(theme)
  )(props)

  return isActive
    ? {
        link: {
          bg: activeBg,
          _hover: {
            bg: activeBg,
          },
          _active: {
            bg: activeBg,
          },
          color,
        },
        icon: {
          color,
        },
        label: {
          fontWeight: 'semibold',
        },
      }
    : {
        link: {
          _hover: {
            bg: mode('blackAlpha.100', 'whiteAlpha.200')(props),
          },
        },
      }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { isActive, colorScheme: c } = props

  const activeBg = `${c}.500`

  return isActive
    ? {
        link: {
          bg: activeBg,
          _hover: {
            bg: activeBg,
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
    : {
        link: {
          _hover: {
            bg: mode('blackAlpha.100', 'whiteAlpha.200')(props),
          },
        },
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
      link: baseTheme.components.Button.sizes.xs,
      icon: {
        me: 2,
        fontSize: 'xs',
      },
    },
    sm: {
      link: baseTheme.components.Button.sizes.sm,
      icon: {
        me: 2,
        fontSize: 'sm',
      },
    },
    md: {
      link: baseTheme.components.Button.sizes.md,
      icon: {
        me: 2,
        fontSize: 'md',
      },
    },
    lg: {
      link: baseTheme.components.Button.sizes.lg,
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
