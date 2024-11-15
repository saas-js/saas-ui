import { defineSlotRecipe } from '@chakra-ui/react'

export const nprogressSlotRecipe = defineSlotRecipe({
  slots: ['root', 'bar'],
  base: {
    root: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      zIndex: 2,
      transition: 'opacity var(--nprogress-duration) linear',
      pointerEvents: 'none',
      opacity: 1,
      '&[data-finished]': {
        opacity: 0,
      },
    },
    bar: {
      width: '100%',
      height: '2px',
      bg: 'colorPalette.solid',
      transition: 'margin-left var(--nprogress-duration) linear',
      ml: 'var(--nprogress-offset)',
    },
  },
})
