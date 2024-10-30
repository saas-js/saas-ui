import { defineConfig } from '@chakra-ui/react'

import { animationStyles } from './animation-styles'
import { breakpoints } from './breakpoints'
import { globalCss } from './global-css'
import { layerStyles } from './layer-styles'
import { recipes } from './recipes'
import { semanticColors } from './semantic-tokens/colors'
import { semanticShadows } from './semantic-tokens/shadows'
import { slotRecipes } from './slot-recipes'
import { textStyles } from './text-styles'
import { animations } from './tokens/animations'
import { aspectRatios } from './tokens/aspect-ratios'
import { blurs } from './tokens/blurs'
import { borders } from './tokens/borders'
import { colors } from './tokens/colors'
import { durations } from './tokens/durations'
import { easings } from './tokens/easings'
import { fontSizes } from './tokens/font-sizes'
import { fontWeights } from './tokens/font-weights'
import { fonts } from './tokens/fonts'
import { keyframes } from './tokens/keyframes'
import { letterSpacings } from './tokens/letter-spacing'
import { lineHeights } from './tokens/line-heights'
import { radii } from './tokens/radius'
import { sizes } from './tokens/sizes'
import { spacing } from './tokens/spacing'
import { zIndices } from './tokens/z-indices'

export const defaultThemeConfig = defineConfig({
  preflight: true,
  cssVarsPrefix: 'sui',
  cssVarsRoot: ':where(:root, :host)',
  globalCss: globalCss,
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
    },
    semanticTokens: {
      colors: semanticColors,
      shadows: semanticShadows,
    },
    recipes: recipes,
    slotRecipes: slotRecipes,
    textStyles: textStyles,
    layerStyles: layerStyles,
    animationStyles: animationStyles,
  },
})
