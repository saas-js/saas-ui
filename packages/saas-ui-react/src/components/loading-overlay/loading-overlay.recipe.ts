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
          bg: {
            base: 'whiteAlpha.400',
            _dark: 'blackAlpha.400',
          },
        },
      },
      fullscreen: {
        root: {
          position: 'fixed',
          inset: 0,
          zIndex: 'modal',
          bg: {
            base: 'white',
            _dark: 'gray.800',
          },
        },
      },
      overlay: {
        root: {
          position: 'absolute',
          inset: 0,
          bg: {
            base: 'whiteAlpha.300',
            _dark: 'blackAlpha.300',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'fill',
  },
})
