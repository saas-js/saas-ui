import { drawerAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const drawerSlotRecipe = defineSlotRecipe({
  slots: drawerAnatomy.keys(),
  className: 'chakra-drawer',
  base: {
    backdrop: {
      layerStyle: 'backdrop',
      pos: 'fixed',
      insetInlineStart: 0,
      top: 0,
      w: '100vw',
      h: '100dvh',
      zIndex: 'layer-4',
      _open: {
        animationName: 'fade-in',
        animationDuration: 'slow',
      },
      _closed: {
        animationName: 'fade-out',
        animationDuration: 'moderate',
      },
    },
    positioner: {
      '--drawer-z-index': 'zIndex.layer-4',
      display: 'flex',
      width: '100vw',
      height: '100dvh',
      position: 'fixed',
      padding: 2,
      insetInlineStart: 0,
      top: 0,
      zIndex: 'calc(var(--drawer-z-index) + var(--layer-index, 0))',
      overscrollBehaviorY: 'none',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      zIndex: 'calc(var(--drawer-z-index) + var(--layer-index, 0))',
      textStyle: 'sm',
      maxH: '100dvh',
      color: 'inherit',
      layerStyle: 'overlay',
      _open: {
        animationDuration: 'slowest',
        animationTimingFunction: 'ease-in-smooth',
      },
      _closed: {
        animationDuration: 'slower',
        animationTimingFunction: 'ease-in-smooth',
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 0,
      px: '6',
      py: '4',
    },
    body: {
      px: '6',
      py: '2',
      flex: '1',
      overflow: 'auto',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '3',
      px: '6',
      pt: '2',
      pb: '4',
    },
    title: {
      textStyle: 'lg',
      fontWeight: 'semibold',
    },
    description: {
      color: 'fg.muted',
    },
    closeTrigger: {
      position: 'absolute',
      top: '4',
      right: '4',
    },
  },

  variants: {
    size: {
      xs: {
        content: {
          maxW: 'xs',
        },
      },
      sm: {
        content: {
          maxW: 'md',
        },
      },
      md: {
        content: {
          maxW: 'lg',
        },
      },
      lg: {
        content: {
          maxW: '2xl',
        },
      },
      xl: {
        content: {
          maxW: '4xl',
        },
      },
      full: {
        content: {
          maxW: '100vw',
          h: '100dvh',
        },
      },
    },

    placement: {
      start: {
        positioner: {
          justifyContent: 'flex-start',
        },
        content: {
          _open: {
            animationName: {
              base: 'slide-from-left-full, fade-in',
              _rtl: 'slide-from-right-full, fade-in',
            },
          },
          _closed: {
            animationName: {
              base: 'slide-to-left-full, fade-out',
              _rtl: 'slide-to-right-full, fade-out',
            },
          },
        },
      },

      end: {
        positioner: {
          justifyContent: 'flex-end',
        },
        content: {
          _open: {
            animationName: {
              base: 'slide-from-right-full, fade-in',
              _rtl: 'slide-from-left-full, fade-in',
            },
          },
          _closed: {
            animationName: {
              base: 'slide-to-right-full, fade-out',
              _rtl: 'slide-to-right-full, fade-out',
            },
          },
        },
      },

      top: {
        positioner: {
          alignItems: 'flex-start',
        },
        content: {
          maxW: '100%',
          _open: { animationName: 'slide-from-top-full, fade-in' },
          _closed: { animationName: 'slide-to-top-full, fade-out' },
        },
      },

      bottom: {
        positioner: {
          alignItems: 'flex-end',
        },
        content: {
          maxW: '100%',
          _open: { animationName: 'slide-from-bottom-full, fade-in' },
          _closed: { animationName: 'slide-to-bottom-full, fade-out' },
        },
      },
    },

    attached: {
      true: {
        positioner: {
          padding: 0,
        },
        content: {
          borderRadius: 'none',
        },
      },
    },
  },

  defaultVariants: {
    size: 'xs',
    placement: 'end',
  },
})
