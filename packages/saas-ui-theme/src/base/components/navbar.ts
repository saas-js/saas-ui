import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'

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

const $bg = cssVar('navbar-bg')
const $color = cssVar('navbar-text-color', 'currentColor')
const $linkBg = cssVar('navbar-link-bg', 'transparent')

const accessibleColors = ['yellow', 'cyan']

export const navbarTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle(({ colorScheme }) => {
    let color = 'currentColor'
    if (colorScheme) {
      color = accessibleColors.includes(colorScheme)
        ? 'colors.black'
        : 'colors.white'
    }

    return {
      container: {
        display: 'flex',
        [$bg.variable]: colorScheme
          ? `colors.${colorScheme}.500`
          : 'chakra-body-bg',
        [$color.variable]: color,
        bg: $bg.reference,
        color: $color.reference,
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
        bg: $linkBg.reference,
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
          [$linkBg.variable]: `colors.blackAlpha.100`,
          textDecoration: 'none',
          _dark: {
            [$linkBg.variable]: `colors.whiteAlpha.200`,
          },
        },
        _active: {
          fontWeight: 'semibold',
        },
      },
    }
  }),
})
