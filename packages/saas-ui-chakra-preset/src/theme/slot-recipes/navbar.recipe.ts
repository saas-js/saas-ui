import { defineSlotRecipe } from '@chakra-ui/react'

export const navbarSlotRecipe = defineSlotRecipe({
  className: 'sui-navbar',
  slots: ['root', 'content', 'brand', 'itemGroup', 'item', 'link'],
  base: {
    root: {
      display: 'flex',
      zIndex: 'layer-3',
      width: 'full',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      insetX: 0,
      transitionProperty: 'common',
      transitionDuration: 'moderate',
      transitionTimingFunction: 'ease-in-out',
      _hidden: {
        transform: 'translateY(-100%)',
      },
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      height: 'var(--navbar-height)',
      flexWrap: 'nowrap',
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
    itemGroup: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 'full',
      bg: 'transparent',
    },
    link: {
      bg: 'transparent',
      color: 'currentColor',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      borderRadius: 'control.md',
      transitionProperty: 'common',
      transitionDuration: 'moderate',
      lineHeight: 1,
      _focusVisible: {
        outline: 'none',
        boxShadow: 'outline',
      },
      _hover: {
        bg: 'bg.muted',
        textDecoration: 'none',
      },
      _active: {
        fontWeight: 'semibold',
      },
    },
  },
  variants: {
    variant: {
      neutral: {
        root: {
          bg: 'bg.panel',
          color: 'fg',
        },
      },
      solid: {
        root: {
          bg: 'colorPalette.solid',
          color: 'colorPalette.contrast',
        },
        link: {
          _hover: {
            bg: 'colorPalette.contrast/10',
          },
        },
      },
      glass: {
        root: {
          bg: 'bg.overlay',
          backdropFilter: 'var(--overlay-effect)',
          color: 'fg',
        },
      },
    },
    size: {
      md: {
        root: {
          fontSize: 'sm',
        },
        content: {
          px: {
            base: 4,
            lg: 6,
          },
          gap: 4,
        },
        link: {
          px: 3,
          h: 8,
        },
      },
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
})
