import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => {
  return {
    container: {
      rounded: 'lg',
      bg: mode('white', 'whiteAlpha.100')(props),
      boxShadow: 'sm',
      border: mode('1px', 0)(props),
      borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
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
      px: 4,
      py: 2,
    },
    footer: {
      p: 4,
    },
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  const borderColor = c && mode(`${c}.500`, `${c}.500`)(props)

  return {
    container: {
      bg: 'transparent',
      boxShadow: 'none',
      border: '1px',
      borderColor: borderColor,
    },
  }
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  const bg = c
    ? mode(`${c}.500`, `${c}.500`)(props)
    : mode('blackAlpha.100', 'whiteAlpha.100')(props)

  const color = c ? 'white' : 'inherit'

  return {
    container: {
      border: 'none',
      boxShadow: 'none',
      bg,
      color,
    },
  }
}

export default {
  parts: ['container', 'header', 'title', 'subtitle', 'body', 'footer'],
  baseStyle,
  variants: {
    outline: variantOutline,
    solid: variantSolid,
  },
}
