import { defineConfig } from '@chakra-ui/react'

import { animationStyles } from './animation-styles.ts'
import { breakpoints } from './breakpoints.ts'
import { conditions } from './conditions.ts'
import { globalCss } from './global-css.ts'
import { keyframes } from './keyframes.ts'
import { layerStyles } from './layer-styles.ts'
import { recipes } from './recipes.ts'
import { semanticColors } from './semantic-tokens/colors.ts'
import { semanticRadii } from './semantic-tokens/radii.ts'
import { semanticShadows } from './semantic-tokens/shadows.ts'
import { slotRecipes } from './slot-recipes.ts'
import { textStyles } from './text-styles.ts'
import { animations } from './tokens/animations.ts'
import { aspectRatios } from './tokens/aspect-ratios.ts'
import { blurs } from './tokens/blurs.ts'
import { borders } from './tokens/borders.ts'
import { colors } from './tokens/colors.ts'
import { cursor } from './tokens/cursor.ts'
import { durations } from './tokens/durations.ts'
import { easings } from './tokens/easings.ts'
import { fontSizes } from './tokens/font-sizes.ts'
import { fontWeights } from './tokens/font-weights.ts'
import { fonts } from './tokens/fonts.ts'
import { letterSpacings } from './tokens/letter-spacings.ts'
import { lineHeights } from './tokens/line-heights.ts'
import { radii } from './tokens/radii.ts'
import { sizes } from './tokens/sizes.ts'
import { spacing } from './tokens/spacing.ts'
import { zIndices } from './tokens/z-indices.ts'
import { utilities } from './utilities.ts'

export const defaultThemeConfig = defineConfig({
  preflight: true,
  cssVarsPrefix: 'chakra',
  cssVarsRoot: ':where(html, .chakra-theme)',
  globalCss: globalCss,
  utilities: utilities,
  theme: {
    breakpoints: breakpoints,
    keyframes: keyframes,
    tokens: {
      animations,
      aspectRatios,
      blurs,
      borders,
      colors,
      durations,
      easings,
      fonts,
      fontSizes,
      fontWeights,
      letterSpacings,
      lineHeights,
      radii,
      spacing,
      sizes,
      zIndex: zIndices,
      cursor,
    },
    semanticTokens: {
      colors: semanticColors,
      radii: semanticRadii,
      shadows: semanticShadows,
    },
    recipes: recipes,
    slotRecipes: slotRecipes,
    textStyles: textStyles,
    layerStyles: layerStyles,
    animationStyles: animationStyles,
  },
  conditions,
})
