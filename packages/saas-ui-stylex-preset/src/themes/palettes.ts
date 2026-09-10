import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'

export const grayPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.graySolid,
  contrast: semanticColors.grayContrast,
  fg: semanticColors.grayFg,
  muted: semanticColors.grayMuted,
  subtle: semanticColors.graySubtle,
  emphasized: semanticColors.grayEmphasized,
  border: semanticColors.grayBorder,
  focusRing: semanticColors.grayFocusRing,
})

export const zincPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.zincSolid,
  contrast: semanticColors.zincContrast,
  fg: semanticColors.zincFg,
  muted: semanticColors.zincMuted,
  subtle: semanticColors.zincSubtle,
  emphasized: semanticColors.zincEmphasized,
  border: semanticColors.zincBorder,
  focusRing: semanticColors.zincFocusRing,
})

export const neutralPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.neutralSolid,
  contrast: semanticColors.neutralContrast,
  fg: semanticColors.neutralFg,
  muted: semanticColors.neutralMuted,
  subtle: semanticColors.neutralSubtle,
  emphasized: semanticColors.neutralEmphasized,
  border: semanticColors.neutralBorder,
  focusRing: semanticColors.neutralFocusRing,
})

export const stonePalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.stoneSolid,
  contrast: semanticColors.stoneContrast,
  fg: semanticColors.stoneFg,
  muted: semanticColors.stoneMuted,
  subtle: semanticColors.stoneSubtle,
  emphasized: semanticColors.stoneEmphasized,
  border: semanticColors.stoneBorder,
  focusRing: semanticColors.stoneFocusRing,
})

export const redPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.redSolid,
  contrast: semanticColors.redContrast,
  fg: semanticColors.redFg,
  muted: semanticColors.redMuted,
  subtle: semanticColors.redSubtle,
  emphasized: semanticColors.redEmphasized,
  border: semanticColors.redBorder,
  focusRing: semanticColors.redFocusRing,
})

export const orangePalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.orangeSolid,
  contrast: semanticColors.orangeContrast,
  fg: semanticColors.orangeFg,
  muted: semanticColors.orangeMuted,
  subtle: semanticColors.orangeSubtle,
  emphasized: semanticColors.orangeEmphasized,
  border: semanticColors.orangeBorder,
  focusRing: semanticColors.orangeFocusRing,
})

export const amberPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.amberSolid,
  contrast: semanticColors.amberContrast,
  fg: semanticColors.amberFg,
  muted: semanticColors.amberMuted,
  subtle: semanticColors.amberSubtle,
  emphasized: semanticColors.amberEmphasized,
  border: semanticColors.amberBorder,
  focusRing: semanticColors.amberFocusRing,
})

export const yellowPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.yellowSolid,
  contrast: semanticColors.yellowContrast,
  fg: semanticColors.yellowFg,
  muted: semanticColors.yellowMuted,
  subtle: semanticColors.yellowSubtle,
  emphasized: semanticColors.yellowEmphasized,
  border: semanticColors.yellowBorder,
  focusRing: semanticColors.yellowFocusRing,
})

export const limePalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.limeSolid,
  contrast: semanticColors.limeContrast,
  fg: semanticColors.limeFg,
  muted: semanticColors.limeMuted,
  subtle: semanticColors.limeSubtle,
  emphasized: semanticColors.limeEmphasized,
  border: semanticColors.limeBorder,
  focusRing: semanticColors.limeFocusRing,
})

export const greenPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.greenSolid,
  contrast: semanticColors.greenContrast,
  fg: semanticColors.greenFg,
  muted: semanticColors.greenMuted,
  subtle: semanticColors.greenSubtle,
  emphasized: semanticColors.greenEmphasized,
  border: semanticColors.greenBorder,
  focusRing: semanticColors.greenFocusRing,
})

export const emeraldPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.emeraldSolid,
  contrast: semanticColors.emeraldContrast,
  fg: semanticColors.emeraldFg,
  muted: semanticColors.emeraldMuted,
  subtle: semanticColors.emeraldSubtle,
  emphasized: semanticColors.emeraldEmphasized,
  border: semanticColors.emeraldBorder,
  focusRing: semanticColors.emeraldFocusRing,
})

export const tealPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.tealSolid,
  contrast: semanticColors.tealContrast,
  fg: semanticColors.tealFg,
  muted: semanticColors.tealMuted,
  subtle: semanticColors.tealSubtle,
  emphasized: semanticColors.tealEmphasized,
  border: semanticColors.tealBorder,
  focusRing: semanticColors.tealFocusRing,
})

export const cyanPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.cyanSolid,
  contrast: semanticColors.cyanContrast,
  fg: semanticColors.cyanFg,
  muted: semanticColors.cyanMuted,
  subtle: semanticColors.cyanSubtle,
  emphasized: semanticColors.cyanEmphasized,
  border: semanticColors.cyanBorder,
  focusRing: semanticColors.cyanFocusRing,
})

