'use client'

import { createSlotRecipeContext } from '@chakra-ui/react/styled-system'
import { gridListSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/grid-list'

export const {
  withProvider,
  withContext,
  useStyles: useGridListStyles,
} = createSlotRecipeContext({
  key: 'suiGridList',
  recipe: gridListSlotRecipe,
})
