import { defineSlotRecipe } from '@chakra-ui/react'
import { radioGroupAnatomy } from '@chakra-ui/react/anatomy'

import { radiomarkRecipe } from './radiomark'

export const radioGroupSlotRecipe = defineSlotRecipe({
  className: 'chakra-radio-group',
  slots: radioGroupAnatomy.keys(),
  base: {
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'top',
      position: 'relative',
      _disabled: {
        cursor: 'not-allowed',
      },
    },

    itemControl: radiomarkRecipe.base,

    label: {
      userSelect: 'none',
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

      classic: {
        itemControl: radiomarkRecipe.variants?.variant?.classic,
      },
    },

    size: {
      sm: {
        item: {
          textStyle: 'xs',
          gap: '0.35rem',
        },
        itemControl: {
          boxSize: '3',
        },
        label: {
          textStyle: 'xs',
        },
      },

      md: {
        item: {
          textStyle: 'sm',
          gap: '0.5rem',
        },
        itemControl: {
          boxSize: '4',
        },
        label: {
          textStyle: 'sm',
        },
      },

      lg: {
        item: {
          textStyle: 'md',
          gap: '0.5rem',
        },
        itemControl: {
          boxSize: '5',
        },
        label: {
          textStyle: 'md',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
