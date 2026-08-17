'use client'

import { createSlotRecipeContext } from '@chakra-ui/react'
import { asideSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/aside'

export const {
  withProvider,
  withContext,
  useStyles: useAsideStyles,
} = createSlotRecipeContext({
  recipe: asideSlotRecipe,
})
