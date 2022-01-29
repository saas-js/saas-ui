import {
  mode,
  SystemStyleFunction,
  transparentize,
} from '@chakra-ui/theme-tools'

import { getStateColors } from '../utils'

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

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  if (c === 'white') {
    return {
      bg: 'white',
      color: 'black',
      _hover: {
        bg: mode(`whiteAlpha.900`, `whiteAlpha.900`)(props),
        _disabled: {
          bg: 'white',
        },
      },
      _active: { bg: mode(`whiteAlpha.800`, `whiteAlpha.800`)(props) },
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
    bg: bg,
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
}

const variantElevated: SystemStyleFunction = (props) => {
  return {
    shadow: 'md',
    ...variantSolid(props),
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { base } = getStateColors(props)
  return {
    borderColor: base,
    color: base,
    ...variantGhost(props),
  }
}

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
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
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: 'transparent',
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  }
}

const variantSubtle: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      bg: mode(`blackAlpha.100`, `whiteAlpha.100`)(props),
      _hover: {
        bg: mode(`blackAlpha.200`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`blackAlpha.300`, `whiteAlpha.300`)(props) },
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
}

const variantLink: SystemStyleFunction = (props) => {
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
}

export default {
  defaultProps: {
    size: 'sm',
  },
  baseStyle: {
    _focus: {
      '&:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  },
  variants: {
    solid: variantSolid,
    ghost: variantGhost,
    outline: variantOutline,
    subtle: variantSubtle,
    elevated: variantElevated,
    link: variantLink,
  },
}
