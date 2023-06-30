import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { sidebarAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(sidebarAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props

  return {
    container: {
      bg: c ? `${c}.500` : 'white',
      display: 'flex',
      flexDirection: 'column',
      borderRightWidth: '1px',
      _dark: {
        bg: c ? `${c}.500` : 'gray.800',
      },
    },
    overlay: {
      bg: 'blackAlpha.200',
    },
  }
})

const variantDefault = definePartsStyle((props) => {
  return {
    container: {
      width: '280px',
      maxWidth: ['100vw', '320px'],
      minWidth: '220px',
      py: 3,
      '&[data-collapsible]': {
        pt: 14,
      },
    },
    section: {
      px: 3,
    },
    toggleWrapper: {
      h: 8,
      mb: 4,
      display: 'none',
      '[data-collapsible] &': {
        display: 'block',
      },
    },
  }
})

const variantCondensed = definePartsStyle((props) => {
  return {
    container: {
      width: '14',
      py: 3,
    },
    section: {
      px: 3,
    },
    toggleWrapper: {
      display: 'none',
    },
  }
})

export const sidebarTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    compact: variantCondensed,
  },
})
