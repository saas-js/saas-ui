'use client'

import { createSlotRecipeContext } from '@chakra-ui/react'
import { personaSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/persona'

export const {
  useStyles: usePersonaStyles,
  useRecipeResult,
  usePropsContext,
  withProvider,
  withContext,
  ClassNamesProvider,
  PropsProvider,
  StylesProvider,
} = createSlotRecipeContext({
  key: 'suiPersona',
  recipe: personaSlotRecipe,
})
