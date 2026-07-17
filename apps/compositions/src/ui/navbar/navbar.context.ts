'use client'

import { createSlotRecipeContext } from '@chakra-ui/react'
import { navbarSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/navbar'

export const {
  withProvider,
  withContext,
  useStyles: useNavbarStyles,
} = createSlotRecipeContext({
  recipe: navbarSlotRecipe,
})
