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
      color: 'gray.900',
      minW: 1,
      _dark: {
        color: 'whiteAlpha.900',
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
      minW: 1,
      _hover: {
        textDecoration: 'none',
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: 'outline',
      },
    },
    inner: {
      display: 'flex',
      flex: 1,
      w: '100%',
      alignItems: 'center',
      minW: 1,
    },
    label: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    icon: {
      display: 'flex',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      alignItems: 'center',
      justifyContent: 'center',
      width: '4',
      ml: '-0.25rem',
    },
  }
}

const variantNeutral: PartsStyleFunction<typeof parts> = (props) => {
  return {
    link: {
      _hover: {
        bg: 'blackAlpha.100',
        _dark: {
          bg: `whiteAlpha.200`,
        },
      },
      _active: {
        bg: 'blackAlpha.200',
        _dark: {
          bg: `whiteAlpha.300`,
        },
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

  return {
    link: {
      _hover: {
        bg: `blackAlpha.100`,
        _dark: {
          bg: `whiteAlpha.200`,
        },
      },
      _active: {
        bg: transparentize(`${c}.500`, 0.3)(theme),
        fontWeight: 'semibold',
        color: `${c}.600`,
        _dark: {
          bg: transparentize(`${c}.500`, 0.3)(theme),
          color: `${c}.100`,
        },
      },
    },
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  return {
    link: {
      _hover: {
        bg: 'blackAlpha.100',
        _dark: {
          bg: `whiteAlpha.200`,
        },
      },
      _active: {
        bg: `${c}.500`,
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
