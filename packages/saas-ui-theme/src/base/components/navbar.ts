import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = anatomy('navbar').parts(
  'container',
  'inner',
  'brand',
  'content',
  'item',
  'link'
)

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

export const navbarTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: {
      display: 'flex',
      bg: 'chakra-body-bg',
      zIndex: 'overlay',
      width: 'full',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      data: {
        '& [data-menu-open=true]': {
          border: 'none',
        },
      },
    },
    inner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      height: 'var(--navbar-height)',
      px: 6,
      gap: 4,
      flexWrap: 'nowrap',
    },
    toggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 6,
      height: 'full',
      outline: 'none',
      borderRadius: 'sm',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 'full',
      bg: 'transparent',
      textDecoration: 'none',
      color: 'inherit',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      listStyle: 'none',
    },
    item: {
      display: 'inline-flex',
      p: 0,
    },
    link: {
      color: 'current',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      borderRadius: 'md',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      lineHeight: 1,
      px: 3,
      h: 8,
      _focusVisible: {
        outline: 'none',
        boxShadow: 'outline',
      },
      _hover: {
        bg: 'gray.100',
        textDecoration: 'none',
        _dark: {
          bg: 'gray.700',
        },
      },
      _active: {
        fontWeight: 'semibold',
      },
    },
  }),
})
