import { defineSlotRecipe } from '#system'

export const sidebarSlotRecipe = defineSlotRecipe({
  className: 'sui-sidebar',
  slots: [
    'root',
    'backdrop',
    'header',
    'body',
    'footer',
    'trigger',
    'group',
    'groupTitle',
    'groupEndElement',
    'groupContent',
    'item',
    'itemEndElement',
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
    header: {
      display: 'flex',
      flexDirection: 'row',
      py: 3,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1,
      py: 3,
      overflowY: 'auto',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      py: 3,
    },
    group: {
      position: 'relative',
    },
    groupTitle: {
      display: 'flex',
      alignItems: 'center',
      my: 1,
      height: 8,
      px: 2,
      fontSize: 'xs',
      fontWeight: 'medium',
      color: 'sidebar.fg/70',
      transitionProperty: 'common',
      transitionDuration: 'fast',
    },
    groupEndElement: {
      position: 'absolute',
      top: 2,
      right: 0,
    },
    groupContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
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
        header: {
          px: 3,
        },
        body: {
          px: 3,
        },
        footer: {
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
