import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  const { isHoverable } = props
  return {
    container: {
      rounded: 'lg',
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    header: {
      p: 4,
    },
    media: {
      mb: 2,
    },
    title: {
      fontSize: 'xl',
      fontWeight: 'semibold',
    },
    subtitle: {
      color: mode('gray.400', 'gray.300')(props),
    },
    body: {
      p: 4,
    },
    footer: {
      p: 4,
    },
  }
}

const variantShadow: SystemStyleFunction = (props) => {
  const { colorScheme: c, isHoverable } = props

  return {
    container: {
      bg: mode('white', 'whiteAlpha.100')(props),
      boxShadow: 'sm',
      borderWidth: '1px',
      borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
      _hover: {
        borderColor:
          isHoverable && mode('blackAlpha.300', 'whiteAlpha.400')(props),
      },
    },
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, isHoverable } = props

  const borderColor = c && mode(`${c}.500`, `${c}.400`)(props)
  const hoverColor = c && mode(`${c}.600`, `${c}.500`)(props)

  return {
    container: {
      bg: 'transparent',
      boxShadow: 'none',
      borderWidth: '1px',
      borderColor: borderColor,
      _hover: {
        borderColor: isHoverable && hoverColor,
      },
    },
  }
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, isHoverable } = props

  const bg = c
    ? mode(`${c}.500`, `${c}.300`)(props)
    : mode('blackAlpha.100', 'whiteAlpha.100')(props)

  const hoverBg = c
    ? mode(`${c}.600`, `${c}.400`)(props)
    : mode('blackAlpha.200', 'whiteAlpha.200')(props)

  const color = c ? 'white' : 'inherit'

  return {
    container: {
      border: 'none',
      boxShadow: 'none',
      bg,
      color,
      _hover: {
        bg: isHoverable && hoverBg,
      },
    },
  }
}

export default {
  defaultProps: {
    variant: 'shadow',
  },
  parts: ['container', 'header', 'title', 'subtitle', 'body', 'footer'],
  baseStyle,
  variants: {
    shadow: variantShadow,
    outline: variantOutline,
    solid: variantSolid,
  },
}
