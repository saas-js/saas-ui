import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const appShellSlotRecipe = defineSlotRecipe({
  className: 'sui-app-shell',
  slots: ['root', 'content', 'main'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
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
    fullscreen: {
      true: {
        root: {
          position: 'fixed',
          inset: 0,
        },
      },
    },
    variant: {
      plain: {},
    },
  },
  defaultVariants: {
    fullscreen: false,
    variant: 'plain',
  },
})
