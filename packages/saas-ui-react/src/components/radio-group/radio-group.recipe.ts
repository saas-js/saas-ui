import { radioGroupAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

import { radiomarkRecipe } from '../radio/radiomark.recipe.ts'

export const radioGroupSlotRecipe = defineSlotRecipe({
  className: 'chakra-radio-group',
  slots: radioGroupAnatomy.keys(),
  base: {
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      fontWeight: 'medium',
      _disabled: {
        cursor: 'disabled',
      },
    },

    itemControl: radiomarkRecipe.base,

    label: {
      userSelect: 'none',
      textStyle: 'sm',
      _disabled: {
        opacity: '0.5',
      },
    },
  },
  variants: {
    variant: {
      outline: {
        itemControl: radiomarkRecipe.variants?.variant?.outline,
      },

      subtle: {
        itemControl: radiomarkRecipe.variants?.variant?.subtle,
      },

      solid: {
        itemControl: radiomarkRecipe.variants?.variant?.solid,
      },
    },

    size: {
      xs: {
        item: { textStyle: 'xs', gap: '1.5' },
        itemControl: radiomarkRecipe.variants?.size?.xs,
      },

      sm: {
        item: { textStyle: 'sm', gap: '2' },
        itemControl: radiomarkRecipe.variants?.size?.sm,
      },

      md: {
        item: { textStyle: 'sm', gap: '2.5' },
        itemControl: radiomarkRecipe.variants?.size?.md,
      },

      lg: {
        item: { textStyle: 'md', gap: '3' },
        itemControl: radiomarkRecipe.variants?.size?.lg,
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})
