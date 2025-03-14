import { badgeRecipe } from '#components/badge/badge.recipe.ts'
import { buttonRecipe } from '#components/button/button.recipe.ts'
import { checkmarkRecipe } from '#components/checkmark/checkmark.recipe'
import { codeRecipe } from '#components/code/code.recipe.ts'
import { commandRecipe } from '#components/command/command.recipe.ts'
import { containerRecipe } from '#components/container/container.recipe.ts'
import { headingRecipe } from '#components/heading/heading.recipe.ts'
import { iconBadgeRecipe } from '#components/icon-badge/icon-badge.recipe.ts'
import { iconRecipe } from '#components/icon/icon.recipe.ts'
import { inputAddonRecipe } from '#components/input/input-addon.recipe.ts'
import { inputRecipe } from '#components/input/input.recipe.ts'
import { kbdRecipe } from '#components/kbd/kbd.recipe.ts'
import { linkRecipe } from '#components/link/link.recipe.ts'
import { markRecipe } from '#components/mark/mark.recipe.ts'
import { radiomarkRecipe } from '#components/radio/radiomark.recipe.ts'
import { separatorRecipe } from '#components/separator/separator.recipe.ts'
import { skeletonRecipe } from '#components/skeleton/skeleton.recipe.ts'
import { skipNavLinkRecipe } from '#components/skip-nav-link/skip-nav-link.recipe.ts'
import { spinnerRecipe } from '#components/spinner/spinner.recipe.ts'
import { textareaRecipe } from '#components/textarea/textarea.recipe.ts'

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
