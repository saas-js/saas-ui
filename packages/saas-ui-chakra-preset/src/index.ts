import { createSystem, defaultBaseConfig, mergeConfigs } from '@chakra-ui/react'

import { defaultThemeConfig } from './theme/index.ts'
import { utilities } from './theme/utilities.ts'

export {
  createAppearance,
  createAppearanceCssVars,
  resolveAppearanceSeeds,
} from './appearance.ts'
export {
  createPalette,
  createScale,
  paletteSeeds,
  statusHues,
} from './theme/palette.ts'
export type {
  AccentSeed,
  AppearanceCssVars,
  AppearanceOptions,
  AppearanceOverrides,
  AppearanceSemanticTokens,
  BaseSeed,
  ColorPaletteValues,
  ColorValue,
  ContrastLevel,
  ForegroundTone,
  OklchColor,
  OklchSeed,
  ResolvedAppearanceSeeds,
  SidebarSeed,
  SolidSidebarSeed,
  TonalSidebarSeed,
} from './appearance.ts'
export type {
  ColorPalette,
  NamedColorPalette,
  PaletteSeed,
  StatusColorPalette,
} from './theme/palette.ts'

const defaultConfig = mergeConfigs(defaultBaseConfig, defaultThemeConfig)

/**
 * TODO: This is a temporary fix to add the utilities to the default config.
 */
defaultConfig.utilities = Object.assign(
  defaultConfig.utilities ?? {},
  utilities,
)

export const defaultSystem = createSystem(defaultConfig)

export { defaultSystem as system, defaultConfig }
export { presetRecipeKeys } from './recipe-keys.ts'

export type { RecipeProps, SlotRecipeProps } from './types.ts'
