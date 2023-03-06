import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'
import { cardAnatomy } from '@chakra-ui/anatomy'

const baseStyle: PartsStyleFunction<typeof cardAnatomy> = () => {
  return {
    container: {
      rounded: 'lg',
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    header: {
      p: 4,
    },
    title: {
      fontSize: 'lg',
      fontWeight: 'semibold',
    },
    subtitle: {
      color: 'muted',
      fontSize: 'md',
    },
    body: {
      p: 4,
    },
    footer: {
      p: 4,
    },
  }
}

const variantShadow: PartsStyleFunction<typeof cardAnatomy> = (props) => {
  const { isHoverable } = props
  return {
    container: {
      bg: `white`,
      boxShadow: 'sm',
      borderWidth: '1px',
      borderColor: `blackAlpha.200`,
      _dark: { bg: `whiteAlpha.200`, borderColor: `whiteAlpha.50` },
      _hover: {
        borderColor:
          isHoverable && mode('blackAlpha.300', 'whiteAlpha.300')(props),
      },
    },
  }
}

const variantSolid: PartsStyleFunction<typeof cardAnatomy> = (props) => {
  const { colorScheme: c, isHoverable } = props

  const bg = c
    ? mode(`${c}.500`, `${c}.500`)(props)
    : mode('blackAlpha.100', 'whiteAlpha.100')(props)
  const hoverBg = c
    ? mode(`${c}.600`, `${c}.600`)(props)
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

const variantOutline: PartsStyleFunction<typeof cardAnatomy> = (props) => {
  const { colorScheme: c, isHoverable } = props

  const borderColor = c
    ? mode(`${c}.500`, `${c}.500`)(props)
    : mode('blackAlpha.200', 'whiteAlpha.300')(props)

  const hoverColor = c
    ? mode(`${c}.600`, `${c}.600`)(props)
    : mode('blackAlpha.300', 'whiteAlpha.400')(props)

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

export default {
  parts: cardAnatomy,
  defaultProps: {
    variant: 'shadow',
  },
  baseStyle,
  variants: {
    shadow: variantShadow,
    outline: variantOutline,
    solid: variantSolid,
  },
}
