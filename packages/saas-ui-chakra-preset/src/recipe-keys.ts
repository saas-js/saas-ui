import { recipes } from './theme/recipes.ts'
import { slotRecipes } from './theme/slot-recipes.ts'

export const presetRecipeKeys = [
  ...Object.keys(recipes),
  ...Object.keys(slotRecipes),
] as const
