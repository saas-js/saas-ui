import { defineSlotRecipe } from 'src/def'

export const sidebarNavItemSlotRecipe = defineSlotRecipe({
  className: 'sui-sidebar-nav-item',
  jsx: ['Sidebar.NavItem', 'Sidebar.NavButton', 'Sidebar.NavItemEndElement'],
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
      cursor: 'pointer',
      transitionProperty: 'common',
      transitionDuration: 'fast',
      focusVisibleRing: 'inside',
      focusRingWidth: '1px',
      '& > svg': {
        boxSize: 4,
        // color: '',
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
          color: 'fg/85',
          '--sidebar-item-icon-color': 'fg/85',
          _hover: {
            bg: 'sidebar.accent.bg/90',
            color: 'fg',
            '--sidebar-item-icon-color': 'fg',
          },
          _active: {
            bg: 'sidebar.accent.bg',
            color: 'fg',
            '--sidebar-item-icon-color': 'fg',
          },
        },
      },
    },
    size: {
      sm: {
        item: {
          fontSize: 'sm',
        },
        button: {
          borderRadius: 'l2',
          px: 1.5,
          height: 7,
        },
        endElement: {
          pe: '1',
        },
      },
      md: {
        item: {
          fontSize: 'sm',
        },
        button: {
          borderRadius: 'l2',
          px: 3,
          height: 8,
        },
        endElement: {
          pe: '1',
        },
      },
      lg: {
        item: {
          fontSize: 'sm',
        },
        button: {
          borderRadius: 'l3',
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
