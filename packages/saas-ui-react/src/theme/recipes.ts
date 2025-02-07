import { badgeRecipe } from '#components/badge/badge.recipe.ts'
import { buttonRecipe } from '#components/button/button.recipe.ts'
import { commandRecipe } from '#components/command/command.recipe.ts'
import { iconBadgeRecipe } from '#components/icon-badge/icon-badge.recipe.ts'
import { inputAddonRecipe } from '#components/input/input-addon.recipe.ts'
import { inputRecipe } from '#components/input/input.recipe.ts'
import { linkRecipe } from '#components/link/link.recipe.ts'
import { spinnerRecipe } from '#components/spinner/spinner.recipe.ts'
import { textareaRecipe } from '#components/textarea/textarea.recipe.ts'

import { checkmarkRecipe } from './recipes/chakra/checkmark'
import { codeRecipe } from './recipes/chakra/code'
import { containerRecipe } from './recipes/chakra/container'
import { headingRecipe } from './recipes/chakra/heading'
import { iconRecipe } from './recipes/chakra/icon'
import { kbdRecipe } from './recipes/chakra/kbd'
import { markRecipe } from './recipes/chakra/mark'
import { radiomarkRecipe } from './recipes/chakra/radiomark'
import { separatorRecipe } from './recipes/chakra/separator'
import { skeletonRecipe } from './recipes/chakra/skeleton'
import { skipNavLinkRecipe } from './recipes/chakra/skip-nav-link'

export const recipes = {
  // Chakra UI Recipes
  badge: badgeRecipe,
  button: buttonRecipe,
  code: codeRecipe,
  container: containerRecipe,
  heading: headingRecipe,
  input: inputRecipe,
  inputAddon: inputAddonRecipe,
  kbd: kbdRecipe,
  link: linkRecipe,
  mark: markRecipe,
  separator: separatorRecipe,
  skeleton: skeletonRecipe,
  skipNavLink: skipNavLinkRecipe,
  spinner: spinnerRecipe,
  textarea: textareaRecipe,
  icon: iconRecipe,
  checkmark: checkmarkRecipe,
  radiomark: radiomarkRecipe,
  // Saas UI
  suiCommand: commandRecipe,
  suiIconBadge: iconBadgeRecipe,
}
