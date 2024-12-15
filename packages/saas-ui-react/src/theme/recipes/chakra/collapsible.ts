import { defineSlotRecipe } from '@chakra-ui/react'
import { collapsibleAnatomy } from '@chakra-ui/react/anatomy'

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: collapsibleAnatomy.keys(),
  className: 'chakra-collapsible',
  base: {
    content: {
      _open: {
        animationName: 'expand-height, fade-in',
        animationDuration: 'moderate',
      },
      _closed: {
        animationName: 'collapse-height, fade-out',
        animationDuration: 'moderate',
        overflow: 'hidden',
      },
    },
  },
})
