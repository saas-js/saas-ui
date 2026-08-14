'use client'

import { createContext, createSlotRecipeContext } from '@chakra-ui/react'
import { pageSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/page'

export const {
  withProvider,
  withContext,
  useStyles: usePageStyles,
  useClassNames,
} = createSlotRecipeContext({
  recipe: pageSlotRecipe,
})

interface PageProviderValue {
  loading?: boolean
  skeleton?: React.ReactNode
}

export const [PageProvider, usePageContext] = createContext<PageProviderValue>()
