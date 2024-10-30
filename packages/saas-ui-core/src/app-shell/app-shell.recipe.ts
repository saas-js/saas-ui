import { defineSlotRecipe } from '#system'

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
    variant: {
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
  },
  defaultVariants: {
    variant: 'static',
  },
})