export const skyPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.skySolid,
  contrast: semanticColors.skyContrast,
  fg: semanticColors.skyFg,
  muted: semanticColors.skyMuted,
  subtle: semanticColors.skySubtle,
  emphasized: semanticColors.skyEmphasized,
  border: semanticColors.skyBorder,
  focusRing: semanticColors.skyFocusRing,
})

export const bluePalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.blueSolid,
  contrast: semanticColors.blueContrast,
  fg: semanticColors.blueFg,
  muted: semanticColors.blueMuted,
  subtle: semanticColors.blueSubtle,
  emphasized: semanticColors.blueEmphasized,
  border: semanticColors.blueBorder,
  focusRing: semanticColors.blueFocusRing,
})

export const indigoPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.indigoSolid,
  contrast: semanticColors.indigoContrast,
  fg: semanticColors.indigoFg,
  muted: semanticColors.indigoMuted,
  subtle: semanticColors.indigoSubtle,
  emphasized: semanticColors.indigoEmphasized,
  border: semanticColors.indigoBorder,
  focusRing: semanticColors.indigoFocusRing,
})

export const violetPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.violetSolid,
  contrast: semanticColors.violetContrast,
  fg: semanticColors.violetFg,
  muted: semanticColors.violetMuted,
  subtle: semanticColors.violetSubtle,
  emphasized: semanticColors.violetEmphasized,
  border: semanticColors.violetBorder,
  focusRing: semanticColors.violetFocusRing,
})

export const purplePalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.purpleSolid,
  contrast: semanticColors.purpleContrast,
  fg: semanticColors.purpleFg,
  muted: semanticColors.purpleMuted,
  subtle: semanticColors.purpleSubtle,
  emphasized: semanticColors.purpleEmphasized,
  border: semanticColors.purpleBorder,
  focusRing: semanticColors.purpleFocusRing,
})

export const fuchsiaPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.fuchsiaSolid,
  contrast: semanticColors.fuchsiaContrast,
  fg: semanticColors.fuchsiaFg,
  muted: semanticColors.fuchsiaMuted,
  subtle: semanticColors.fuchsiaSubtle,
  emphasized: semanticColors.fuchsiaEmphasized,
  border: semanticColors.fuchsiaBorder,
  focusRing: semanticColors.fuchsiaFocusRing,
})

export const pinkPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.pinkSolid,
  contrast: semanticColors.pinkContrast,
  fg: semanticColors.pinkFg,
  muted: semanticColors.pinkMuted,
  subtle: semanticColors.pinkSubtle,
  emphasized: semanticColors.pinkEmphasized,
  border: semanticColors.pinkBorder,
  focusRing: semanticColors.pinkFocusRing,
})

export const rosePalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.roseSolid,
  contrast: semanticColors.roseContrast,
  fg: semanticColors.roseFg,
  muted: semanticColors.roseMuted,
  subtle: semanticColors.roseSubtle,
  emphasized: semanticColors.roseEmphasized,
  border: semanticColors.roseBorder,
  focusRing: semanticColors.roseFocusRing,
})

export const basePalette = stylex.createTheme(colorPalette, {
  solid: colors.baseSolid,
  contrast: colors.baseContrast,
  fg: colors.baseFg,
  muted: colors.baseMuted,
  subtle: colors.baseSubtle,
  emphasized: colors.baseEmphasized,
  border: colors.baseBorder,
  focusRing: colors.baseFocusRing,
})

export const accentPalette = stylex.createTheme(colorPalette, {
  solid: semanticColors.accentSolid,
  contrast: semanticColors.accentContrast,
  fg: semanticColors.accentFg,
  muted: semanticColors.accentMuted,
  subtle: semanticColors.accentSubtle,
  emphasized: semanticColors.accentEmphasized,
  border: semanticColors.accentBorder,
  focusRing: semanticColors.accentFocusRing,
})

export const paletteThemes = {
  gray: grayPalette,
  zinc: zincPalette,
  neutral: neutralPalette,
  stone: stonePalette,
  red: redPalette,
  orange: orangePalette,
  amber: amberPalette,
  yellow: yellowPalette,
  lime: limePalette,
  green: greenPalette,
  emerald: emeraldPalette,
  teal: tealPalette,
  cyan: cyanPalette,
  sky: skyPalette,
  blue: bluePalette,
  indigo: indigoPalette,
  violet: violetPalette,
  purple: purplePalette,
  fuchsia: fuchsiaPalette,
  pink: pinkPalette,
  rose: rosePalette,
  base: basePalette,
  accent: accentPalette,
} as const

export type ColorPaletteName = keyof typeof paletteThemes
