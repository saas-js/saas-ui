import { defineSlotRecipe } from '@chakra-ui/react'

export const sidebarNavItemSlotRecipe = defineSlotRecipe({
  className: 'sui-sidebar-nav-item',
  slots: ['item', 'button', 'endElement'],
  base: {
    item: {
      position: 'relative',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      isolation: 'isolate',
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      cursor: 'button',
      transitionProperty: 'common',
      transitionDuration: 'fast',
      focusVisibleRing: 'outside',
      '& > svg': {
        boxSize: 4,
      },
    },
  },
  variants: {
    variant: {
      muted: {
        button: {
          bg: 'transparent',
          color: 'sidebar.accent.fg/85',
          _hover: {
            bg: 'sidebar.accent.bg/90',
            color: 'sidebar.accent.fg',
          },
          _active: {
            bg: 'sidebar.accent.bg',
            color: 'sidebar.accent.fg',
          },
        },
      },
    },
    size: {
      md: {
        item: {
          fontSize: 'sm',
        },
        button: {
          borderRadius: 'md',
          px: 2,
          height: 8,
          '&:has(:nth-child(3))': {
            pe: 0,
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'muted',
    size: 'md',
  },
})
