import { recipes } from './theme/recipes.ts'
import { slotRecipes } from './theme/slot-recipes.ts'

/** Stable recipe names consumed by registry validation and external builds. */
export const presetRecipeKeys = [
  ...Object.keys(recipes),
  ...Object.keys(slotRecipes),
] as const
