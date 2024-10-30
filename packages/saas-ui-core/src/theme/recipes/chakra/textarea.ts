import { defineRecipe } from '@chakra-ui/react'

import { inputRecipe } from './input'

export const textareaRecipe = defineRecipe({
  className: 'chakra-textarea',
  base: {
    ...inputRecipe.base,
    paddingY: '2',
    minHeight: '20',
    lineHeight: 'short',
    verticalAlign: 'top',
  },
  variants: inputRecipe.variants!,
  defaultVariants: inputRecipe.defaultVariants,
})
