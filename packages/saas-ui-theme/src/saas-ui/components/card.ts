import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('card').parts(
  'container',
  'header',
  'title',
  'subtitle',
  'body',
  'footer'
)

const baseStyle: PartsStyleFunction<typeof parts> = () => {
  return {
    container: {
      rounded: 'lg',
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

const variantShadow: PartsStyleFunction<typeof parts> = (props) => {
  const { isHoverable } = props
  return {
    container: {
      borderColor: mode('blackAlpha.200', 'whiteAlpha.50')(props),
      _hover: {
        borderColor:
          isHoverable && mode('blackAlpha.300', 'whiteAlpha.300')(props),
      },
    },
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
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

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
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
  parts: parts.keys,
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
