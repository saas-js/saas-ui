import { defineSlotRecipe } from '@chakra-ui/react'

export const sidebarNavItemSlotRecipe = defineSlotRecipe({
  className: 'sui-sidebar-nav-item',
  slots: ['item', 'button', 'endElement'],
  base: {
    item: {
      position: 'relative',
      fontSize: 'sm',
      py: '1px',
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
      focusVisibleRing: 'inside',
      focusRingWidth: '1px',
      '& > svg': {
        boxSize: 4,
        color: 'var(--sidebar-item-icon-color)',
      },
      '&:has([data-slot="endElement"])': {
        pe: 0,
      },
    },
    endElement: {
      display: 'flex',
      gap: '1px',
      ms: 'auto',
      '& button': {
        _hover: {
          bg: 'transparent',
        },
      },
    },
  },
  variants: {
    variant: {
      muted: {
        button: {
          bg: 'transparent',
          color: 'sidebar.accent.fg/85',
          '--sidebar-item-icon-color': 'sidebar.accent.fg/85',
          _hover: {
            bg: 'sidebar.accent.bg/90',
            color: 'sidebar.accent.fg',
            '--sidebar-item-icon-color': 'sidebar.accent.fg',
          },
          _active: {
            bg: 'sidebar.accent.bg',
            color: 'sidebar.accent.fg',
            '--sidebar-item-icon-color': 'sidebar.accent.fg',
          },
        },
      },
    },
    size: {
      sm: {
        item: {
          textStyle: 'sm',
        },
        button: {
          borderRadius: 'control.md',
          px: 2,
          height: 7,
        },
        endElement: {
          pe: '1',
        },
      },
      md: {
        item: {
          textStyle: 'sm',
        },
        button: {
          borderRadius: 'control.md',
          px: 2.5,
          height: 8,
        },
        endElement: {
          pe: '1',
        },
      },
      lg: {
        item: {
          textStyle: 'sm',
        },
        button: {
          borderRadius: 'control.lg',
          px: 3,
          height: 10,
        },
        endElement: {
          pe: '1',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'muted',
    size: 'md',
  },
})
