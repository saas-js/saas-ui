import { defineSlotRecipe } from '@chakra-ui/react'
import { collapsibleAnataomy } from '@chakra-ui/react/anatomy'

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: collapsibleAnataomy.keys(),
  className: 'chakra-collapsible',
  base: {
    content: {
      overflow: 'hidden',
      _open: {
        animationName: 'expand-height, fade-in',
        animationDuration: 'moderate',
      },
      _closed: {
        animationName: 'collapse-height, fade-out',
        animationDuration: 'moderate',
      },
    },
  },
})
