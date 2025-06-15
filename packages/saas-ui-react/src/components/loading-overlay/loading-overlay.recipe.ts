import { defineSlotRecipe } from '@chakra-ui/react'

export const loadingOverlaySlotRecipe = defineSlotRecipe({
  className: 'sui-loading-overlay',
  slots: ['root', 'text'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      transitionProperty: 'opacity',
      transitionDuration: 'slower',
      _open: {
        opacity: 1,
      },
      _closed: {
        opacity: 0,
      },
    },
  },
  variants: {
    variant: {
      fill: {
        root: {
          flex: 1,
          height: '100%',
          bg: 'currentBg',
        },
      },
      fullscreen: {
        root: {
          position: 'fixed',
          inset: 0,
          zIndex: 'modal',
          bg: 'bg',
        },
      },
      overlay: {
        root: {
          position: 'absolute',
          inset: 0,
          bg: 'currentBg/50',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'fill',
  },
})
