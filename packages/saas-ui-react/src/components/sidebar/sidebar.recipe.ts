import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const sidebarSlotRecipe = defineSlotRecipe({
  className: 'sui-sidebar',
  slots: [
    'root',
    'backdrop',
    'header',
    'body',
    'footer',
    'trigger',
    'flyoutTrigger',
    'group',
    'groupHeader',
    'groupTitle',
    'groupEndElement',
    'groupContent',
    'track',
    'inset',
  ],
  base: {
    root: {
      '--sidebar-z-index': 'zIndex.layer-3',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    backdrop: {
      layerStyle: 'backdrop',
      position: 'fixed',
      inset: 0,
      '--sidebar-backdrop-z-index': 'zIndex.layer-3',
      zIndex: 'calc(var(--sidebar-backdrop-z-index) - 2)',
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
      py: 2,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      flex: 1,
      py: 3,
      overflowY: 'auto',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      py: 2,
    },
    group: {
      position: 'relative',
    },
    groupHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
      height: 6,
      borderRadius: 'md',
      fontSize: 'xs',
      transitionProperty: 'common',
      transitionDuration: 'fast',
      // @ts-expect-error
      _groupCollapsible: {
        cursor: 'button',
        userSelect: 'none',
        _hover: {
          bg: 'sidebar.accent.bg/80',
        },
      },
    },
    groupTitle: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      px: 2,
      fontWeight: 'medium',
      color: 'sidebar.fg/70',
    },
    groupEndElement: {
      '& > button': {
        boxSize: 6,
        _hover: {
          bg: 'transparent',
        },
      },
    },
    groupContent: {
      pt: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    track: {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      right: '-4px',
      bottom: 0,
      width: '7px',
      cursor: 'button',
      _after: {
        content: '""',
        display: 'block',
        height: '100%',
        width: '2px',
        opacity: 0,
        transitionProperty: 'opacity',
        transitionDuration: 'fast',
        transitionDelay: '0.2s',
        bg: 'sidebar.accent.fg/60',
        pointerEvents: 'none',
      },
      _hover: {
        _after: {
          opacity: 1,
        },
      },
    },
    flyoutTrigger: {
      display: 'none',
    },
    inset: {
      height: '100%',
      minHeight: '0',
      display: 'flex',
      flexDirection: 'column',
      bg: 'bg.content',
    },
  },
  variants: {
    variant: {
      sidebar: {
        root: {
          borderRightWidth: '1px',
          borderLeftColor: 'sidebar.border',
        },
        inset: {},
      },
      inset: {
        inset: {
          borderColor: 'sidebar.border',
          borderWidth: '1px',
          borderRadius: 'panel.md',
          marginBlock: 'var(--inset-gap, {spacing.2})',
          marginEnd: 'var(--inset-gap, {spacing.2})',
          overflow: 'clip',
        },
      },
    },
    mode: {
      collapsible: {
        root: {
          base: {
            position: 'fixed',
            height: '100dvh',
            zIndex: 'layer-3',
          },
          md: {
            position: 'relative',
            height: 'auto',
            zIndex: 'unset',
          },
          width: 'var(--sidebar-width, 280px)',
          maxWidth: ['100vw', 'var(--sidebar-max-width, 320px)'],
          minWidth: 'var(--sidebar-min-width, 220px)',
          bg: 'sidebar.bg',
          transitionProperty: 'margin-left',
          _open: {
            marginLeft: 0,
            transitionDuration: 'moderate',
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
          position: 'fixed',
          top: 2,
          left: 2,
          bottom: 2,
          zIndex: 'var(--sidebar-z-index)',
          width: 'var(--sidebar-width, 280px)',
          maxWidth: ['100vw', 'var(--sidebar-max-width, 320px)'],
          minWidth: 'var(--sidebar-min-width, 220px)',
          bg: 'sidebar.bg',
          borderColor: 'sidebar.border',
          boxShadow: 'none',
          borderWidth: '1px',
          borderRadius: 'lg',
          _open: {
            transitionDuration: 'moderate',
            transitionTimingFunction: 'ease-out',
            boxShadow: 'lg',
          },
          _closed: {
            left: 'calc(var(--sidebar-width, 280px) * -1)',
            transitionDuration: 'fast',
            transitionTimingFunction: 'ease-in-out',
          },
        },
        flyoutTrigger: {
          display: 'block',
          position: 'absolute',
          '--sidebar-flyout-trigger-z-index': 'zIndex.layer-3',
          zIndex: 'calc(var(--sidebar-flyout-trigger-z-index) - 1)',
          height: '100%',
          width: '8px',
        },
        track: {
          top: '8px',
          bottom: '8px',
        },
      },
      compact: {},
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
        groupEndElement: {
          pe: '1',
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'inset',
      mode: 'collapsible',
      css: {
        root: {
          py: 'var(--inset-gap, {spacing.2})',

          _closed: {
            '& [class*="__inset"]': {
              ps: 'var(--inset-gap, {spacing.2})',
            },
          },
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'sidebar',
    mode: 'collapsible',
    size: 'md',
  },
})
