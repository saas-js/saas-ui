import { badgeRecipe } from './recipes/badge.recipe.ts'
import { buttonRecipe } from './recipes/button.recipe.ts'
import { checkmarkRecipe } from './recipes/checkmark.recipe.ts'
import { codeRecipe } from './recipes/code.recipe.ts'
import { commandRecipe } from './recipes/command.recipe.ts'
import { containerRecipe } from './recipes/container.recipe.ts'
import { headingRecipe } from './recipes/heading.recipe.ts'
import { iconBadgeRecipe } from './recipes/icon-badge.recipe.ts'
import { iconRecipe } from './recipes/icon.recipe.ts'
import { inputAddonRecipe } from './recipes/input-addon.recipe.ts'
import { inputRecipe } from './recipes/input.recipe.ts'
import { kbdRecipe } from './recipes/kbd.recipe.ts'
import { linkRecipe } from './recipes/link.recipe.ts'
import { markRecipe } from './recipes/mark.recipe.ts'
import { radiomarkRecipe } from './recipes/radiomark.recipe.ts'
import { separatorRecipe } from './recipes/separator.recipe.ts'
import { skeletonRecipe } from './recipes/skeleton.recipe.ts'
import { skipNavLinkRecipe } from './recipes/skip-nav-link.recipe.ts'
import { spinnerRecipe } from './recipes/spinner.recipe.ts'
import { textareaRecipe } from './recipes/textarea.recipe.ts'

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
