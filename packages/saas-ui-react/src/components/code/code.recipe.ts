import { defineRecipe } from '@chakra-ui/react/styled-system'

import { badgeRecipe } from '#components/badge/badge.recipe'

const { variants, defaultVariants } = badgeRecipe

export const codeRecipe = defineRecipe({
  className: 'chakra-code',
  base: {
    fontFamily: 'mono',
    alignItems: 'center',
    display: 'inline-flex',
    borderRadius: 'l2',
  },
  variants,
  defaultVariants,
})
