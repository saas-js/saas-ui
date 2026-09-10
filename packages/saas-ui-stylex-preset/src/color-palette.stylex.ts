import * as stylex from '@stylexjs/stylex'

import { semanticColors } from './semantic-tokens/colors.stylex.ts'

export const colorPalette = stylex.defineVars({
  solid: semanticColors.graySolid,
  contrast: semanticColors.grayContrast,
  fg: semanticColors.grayFg,
  muted: semanticColors.grayMuted,
  subtle: semanticColors.graySubtle,
  emphasized: semanticColors.grayEmphasized,
  border: semanticColors.grayBorder,
  focusRing: semanticColors.grayFocusRing,
})
