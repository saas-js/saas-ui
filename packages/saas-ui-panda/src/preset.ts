import { animationStyles } from './animation-styles'
import { breakpoints } from './breakpoints'
import { definePreset } from './def'
import { globalCss } from './global-css'
import { keyframes } from './keyframes'
import { layerStyles } from './layer-styles'
import { recipes } from './recipes'
import { semanticTokens } from './semantic-tokens'
import { slotRecipes } from './slot-recipes'
import { textStyles } from './text-styles'
import { tokens } from './tokens'
import { utilities } from './utilities'

const saasUiPreset = definePreset({
  name: 'saas-ui',
  globalCss,
  theme: {
    extend: {
      breakpoints,
      keyframes,
      tokens,
      semanticTokens,
      recipes,
      slotRecipes,
      textStyles,
      layerStyles,
      animationStyles,
    },
  },
  utilities: {
    extend: utilities,
  },
  staticCss: {
    css: [
      {
        properties: {
          colorPalette: ['gray'],
          ps: ['8'],
        },
      },
    ],
  },
  conditions: {
    extend: {
      icon: '& :where(svg)',
    },
  },
})

export default saasUiPreset
