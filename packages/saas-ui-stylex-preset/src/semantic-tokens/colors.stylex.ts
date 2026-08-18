import * as stylex from '@stylexjs/stylex'

export const semanticColors = stylex.defineVars({
  presenceOnline: 'var(--sui-colors-green-500)',
  presenceOffline: 'var(--sui-colors-gray-400)',
  presenceBusy: 'var(--sui-colors-orange-500)',
  presenceDnd: 'var(--sui-colors-red-500)',
  presenceAway: 'var(--sui-colors-gray-400)',
  statusSuccess: 'var(--sui-colors-green-500)',
  statusError: 'var(--sui-colors-red-500)',
  statusWarning: 'var(--sui-colors-orange-500)',
  statusInfo: 'var(--sui-colors-blue-500)',
  sidebarBg: 'var(--sui-color-sidebar-bg)',
  sidebarFg: 'var(--sui-color-sidebar-fg)',
  sidebarBorder: 'var(--sui-color-sidebar-border)',
  sidebarAccentBg: 'var(--sui-color-sidebar-accent-bg)',
  sidebarAccentFg: 'var(--sui-colors-sidebar-fg)',
  bg: 'light-dark(oklch(from var(--sui-base) calc(0.985 + 0.005 * max(calc(-1 * var(--sui-contrast)), 0) - 0.005 * max(var(--sui-contrast), 0)) calc(c * 0.2) h / 1), oklch(from var(--sui-base) calc(0.14 + 0.005 * max(calc(-1 * var(--sui-contrast)), 0) - 0.015 * max(var(--sui-contrast), 0)) calc(c * 0.2) h / 1))',
  bgSurface:
    'light-dark(oklch(from var(--sui-base) 1 0 h / 1), oklch(from var(--sui-base) calc(0.17 - 0.005 * max(calc(-1 * var(--sui-contrast)), 0) + 0.005 * max(var(--sui-contrast), 0)) 0 h / 1))',
  bgElevated:
    'light-dark(oklch(from var(--sui-base) 1 0 h / 1), oklch(from var(--sui-base) calc(0.2 - 0.015 * max(calc(-1 * var(--sui-contrast)), 0) + 0.025 * max(var(--sui-contrast), 0)) calc(c * 0.45) h / 1))',
  bgInset:
    'light-dark(oklch(from var(--sui-base) calc(0.965 + 0.01 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.35) h / 1), oklch(from var(--sui-base) calc(0.11 + 0.01 * max(calc(-1 * var(--sui-contrast)), 0) - 0.025 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 1))',
  bgOverlay:
    'light-dark(oklch(from var(--sui-base) 1 0 h / 0.95), oklch(from var(--sui-base) calc(0.2 - 0.015 * max(calc(-1 * var(--sui-contrast)), 0) + 0.025 * max(var(--sui-contrast), 0)) calc(c * 0.45) h / 0.9))',
  bgBackdrop: 'oklch(0 0 0 / 0.3)',
  bgInverted:
    'light-dark(oklch(from var(--sui-base) 0.16 calc(c * 0.4) h / 1), oklch(from var(--sui-base) 0.985 calc(c * 0.08) h / 1))',
  bgMuted: 'var(--sui-colors-bg-inset)',
  bgSubtle: 'var(--sui-colors-interaction-hover)',
  bgEmphasized: 'var(--sui-colors-interaction-pressed)',
  bgContent: 'var(--sui-colors-bg)',
  bgPanel: 'var(--sui-colors-bg-surface)',
  bgError: 'light-dark(var(--sui-colors-red-50), var(--sui-colors-red-950))',
  bgWarning:
    'light-dark(var(--sui-colors-orange-50), var(--sui-colors-orange-950))',
  bgSuccess:
    'light-dark(var(--sui-colors-green-50), var(--sui-colors-green-950))',
  bgInfo: 'light-dark(var(--sui-colors-blue-50), var(--sui-colors-blue-950))',
  fg: 'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 1), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 1))',
  fgMuted:
    'light-dark(oklch(from var(--sui-base) calc(0.42 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.55) h / 1), oklch(from var(--sui-base) calc(0.72 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.55) h / 1))',
  fgSubtle:
    'light-dark(oklch(from var(--sui-base) calc(0.52 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.5) h / 1), oklch(from var(--sui-base) calc(0.6 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.5) h / 1))',
  fgEmphasized:
    'light-dark(oklch(from var(--sui-base) calc(0.26 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.4) h / 1), oklch(from var(--sui-base) calc(0.84 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.4) h / 1))',
  fgInverted:
    'light-dark(oklch(from var(--sui-base) 0.985 calc(c * 0.08) h / 1), oklch(from var(--sui-base) 0.16 calc(c * 0.4) h / 1))',
  fgError: 'light-dark(var(--sui-colors-red-500), var(--sui-colors-red-400))',
  fgWarning:
    'light-dark(var(--sui-colors-orange-600), var(--sui-colors-orange-300))',
  fgSuccess:
    'light-dark(var(--sui-colors-green-600), var(--sui-colors-green-300))',
  fgInfo: 'light-dark(var(--sui-colors-blue-600), var(--sui-colors-blue-300))',
  border:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.1 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0))), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.12 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0))))',
  borderMuted:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.055 - 0.011 * max(calc(-1 * var(--sui-contrast)), 0) + 0.011 * max(var(--sui-contrast), 0))), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.066 - 0.011 * max(calc(-1 * var(--sui-contrast)), 0) + 0.0165 * max(var(--sui-contrast), 0))))',
  borderSubtle:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.075 - 0.015 * max(calc(-1 * var(--sui-contrast)), 0) + 0.015 * max(var(--sui-contrast), 0))), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.09 - 0.015 * max(calc(-1 * var(--sui-contrast)), 0) + 0.0225 * max(var(--sui-contrast), 0))))',
  borderEmphasized:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.17 - 0.03 * max(calc(-1 * var(--sui-contrast)), 0) + 0.05 * max(var(--sui-contrast), 0))), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.21 - 0.04 * max(calc(-1 * var(--sui-contrast)), 0) + 0.05 * max(var(--sui-contrast), 0))))',
  borderInverted:
    'light-dark(oklch(from var(--sui-base) 0.985 calc(c * 0.2) h / 0.8), oklch(from var(--sui-base) 0.16 calc(c * 0.2) h / 0.8))',
  borderError:
    'light-dark(var(--sui-colors-red-500), var(--sui-colors-red-400))',
  borderWarning:
    'light-dark(var(--sui-colors-orange-500), var(--sui-colors-orange-400))',
  borderSuccess:
    'light-dark(var(--sui-colors-green-500), var(--sui-colors-green-400))',
  borderInfo:
    'light-dark(var(--sui-colors-blue-500), var(--sui-colors-blue-400))',
  interactionHover:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.05 - 0.01 * max(calc(-1 * var(--sui-contrast)), 0) + 0.01 * max(var(--sui-contrast), 0))), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.07 - 0.01 * max(calc(-1 * var(--sui-contrast)), 0) + 0.01 * max(var(--sui-contrast), 0))))',
  interactionPressed:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.08 - 0.01 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0))), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / calc(0.11 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0))))',
  interactionSelected: 'var(--sui-colors-accent-subtle)',
  accentContrast:
    'oklch(from var(--sui-accent) calc(0.16 + 0.825 * var(--sui-accent-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-accent-foreground-tone))), calc(0.025 - 0.01 * var(--sui-accent-foreground-tone))) h / 1)',
  accentFg:
    'light-dark(oklch(from var(--sui-accent) min(l, 0.44) min(calc(c * 0.65), 0.18) h / 1), oklch(from var(--sui-accent) max(l, 0.78) min(calc(c * 0.65), 0.18) h / 1))',
  accentMuted:
    'light-dark(oklch(from var(--sui-accent) l c h / 0.07), oklch(from var(--sui-accent) l c h / 0.1))',
  accentSubtle:
    'light-dark(oklch(from var(--sui-accent) l c h / 0.11), oklch(from var(--sui-accent) l c h / 0.16))',
  accentEmphasized:
    'light-dark(oklch(from var(--sui-accent) l c h / 0.18), oklch(from var(--sui-accent) l c h / 0.24))',
  accentSolid: 'oklch(from var(--sui-accent) l c h / 1)',
  accentFocusRing: 'var(--sui-colors-accent-solid)',
  accentBorder:
    'light-dark(oklch(from var(--sui-accent) l c h / 0.32), oklch(from var(--sui-accent) l c h / 0.44))',
  neutralContrast:
    'light-dark(var(--sui-colors-white), var(--sui-colors-black))',
  neutralFg:
    'light-dark(var(--sui-colors-neutral-800), var(--sui-colors-neutral-200))',
  neutralMuted:
    'light-dark(var(--sui-colors-neutral-100), var(--sui-colors-neutral-900))',
  neutralSubtle:
    'light-dark(var(--sui-colors-neutral-200), var(--sui-colors-neutral-800))',
  neutralEmphasized:
    'light-dark(var(--sui-colors-neutral-300), var(--sui-colors-neutral-700))',
  neutralSolid:
    'light-dark(var(--sui-colors-neutral-900), var(--sui-colors-white))',
  neutralFocusRing: 'var(--sui-colors-neutral-600)',
  neutralBorder:
    'light-dark(var(--sui-colors-neutral-300), var(--sui-colors-neutral-700))',
  slateContrast: 'white',
  slateFg:
    'light-dark(var(--sui-colors-slate-800), var(--sui-colors-slate-200))',
  slateMuted:
    'light-dark(var(--sui-colors-slate-100), var(--sui-colors-slate-900))',
  slateSubtle:
    'light-dark(var(--sui-colors-slate-200), var(--sui-colors-slate-800))',
  slateEmphasized:
    'light-dark(var(--sui-colors-slate-300), var(--sui-colors-slate-700))',
  slateSolid: 'var(--sui-colors-slate-500)',
  slateFocusRing: 'var(--sui-colors-slate-600)',
  slateBorder:
    'light-dark(var(--sui-colors-slate-200), var(--sui-colors-slate-800))',
  grayContrast: 'white',
  grayFg: 'light-dark(var(--sui-colors-gray-800), var(--sui-colors-gray-200))',
  grayMuted:
    'light-dark(var(--sui-colors-gray-100), var(--sui-colors-gray-900))',
  graySubtle:
    'light-dark(var(--sui-colors-gray-200), var(--sui-colors-gray-800))',
  grayEmphasized:
    'light-dark(var(--sui-colors-gray-300), var(--sui-colors-gray-700))',
  graySolid: 'var(--sui-colors-gray-500)',
  grayFocusRing: 'var(--sui-colors-gray-600)',
  grayBorder:
    'light-dark(var(--sui-colors-gray-300), var(--sui-colors-gray-700))',
  zincContrast: 'white',
  zincFg: 'light-dark(var(--sui-colors-zinc-800), var(--sui-colors-zinc-200))',
  zincMuted:
    'light-dark(var(--sui-colors-zinc-100), var(--sui-colors-zinc-900))',
  zincSubtle:
    'light-dark(var(--sui-colors-zinc-200), var(--sui-colors-zinc-800))',
  zincEmphasized:
    'light-dark(var(--sui-colors-zinc-300), var(--sui-colors-zinc-700))',
  zincSolid: 'var(--sui-colors-zinc-500)',
  zincFocusRing: 'var(--sui-colors-zinc-600)',
  zincBorder:
    'light-dark(var(--sui-colors-zinc-300), var(--sui-colors-zinc-700))',
  stoneContrast: 'white',
  stoneFg:
    'light-dark(var(--sui-colors-stone-800), var(--sui-colors-stone-200))',
  stoneMuted:
    'light-dark(var(--sui-colors-stone-100), var(--sui-colors-stone-900))',
  stoneSubtle:
    'light-dark(var(--sui-colors-stone-200), var(--sui-colors-stone-800))',
  stoneEmphasized:
    'light-dark(var(--sui-colors-stone-300), var(--sui-colors-stone-700))',
  stoneSolid: 'var(--sui-colors-stone-500)',
  stoneFocusRing: 'var(--sui-colors-stone-600)',
  stoneBorder:
    'light-dark(var(--sui-colors-stone-300), var(--sui-colors-stone-700))',
  redContrast: 'white',
  redFg: 'light-dark(var(--sui-colors-red-700), var(--sui-colors-red-300))',
  redMuted: 'light-dark(var(--sui-colors-red-50), var(--sui-colors-red-950))',
  redSubtle: 'light-dark(var(--sui-colors-red-100), var(--sui-colors-red-900))',
  redEmphasized:
    'light-dark(var(--sui-colors-red-200), var(--sui-colors-red-800))',
  redSolid: 'var(--sui-colors-red-600)',
  redFocusRing: 'var(--sui-colors-red-600)',
  redBorder: 'light-dark(var(--sui-colors-red-300), var(--sui-colors-red-600))',
  orangeContrast: 'light-dark(white, black)',
  orangeFg:
    'light-dark(var(--sui-colors-orange-700), var(--sui-colors-orange-300))',
  orangeMuted:
    'light-dark(var(--sui-colors-orange-50), var(--sui-colors-orange-950))',
  orangeSubtle:
    'light-dark(var(--sui-colors-orange-100), var(--sui-colors-orange-900))',
  orangeEmphasized:
    'light-dark(var(--sui-colors-orange-200), var(--sui-colors-orange-800))',
  orangeSolid: 'var(--sui-colors-orange-600)',
  orangeFocusRing: 'var(--sui-colors-orange-600)',
  orangeBorder:
    'light-dark(var(--sui-colors-orange-300), var(--sui-colors-orange-600))',
  amberContrast: 'black',
  amberFg:
    'light-dark(var(--sui-colors-amber-700), var(--sui-colors-amber-300))',
  amberMuted:
    'light-dark(var(--sui-colors-amber-50), var(--sui-colors-amber-950))',
  amberSubtle:
    'light-dark(var(--sui-colors-amber-100), var(--sui-colors-amber-900))',
  amberEmphasized:
    'light-dark(var(--sui-colors-amber-200), var(--sui-colors-amber-800))',
  amberSolid: 'var(--sui-colors-amber-400)',
  amberFocusRing: 'var(--sui-colors-amber-400)',
  amberBorder:
    'light-dark(var(--sui-colors-amber-300), var(--sui-colors-amber-600))',
  yellowContrast: 'black',
  yellowFg:
    'light-dark(var(--sui-colors-yellow-700), var(--sui-colors-yellow-300))',
  yellowMuted:
    'light-dark(var(--sui-colors-yellow-50), var(--sui-colors-yellow-950))',
  yellowSubtle:
    'light-dark(var(--sui-colors-yellow-100), var(--sui-colors-yellow-900))',
  yellowEmphasized:
    'light-dark(var(--sui-colors-yellow-200), var(--sui-colors-yellow-800))',
  yellowSolid: 'var(--sui-colors-yellow-400)',
  yellowFocusRing: 'var(--sui-colors-yellow-400)',
  yellowBorder:
    'light-dark(var(--sui-colors-yellow-300), var(--sui-colors-yellow-600))',
  limeContrast: 'black',
  limeFg: 'light-dark(var(--sui-colors-lime-700), var(--sui-colors-lime-300))',
  limeMuted:
    'light-dark(var(--sui-colors-lime-50), var(--sui-colors-lime-950))',
  limeSubtle:
    'light-dark(var(--sui-colors-lime-100), var(--sui-colors-lime-900))',
  limeEmphasized:
    'light-dark(var(--sui-colors-lime-200), var(--sui-colors-lime-800))',
  limeSolid: 'var(--sui-colors-lime-400)',
  limeFocusRing: 'var(--sui-colors-lime-400)',
  limeBorder:
    'light-dark(var(--sui-colors-lime-300), var(--sui-colors-lime-600))',
  greenContrast: 'white',
  greenFg:
    'light-dark(var(--sui-colors-green-700), var(--sui-colors-green-300))',
  greenMuted:
    'light-dark(var(--sui-colors-green-50), var(--sui-colors-green-950))',
  greenSubtle:
    'light-dark(var(--sui-colors-green-100), var(--sui-colors-green-900))',
  greenEmphasized:
    'light-dark(var(--sui-colors-green-200), var(--sui-colors-green-800))',
  greenSolid: 'var(--sui-colors-green-600)',
  greenFocusRing: 'var(--sui-colors-green-600)',
  greenBorder:
    'light-dark(var(--sui-colors-green-300), var(--sui-colors-green-600))',
  emeraldContrast: 'white',
  emeraldFg:
    'light-dark(var(--sui-colors-emerald-700), var(--sui-colors-emerald-300))',
  emeraldMuted:
    'light-dark(var(--sui-colors-emerald-50), var(--sui-colors-emerald-950))',
  emeraldSubtle:
    'light-dark(var(--sui-colors-emerald-100), var(--sui-colors-emerald-900))',
  emeraldEmphasized:
    'light-dark(var(--sui-colors-emerald-200), var(--sui-colors-emerald-800))',
  emeraldSolid: 'var(--sui-colors-emerald-600)',
  emeraldFocusRing: 'var(--sui-colors-emerald-600)',
  emeraldBorder:
    'light-dark(var(--sui-colors-emerald-300), var(--sui-colors-emerald-600))',
  tealContrast: 'white',
  tealFg: 'light-dark(var(--sui-colors-teal-700), var(--sui-colors-teal-300))',
  tealMuted:
    'light-dark(var(--sui-colors-teal-50), var(--sui-colors-teal-950))',
  tealSubtle:
    'light-dark(var(--sui-colors-teal-100), var(--sui-colors-teal-900))',
  tealEmphasized:
    'light-dark(var(--sui-colors-teal-200), var(--sui-colors-teal-800))',
  tealSolid: 'var(--sui-colors-teal-600)',
  tealFocusRing: 'var(--sui-colors-teal-600)',
  tealBorder:
    'light-dark(var(--sui-colors-teal-300), var(--sui-colors-teal-600))',
  cyanContrast: 'white',
  cyanFg: 'light-dark(var(--sui-colors-cyan-700), var(--sui-colors-cyan-300))',
  cyanMuted:
    'light-dark(var(--sui-colors-cyan-50), var(--sui-colors-cyan-950))',
  cyanSubtle:
    'light-dark(var(--sui-colors-cyan-100), var(--sui-colors-cyan-900))',
  cyanEmphasized:
    'light-dark(var(--sui-colors-cyan-200), var(--sui-colors-cyan-800))',
  cyanSolid: 'var(--sui-colors-cyan-600)',
  cyanFocusRing: 'var(--sui-colors-cyan-600)',
  cyanBorder:
    'light-dark(var(--sui-colors-cyan-300), var(--sui-colors-cyan-600))',
  skyContrast: 'white',
  skyFg: 'light-dark(var(--sui-colors-sky-700), var(--sui-colors-sky-300))',
  skyMuted: 'light-dark(var(--sui-colors-sky-50), var(--sui-colors-sky-950))',
  skySubtle: 'light-dark(var(--sui-colors-sky-100), var(--sui-colors-sky-900))',
  skyEmphasized:
    'light-dark(var(--sui-colors-sky-200), var(--sui-colors-sky-800))',
  skySolid: 'var(--sui-colors-sky-600)',
  skyFocusRing: 'var(--sui-colors-sky-600)',
  skyBorder: 'light-dark(var(--sui-colors-sky-300), var(--sui-colors-sky-600))',
  blueContrast: 'white',
  blueFg: 'light-dark(var(--sui-colors-blue-700), var(--sui-colors-blue-300))',
  blueMuted:
    'light-dark(var(--sui-colors-blue-50), var(--sui-colors-blue-950))',
  blueSubtle:
    'light-dark(var(--sui-colors-blue-100), var(--sui-colors-blue-900))',
  blueEmphasized:
    'light-dark(var(--sui-colors-blue-200), var(--sui-colors-blue-800))',
  blueSolid: 'var(--sui-colors-blue-600)',
  blueFocusRing: 'var(--sui-colors-blue-600)',
  blueBorder:
    'light-dark(var(--sui-colors-blue-300), var(--sui-colors-blue-600))',
  indigoContrast: 'white',
  indigoFg:
    'light-dark(var(--sui-colors-indigo-700), var(--sui-colors-indigo-300))',
  indigoMuted:
    'light-dark(var(--sui-colors-indigo-50), var(--sui-colors-indigo-950))',
  indigoSubtle:
    'light-dark(var(--sui-colors-indigo-100), var(--sui-colors-indigo-900))',
  indigoEmphasized:
    'light-dark(var(--sui-colors-indigo-200), var(--sui-colors-indigo-800))',
  indigoSolid: 'var(--sui-colors-indigo-600)',
  indigoFocusRing: 'var(--sui-colors-indigo-600)',
  indigoBorder:
    'light-dark(var(--sui-colors-indigo-300), var(--sui-colors-indigo-600))',
  violetContrast: 'white',
  violetFg:
    'light-dark(var(--sui-colors-violet-700), var(--sui-colors-violet-300))',
  violetMuted:
    'light-dark(var(--sui-colors-violet-50), var(--sui-colors-violet-950))',
  violetSubtle:
    'light-dark(var(--sui-colors-violet-100), var(--sui-colors-violet-900))',
  violetEmphasized:
    'light-dark(var(--sui-colors-violet-200), var(--sui-colors-violet-800))',
  violetSolid: 'var(--sui-colors-violet-600)',
  violetFocusRing: 'var(--sui-colors-violet-600)',
  violetBorder:
    'light-dark(var(--sui-colors-violet-300), var(--sui-colors-violet-600))',
  purpleContrast: 'white',
  purpleFg:
    'light-dark(var(--sui-colors-purple-700), var(--sui-colors-purple-300))',
  purpleMuted:
    'light-dark(var(--sui-colors-purple-50), var(--sui-colors-purple-950))',
  purpleSubtle:
    'light-dark(var(--sui-colors-purple-100), var(--sui-colors-purple-900))',
  purpleEmphasized:
    'light-dark(var(--sui-colors-purple-200), var(--sui-colors-purple-800))',
  purpleSolid: 'var(--sui-colors-purple-600)',
  purpleFocusRing: 'var(--sui-colors-purple-600)',
  purpleBorder:
    'light-dark(var(--sui-colors-purple-300), var(--sui-colors-purple-600))',
  fuchsiaContrast: 'white',
  fuchsiaFg:
    'light-dark(var(--sui-colors-fuchsia-700), var(--sui-colors-fuchsia-300))',
  fuchsiaMuted:
    'light-dark(var(--sui-colors-fuchsia-50), var(--sui-colors-fuchsia-950))',
  fuchsiaSubtle:
    'light-dark(var(--sui-colors-fuchsia-100), var(--sui-colors-fuchsia-900))',
  fuchsiaEmphasized:
    'light-dark(var(--sui-colors-fuchsia-200), var(--sui-colors-fuchsia-800))',
  fuchsiaSolid: 'var(--sui-colors-fuchsia-600)',
  fuchsiaFocusRing: 'var(--sui-colors-fuchsia-600)',
  fuchsiaBorder:
    'light-dark(var(--sui-colors-fuchsia-300), var(--sui-colors-fuchsia-600))',
  pinkContrast: 'white',
  pinkFg: 'light-dark(var(--sui-colors-pink-700), var(--sui-colors-pink-300))',
  pinkMuted:
    'light-dark(var(--sui-colors-pink-50), var(--sui-colors-pink-950))',
  pinkSubtle:
    'light-dark(var(--sui-colors-pink-100), var(--sui-colors-pink-900))',
  pinkEmphasized:
    'light-dark(var(--sui-colors-pink-200), var(--sui-colors-pink-800))',
  pinkSolid: 'var(--sui-colors-pink-600)',
  pinkFocusRing: 'var(--sui-colors-pink-600)',
  pinkBorder:
    'light-dark(var(--sui-colors-pink-300), var(--sui-colors-pink-600))',
  roseContrast: 'white',
  roseFg: 'light-dark(var(--sui-colors-rose-700), var(--sui-colors-rose-300))',
  roseMuted:
    'light-dark(var(--sui-colors-rose-50), var(--sui-colors-rose-950))',
  roseSubtle:
    'light-dark(var(--sui-colors-rose-100), var(--sui-colors-rose-900))',
  roseEmphasized:
    'light-dark(var(--sui-colors-rose-200), var(--sui-colors-rose-800))',
  roseSolid: 'var(--sui-colors-rose-600)',
  roseFocusRing: 'var(--sui-colors-rose-600)',
  roseBorder:
    'light-dark(var(--sui-colors-rose-300), var(--sui-colors-rose-600))',
})
