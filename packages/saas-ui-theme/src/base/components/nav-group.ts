import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { navGroupAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(navGroupAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  return {
    container: {
      '&:not(:last-of-type)': {
        mb: 4,
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      px: 3,
      my: 1,
      height: 6,
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'muted',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      '&.sui-collapse-toggle .chakra-icon': {
        opacity: 0,
      },
      '&.sui-collapse-toggle': {
        cursor: 'pointer',
        borderRadius: 'md',
        _hover: {
          bg: 'blackAlpha.100',
          '& .chakra-icon': {
            opacity: 1,
          },
          _dark: {
            bg: 'whiteAlpha.200',
          },
        },
      },
      '[data-compact] &': {
        opacity: 0,
      },
    },
    content: {},
  }
})

export const navGroupTheme = defineMultiStyleConfig({
  baseStyle,
})
