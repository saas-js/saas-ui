import { defineSlotRecipe } from '#system'

export const sidebarSlotRecipe = defineSlotRecipe({
  className: 'sui-sidebar',
  slots: [
    'root',
    'backdrop',
    'section',
    'trigger',
    'group',
    'groupTitle',
    'item',
    'track',
  ],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    backdrop: {
      bg: 'blackAlpha.200',
      position: 'fixed',
      inset: 0,
      zIndex: 'layer-3',
      _open: {
        animationName: 'fade-in',
        animationDuration: 'slow',
      },
      _closed: {
        animationName: 'fade-out',
        animationDuration: 'moderate',
      },
    },
    trigger: {
      display: 'inline-flex',
      appearance: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      outline: 'none',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
    },
    group: {},
    groupTitle: {
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
    item: {},
    track: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: '4px',
    },
  },
  variants: {
    mode: {
      collapsible: {
        root: {
          width: 'var(--sidebar-width, 280px)',
          maxWidth: ['100vw', 'var(--sidebar-max-width, 320px)'],
          minWidth: 'var(--sidebar-min-width, 220px)',
          borderRightWidth: '1px',
          bg: 'sidebar.bg',
          transitionProperty: 'margin-left',
          _open: {
            marginLeft: 0,
            transitionDuration: 'normal',
            transitionTimingFunction: 'bounce-in',
          },
          _closed: {
            marginLeft: 'calc(var(--sidebar-width, 280px) * -1)',
            transitionDuration: 'fast',
            transitionTimingFunction: 'bounce-out',
          },
        },
      },
      flyout: {
        root: {
          width: '280px',
          maxWidth: ['100vw', '320px'],
          minWidth: '220px',
          bg: 'sidebar.bg',
        },
      },
      compact: {},
    },
    variant: {
      muted: {},
      solid: {},
      subtle: {},
    },
    size: {
      md: {
        root: {
          py: 3,
        },
        section: {
          px: 3,
        },
      },
    },
  },
  defaultVariants: {
    mode: 'collapsible',
    variant: 'muted',
    size: 'md',
  },
})
