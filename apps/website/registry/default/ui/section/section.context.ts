'use client'

import { createSlotRecipeContext } from '@chakra-ui/react'
import { sectionSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/section'

export const {
  withProvider,
  withContext,
  useStyles: useSectionStyles,
  useClassNames,
} = createSlotRecipeContext({
  recipe: sectionSlotRecipe,
})
