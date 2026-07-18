import { recipes } from './theme/recipes.ts'
import { slotRecipes } from './theme/slot-recipes.ts'

/** Recipe keys exported by the preset and accepted by registry templates. */
export const presetRecipeKeys = Object.freeze([
  ...Object.keys(recipes),
  ...Object.keys(slotRecipes),
])
