export { flattenTokens, toCssVarName, toStylexKey } from './flatten.ts'
export { conditions, getStylexCondition } from './conditions.ts'
export { properties, getProperty } from './properties.ts'
export { parseTokenReference, resolveStyleValue } from './resolve-token.ts'
export { transformStyleObject } from './transform-style.ts'
export { recipeClassNames } from './recipe.ts'
export { ThemeProvider } from './theme.tsx'
export type { ThemeProviderProps } from './theme.tsx'
export {
  createAppearanceArtifact,
  createAppearanceCss,
  createAppearanceCssVars,
  createAppearanceStylex,
  createAppearanceThemeVars,
  resolveAppearanceSeeds,
} from './create-appearance.ts'
export type {
  AppearanceCssOptions,
  AppearanceFormat,
  AppearanceThemeInput,
} from './create-appearance.ts'
export { paletteThemes } from './themes/palettes.ts'
export type { ColorPaletteName } from './themes/palettes.ts'
export * from './recipes/index.ts'
export {
  cardBody,
  cardDescription,
  cardDescriptionVariants,
  cardFooter,
  cardHeader,
  cardRoot,
  cardRootSizes,
  cardRootVariants,
  cardSlotRecipe,
  cardSlotStyles,
  cardTitle,
  cardTitleSizes,
} from './slot-recipes/card.ts'
export type { CardSize, CardVariant } from './slot-recipes/card.ts'

/**
 * StyleX variables must be imported from their `.stylex.ts` files:
 *
 * ```ts
 * import { colors } from '@saas-ui/stylex-preset/tokens/colors.stylex'
 * import { colorPalette } from '@saas-ui/stylex-preset/color-palette.stylex'
 * ```
 */
