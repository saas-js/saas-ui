import { defineSlotRecipe } from '@chakra-ui/react'

export const appShellSlotRecipe = defineSlotRecipe({
  className: 'sui-app-shell',
  slots: ['root', 'content', 'main'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      display: 'flex',
      flex: 1,
      minWidth: 0,
      minHeight: 0,
    },
    main: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      minWidth: 0,
    },
  },
  variants: {
    position: {
      static: {
        root: {
          height: '100vh',
        },
      },
      fullscreen: {
        root: {
          position: 'fixed',
          inset: 0,
        },
      },
    },
    variant: {
      plain: {},
      raised: {
        main: {
          boxShadow: 'xs',
          zIndex: 'layer-1',
        },
      },
    },
  },
  defaultVariants: {
    position: 'static',
    variant: 'raised',
  },
})
