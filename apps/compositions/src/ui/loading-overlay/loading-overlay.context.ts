'use client'

import { createSlotRecipeContext } from '@chakra-ui/react'
import { loadingOverlaySlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/loading-overlay'

export const {
  useStyles: useLoadingOverlayStyles,
  withContext,
  withProvider,
} = createSlotRecipeContext({
  recipe: loadingOverlaySlotRecipe,
})
