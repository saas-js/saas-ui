import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { mode, transparentize } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

export const getStateColors = (props: Dict) => {
  const { colorScheme: c } = props
  if (c === 'gray') {
    return {
      base: mode('gray.100', 'whiteAlpha.300')(props),
      hover: mode('gray.200', 'whiteAlpha.400')(props),
      active: mode('gray.300', 'whiteAlpha.500')(props),
    }
  }

  if (c === 'white') {
    return {
      base: 'whiteAlpha.900',
      hover: 'whiteAlpha.700',
      active: 'whiteAlpha.500',
    }
  }

  return {
    base: mode(`${c}.500`, `${c}.500`)(props),
    hover: mode(`${c}.600`, `${c}.600`)(props),
    active: mode(`${c}.700`, `${c}.700`)(props),
  }
}

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600',
    color: 'black',
  },

  cyan: {
    bg: 'cyan.400',
    color: 'black',
    hoverBg: 'cyan.500',
    activeBg: 'cyan.600',
  },
}

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props

  if (c === 'white') {
    return {
      bg: 'white',
      color: 'black',
      _hover: {
        bg: `whiteAlpha.900`,
        _dark: {
          bg: `whiteAlpha.900`,
        },
        _disabled: {
          bg: 'white',
        },
      },
      _active: {
        bg: `whiteAlpha.800`,
        _dark: {
          bg: `whiteAlpha.800`,
        },
      },
      _disabled: {
        color: 'blackAlpha.700',
      },
    }
  }

  const { base, hover, active } = getStateColors(props)

  const {
    color = c === 'gray' ? mode('black', 'white')(props) : 'white',
    bg = base,
    hoverBg = hover,
    activeBg = active,
  } = accessibleColorMap[c] ?? {}

  return {
    bg,
    color,
    _hover: {
      bg: hoverBg,
      _disabled: {
        bg: bg,
      },
    },
    _active: {
      bg: activeBg,
    },
  }
})

const variantElevated = defineStyle((props) => {
  return {
    shadow: 'md',
    ...variantSolid(props),
  }
})

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props
  const { base, hover, active } = getStateColors(props)
  return {
    ...variantGhost(props),
    borderColor: c === 'gray' ? hover : base,
    borderWidth: '1px',
    _hover: {
      borderColor: c === 'gray' ? active : hover,
    },
  }
})

const variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: 'inherit',
      _dark: {
        color: 'whiteAlpha.900',
      },
      _hover: {
        bg: `blackAlpha.100`,
        _dark: {
          bg: 'whiteAlpha.200',
        },
      },
      _active: {
        bg: 'blackAlpha.200',
        _dark: {
          bg: 'whiteAlpha.300',
        },
      },
    }
  }

  if (c === 'white') {
    return {
      color: 'white',
      _hover: {
        bg: 'whiteAlpha.200',
      },
      _active: 'whiteAlpha.300',
    }
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

  return {
    color: `${c}.600`,
    _dark: {
      color: `${c}.200`,
    },
    bg: 'transparent',
    _hover: {
      bg: `${c}.50`,
      _dark: {
        bg: darkHoverBg,
      },
    },
    _active: {
      bg: `${c}.100`,
      _dark: {
        bg: darkActiveBg,
      },
    },
  }
})

const variantSubtle = defineStyle((props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: `inherit`,
      bg: `blackAlpha.100`,
      _dark: {
        bg: `whiteAlpha.100`,
        color: `whiteAlpha.900`,
      },
      _hover: {
        bg: `blackAlpha.200`,
        _dark: {
          color: `white.200`,
        },
      },
      _active: {
        bg: `blackAlpha.300`,
        _dark: {
          bg: `whiteAlpha.300`,
        },
      },
    }
  }

  const bgColor = c === 'white' ? 'white' : mode(`${c}.500`, `${c}.200`)(props)
  const bg = transparentize(bgColor, 0.1)(theme)
  const hoverBg = transparentize(bgColor, 0.16)(theme)
  const activeBg = transparentize(bgColor, 0.24)(theme)

  return {
    color: c === 'white' ? 'white' : mode(`${c}.600`, `${c}.200`)(props),
    bg: bg,
    _hover: {
      bg: hoverBg,
    },
    _active: {
      bg: activeBg,
    },
  }
})

const variantLink = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    color: c === 'white' ? 'white' : mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: 'underline',
      _disabled: {
        textDecoration: 'none',
      },
    },
    _active: {
      color:
        c === 'white' ? 'whiteAlpha.800' : mode(`${c}.700`, `${c}.500`)(props),
    },
  }
})

const variantPrimary = defineStyle((props) => {
  let { colorScheme } = props

  if (colorScheme === 'gray') {
    colorScheme = 'primary'
  }

  return variantSolid({
    ...props,
    variant: 'solid',
    colorScheme,
  })
})

const variantSecondary = defineStyle((props) => {
  return variantSolid({
    ...props,
    variant: 'solid',
  })
})

const variantTertiary = defineStyle((props) => {
  return variantOutline({
    ...props,
    variant: 'outline',
  })
})

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    size: 'sm',
  },
  variants: {
    solid: variantSolid,
    ghost: variantGhost,
    outline: variantOutline,
    subtle: variantSubtle,
    elevated: variantElevated,
    link: variantLink,
    primary: variantPrimary,
    secondary: variantSecondary,
    tertiary: variantTertiary,
  },
})
