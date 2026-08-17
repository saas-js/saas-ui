'use client'

import {
  type UseDisclosureReturn,
  createContext,
  createSlotRecipeContext,
} from '@chakra-ui/react'
import { splitPageSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/split-page'

export const [SplitPageProvider, useSplitPage] =
  createContext<UseDisclosureReturn>({
    strict: true,
    errorMessage: 'SplitPage context not available.',
  })

export const {
  withProvider,
  withContext,
  useStyles: useSplitPageStyles,
  useClassNames,
} = createSlotRecipeContext({
  recipe: splitPageSlotRecipe,
})
