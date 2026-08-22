import * as stylex from '@stylexjs/stylex'

export const semanticColors = stylex.defineVars({
  presenceOnline: 'var(--sui-colors-success-solid)',
  presenceOffline: 'var(--sui-colors-gray-solid)',
  presenceBusy: 'var(--sui-colors-warning-solid)',
  presenceDnd: 'var(--sui-colors-destructive-solid)',
  presenceAway: 'var(--sui-colors-gray-solid)',
  statusSuccess: 'var(--sui-colors-success-solid)',
  statusError: 'var(--sui-colors-destructive-solid)',
  statusWarning: 'var(--sui-colors-warning-solid)',
  statusInfo: 'var(--sui-colors-info-solid)',
  shadow: 'var(--sui-colors-black)',
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
  bgError: 'var(--sui-colors-destructive-muted)',
  bgWarning: 'var(--sui-colors-warning-muted)',
  bgSuccess: 'var(--sui-colors-success-muted)',
  bgInfo: 'var(--sui-colors-info-muted)',
  bgDestructive: 'var(--sui-colors-destructive-muted)',
  fg: 'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 1), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 1))',
  fgMuted:
    'light-dark(oklch(from var(--sui-base) calc(0.42 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.55) h / 1), oklch(from var(--sui-base) calc(0.72 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.55) h / 1))',
  fgSubtle:
    'light-dark(oklch(from var(--sui-base) calc(0.52 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.5) h / 1), oklch(from var(--sui-base) calc(0.6 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.5) h / 1))',
  fgEmphasized:
    'light-dark(oklch(from var(--sui-base) calc(0.26 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.4) h / 1), oklch(from var(--sui-base) calc(0.84 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.03 * max(var(--sui-contrast), 0)) calc(c * 0.4) h / 1))',
  fgInverted:
    'light-dark(oklch(from var(--sui-base) 0.985 calc(c * 0.08) h / 1), oklch(from var(--sui-base) 0.16 calc(c * 0.4) h / 1))',
  fgError: 'var(--sui-colors-destructive-fg)',
  fgWarning: 'var(--sui-colors-warning-fg)',
  fgSuccess: 'var(--sui-colors-success-fg)',
  fgInfo: 'var(--sui-colors-info-fg)',
  fgDestructive: 'var(--sui-colors-destructive-fg)',
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
  borderError: 'var(--sui-colors-destructive-border)',
  borderWarning: 'var(--sui-colors-warning-border)',
  borderSuccess: 'var(--sui-colors-success-border)',
  borderInfo: 'var(--sui-colors-info-border)',
  borderDestructive: 'var(--sui-colors-destructive-border)',
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
  infoContrast:
    'oklch(from var(--sui-accent) calc(0.16 + 0.825 * var(--sui-accent-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-accent-foreground-tone))), calc(0.025 - 0.01 * var(--sui-accent-foreground-tone))) 260 / 1)',
  infoFg:
    'light-dark(oklch(from var(--sui-accent) min(l, 0.44) min(calc(c * 0.65), 0.18) 260 / 1), oklch(from var(--sui-accent) max(l, 0.78) min(calc(c * 0.65), 0.18) 260 / 1))',
  infoMuted:
    'light-dark(oklch(from var(--sui-accent) l c 260 / 0.07), oklch(from var(--sui-accent) l c 260 / 0.1))',
  infoSubtle:
    'light-dark(oklch(from var(--sui-accent) l c 260 / 0.11), oklch(from var(--sui-accent) l c 260 / 0.16))',
  infoEmphasized:
    'light-dark(oklch(from var(--sui-accent) l c 260 / 0.18), oklch(from var(--sui-accent) l c 260 / 0.24))',
  infoSolid: 'oklch(from var(--sui-accent) l c 260 / 1)',
  infoFocusRing: 'oklch(from var(--sui-accent) l c 260 / 1)',
  infoBorder:
    'light-dark(oklch(from var(--sui-accent) l c 260 / 0.32), oklch(from var(--sui-accent) l c 260 / 0.44))',
  successContrast:
    'oklch(from var(--sui-accent) calc(0.16 + 0.825 * var(--sui-accent-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-accent-foreground-tone))), calc(0.025 - 0.01 * var(--sui-accent-foreground-tone))) 150 / 1)',
  successFg:
    'light-dark(oklch(from var(--sui-accent) min(l, 0.44) min(calc(c * 0.65), 0.18) 150 / 1), oklch(from var(--sui-accent) max(l, 0.78) min(calc(c * 0.65), 0.18) 150 / 1))',
  successMuted:
    'light-dark(oklch(from var(--sui-accent) l c 150 / 0.07), oklch(from var(--sui-accent) l c 150 / 0.1))',
  successSubtle:
    'light-dark(oklch(from var(--sui-accent) l c 150 / 0.11), oklch(from var(--sui-accent) l c 150 / 0.16))',
  successEmphasized:
    'light-dark(oklch(from var(--sui-accent) l c 150 / 0.18), oklch(from var(--sui-accent) l c 150 / 0.24))',
  successSolid: 'oklch(from var(--sui-accent) l c 150 / 1)',
  successFocusRing: 'oklch(from var(--sui-accent) l c 150 / 1)',
  successBorder:
    'light-dark(oklch(from var(--sui-accent) l c 150 / 0.32), oklch(from var(--sui-accent) l c 150 / 0.44))',
  warningContrast:
    'oklch(from var(--sui-accent) calc(0.16 + 0.825 * var(--sui-accent-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-accent-foreground-tone))), calc(0.025 - 0.01 * var(--sui-accent-foreground-tone))) 50 / 1)',
  warningFg:
    'light-dark(oklch(from var(--sui-accent) min(l, 0.44) min(calc(c * 0.65), 0.18) 50 / 1), oklch(from var(--sui-accent) max(l, 0.78) min(calc(c * 0.65), 0.18) 50 / 1))',
  warningMuted:
    'light-dark(oklch(from var(--sui-accent) l c 50 / 0.07), oklch(from var(--sui-accent) l c 50 / 0.1))',
  warningSubtle:
    'light-dark(oklch(from var(--sui-accent) l c 50 / 0.11), oklch(from var(--sui-accent) l c 50 / 0.16))',
  warningEmphasized:
    'light-dark(oklch(from var(--sui-accent) l c 50 / 0.18), oklch(from var(--sui-accent) l c 50 / 0.24))',
  warningSolid: 'oklch(from var(--sui-accent) l c 50 / 1)',
  warningFocusRing: 'oklch(from var(--sui-accent) l c 50 / 1)',
  warningBorder:
    'light-dark(oklch(from var(--sui-accent) l c 50 / 0.32), oklch(from var(--sui-accent) l c 50 / 0.44))',
  destructiveContrast:
    'oklch(from var(--sui-accent) calc(0.16 + 0.825 * var(--sui-accent-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-accent-foreground-tone))), calc(0.025 - 0.01 * var(--sui-accent-foreground-tone))) 25 / 1)',
  destructiveFg:
    'light-dark(oklch(from var(--sui-accent) min(l, 0.44) min(calc(c * 0.65), 0.18) 25 / 1), oklch(from var(--sui-accent) max(l, 0.78) min(calc(c * 0.65), 0.18) 25 / 1))',
  destructiveMuted:
    'light-dark(oklch(from var(--sui-accent) l c 25 / 0.07), oklch(from var(--sui-accent) l c 25 / 0.1))',
  destructiveSubtle:
    'light-dark(oklch(from var(--sui-accent) l c 25 / 0.11), oklch(from var(--sui-accent) l c 25 / 0.16))',
  destructiveEmphasized:
    'light-dark(oklch(from var(--sui-accent) l c 25 / 0.18), oklch(from var(--sui-accent) l c 25 / 0.24))',
  destructiveSolid: 'oklch(from var(--sui-accent) l c 25 / 1)',
  destructiveFocusRing: 'oklch(from var(--sui-accent) l c 25 / 1)',
  destructiveBorder:
    'light-dark(oklch(from var(--sui-accent) l c 25 / 0.32), oklch(from var(--sui-accent) l c 25 / 0.44))',
  grayContrast: 'oklch(0.985 0.001 260)',
  grayFg: 'light-dark(oklch(0.44 0.008 260), oklch(0.78 0.008 260))',
  grayMuted:
    'light-dark(oklch(0.45 0.012 260 / 0.07), oklch(0.45 0.012 260 / 0.1))',
  graySubtle:
    'light-dark(oklch(0.45 0.012 260 / 0.11), oklch(0.45 0.012 260 / 0.16))',
  grayEmphasized:
    'light-dark(oklch(0.45 0.012 260 / 0.18), oklch(0.45 0.012 260 / 0.24))',
  graySolid: 'oklch(0.45 0.012 260)',
  grayFocusRing: 'oklch(0.45 0.012 260)',
  grayBorder:
    'light-dark(oklch(0.45 0.012 260 / 0.32), oklch(0.45 0.012 260 / 0.44))',
  zincContrast: 'oklch(0.985 0.001 286)',
  zincFg: 'light-dark(oklch(0.44 0.007 286), oklch(0.78 0.007 286))',
  zincMuted:
    'light-dark(oklch(0.45 0.01 286 / 0.07), oklch(0.45 0.01 286 / 0.1))',
  zincSubtle:
    'light-dark(oklch(0.45 0.01 286 / 0.11), oklch(0.45 0.01 286 / 0.16))',
  zincEmphasized:
    'light-dark(oklch(0.45 0.01 286 / 0.18), oklch(0.45 0.01 286 / 0.24))',
  zincSolid: 'oklch(0.45 0.01 286)',
  zincFocusRing: 'oklch(0.45 0.01 286)',
  zincBorder:
    'light-dark(oklch(0.45 0.01 286 / 0.32), oklch(0.45 0.01 286 / 0.44))',
  neutralContrast:
    'light-dark(var(--sui-colors-white), var(--sui-colors-black))',
  neutralFg: 'light-dark(var(--sui-colors-black), var(--sui-colors-white))',
  neutralMuted:
    'light-dark(color-mix(in oklch, var(--sui-colors-black) 5%, transparent), color-mix(in oklch, var(--sui-colors-white) 8%, transparent))',
  neutralSubtle:
    'light-dark(color-mix(in oklch, var(--sui-colors-black) 8%, transparent), color-mix(in oklch, var(--sui-colors-white) 13%, transparent))',
  neutralEmphasized:
    'light-dark(color-mix(in oklch, var(--sui-colors-black) 14%, transparent), color-mix(in oklch, var(--sui-colors-white) 20%, transparent))',
  neutralSolid: 'light-dark(var(--sui-colors-black), var(--sui-colors-white))',
  neutralFocusRing:
    'light-dark(var(--sui-colors-black), var(--sui-colors-white))',
  neutralBorder:
    'light-dark(color-mix(in oklch, var(--sui-colors-black) 12%, transparent), color-mix(in oklch, var(--sui-colors-white) 18%, transparent))',
  stoneContrast: 'oklch(0.985 0.001 56)',
  stoneFg: 'light-dark(oklch(0.44 0.007 56), oklch(0.78 0.007 56))',
  stoneMuted:
    'light-dark(oklch(0.45 0.01 56 / 0.07), oklch(0.45 0.01 56 / 0.1))',
  stoneSubtle:
    'light-dark(oklch(0.45 0.01 56 / 0.11), oklch(0.45 0.01 56 / 0.16))',
  stoneEmphasized:
    'light-dark(oklch(0.45 0.01 56 / 0.18), oklch(0.45 0.01 56 / 0.24))',
  stoneSolid: 'oklch(0.45 0.01 56)',
  stoneFocusRing: 'oklch(0.45 0.01 56)',
  stoneBorder:
    'light-dark(oklch(0.45 0.01 56 / 0.32), oklch(0.45 0.01 56 / 0.44))',
  redContrast: 'oklch(0.985 0.013 25)',
  redFg: 'light-dark(oklch(0.44 0.143 25), oklch(0.78 0.143 25))',
  redMuted: 'light-dark(oklch(0.55 0.22 25 / 0.07), oklch(0.55 0.22 25 / 0.1))',
  redSubtle:
    'light-dark(oklch(0.55 0.22 25 / 0.11), oklch(0.55 0.22 25 / 0.16))',
  redEmphasized:
    'light-dark(oklch(0.55 0.22 25 / 0.18), oklch(0.55 0.22 25 / 0.24))',
  redSolid: 'oklch(0.55 0.22 25)',
  redFocusRing: 'oklch(0.55 0.22 25)',
  redBorder:
    'light-dark(oklch(0.55 0.22 25 / 0.32), oklch(0.55 0.22 25 / 0.44))',
  orangeContrast: 'oklch(0.985 0.013 50)',
  orangeFg: 'light-dark(oklch(0.44 0.143 50), oklch(0.78 0.143 50))',
  orangeMuted:
    'light-dark(oklch(0.58 0.22 50 / 0.07), oklch(0.58 0.22 50 / 0.1))',
  orangeSubtle:
    'light-dark(oklch(0.58 0.22 50 / 0.11), oklch(0.58 0.22 50 / 0.16))',
  orangeEmphasized:
    'light-dark(oklch(0.58 0.22 50 / 0.18), oklch(0.58 0.22 50 / 0.24))',
  orangeSolid: 'oklch(0.58 0.22 50)',
  orangeFocusRing: 'oklch(0.58 0.22 50)',
  orangeBorder:
    'light-dark(oklch(0.58 0.22 50 / 0.32), oklch(0.58 0.22 50 / 0.44))',
  amberContrast: 'oklch(0.16 0.022 80)',
  amberFg: 'light-dark(oklch(0.44 0.143 80), oklch(0.8 0.143 80))',
  amberMuted: 'light-dark(oklch(0.8 0.22 80 / 0.07), oklch(0.8 0.22 80 / 0.1))',
  amberSubtle:
    'light-dark(oklch(0.8 0.22 80 / 0.11), oklch(0.8 0.22 80 / 0.16))',
  amberEmphasized:
    'light-dark(oklch(0.8 0.22 80 / 0.18), oklch(0.8 0.22 80 / 0.24))',
  amberSolid: 'oklch(0.8 0.22 80)',
  amberFocusRing: 'oklch(0.8 0.22 80)',
  amberBorder:
    'light-dark(oklch(0.8 0.22 80 / 0.32), oklch(0.8 0.22 80 / 0.44))',
  yellowContrast: 'oklch(0.16 0.022 95)',
  yellowFg: 'light-dark(oklch(0.44 0.143 95), oklch(0.84 0.143 95))',
  yellowMuted:
    'light-dark(oklch(0.84 0.22 95 / 0.07), oklch(0.84 0.22 95 / 0.1))',
  yellowSubtle:
    'light-dark(oklch(0.84 0.22 95 / 0.11), oklch(0.84 0.22 95 / 0.16))',
  yellowEmphasized:
    'light-dark(oklch(0.84 0.22 95 / 0.18), oklch(0.84 0.22 95 / 0.24))',
  yellowSolid: 'oklch(0.84 0.22 95)',
  yellowFocusRing: 'oklch(0.84 0.22 95)',
  yellowBorder:
    'light-dark(oklch(0.84 0.22 95 / 0.32), oklch(0.84 0.22 95 / 0.44))',
  limeContrast: 'oklch(0.16 0.022 128)',
  limeFg: 'light-dark(oklch(0.44 0.143 128), oklch(0.8 0.143 128))',
  limeMuted:
    'light-dark(oklch(0.8 0.22 128 / 0.07), oklch(0.8 0.22 128 / 0.1))',
  limeSubtle:
    'light-dark(oklch(0.8 0.22 128 / 0.11), oklch(0.8 0.22 128 / 0.16))',
  limeEmphasized:
    'light-dark(oklch(0.8 0.22 128 / 0.18), oklch(0.8 0.22 128 / 0.24))',
  limeSolid: 'oklch(0.8 0.22 128)',
  limeFocusRing: 'oklch(0.8 0.22 128)',
  limeBorder:
    'light-dark(oklch(0.8 0.22 128 / 0.32), oklch(0.8 0.22 128 / 0.44))',
  greenContrast: 'oklch(0.985 0.013 150)',
  greenFg: 'light-dark(oklch(0.44 0.143 150), oklch(0.78 0.143 150))',
  greenMuted:
    'light-dark(oklch(0.55 0.22 150 / 0.07), oklch(0.55 0.22 150 / 0.1))',
  greenSubtle:
    'light-dark(oklch(0.55 0.22 150 / 0.11), oklch(0.55 0.22 150 / 0.16))',
  greenEmphasized:
    'light-dark(oklch(0.55 0.22 150 / 0.18), oklch(0.55 0.22 150 / 0.24))',
  greenSolid: 'oklch(0.55 0.22 150)',
  greenFocusRing: 'oklch(0.55 0.22 150)',
  greenBorder:
    'light-dark(oklch(0.55 0.22 150 / 0.32), oklch(0.55 0.22 150 / 0.44))',
  emeraldContrast: 'oklch(0.985 0.013 163)',
  emeraldFg: 'light-dark(oklch(0.44 0.143 163), oklch(0.78 0.143 163))',
  emeraldMuted:
    'light-dark(oklch(0.55 0.22 163 / 0.07), oklch(0.55 0.22 163 / 0.1))',
  emeraldSubtle:
    'light-dark(oklch(0.55 0.22 163 / 0.11), oklch(0.55 0.22 163 / 0.16))',
  emeraldEmphasized:
    'light-dark(oklch(0.55 0.22 163 / 0.18), oklch(0.55 0.22 163 / 0.24))',
  emeraldSolid: 'oklch(0.55 0.22 163)',
  emeraldFocusRing: 'oklch(0.55 0.22 163)',
  emeraldBorder:
    'light-dark(oklch(0.55 0.22 163 / 0.32), oklch(0.55 0.22 163 / 0.44))',
  tealContrast: 'oklch(0.985 0.013 182)',
  tealFg: 'light-dark(oklch(0.44 0.143 182), oklch(0.78 0.143 182))',
  tealMuted:
    'light-dark(oklch(0.55 0.22 182 / 0.07), oklch(0.55 0.22 182 / 0.1))',
  tealSubtle:
    'light-dark(oklch(0.55 0.22 182 / 0.11), oklch(0.55 0.22 182 / 0.16))',
  tealEmphasized:
    'light-dark(oklch(0.55 0.22 182 / 0.18), oklch(0.55 0.22 182 / 0.24))',
  tealSolid: 'oklch(0.55 0.22 182)',
  tealFocusRing: 'oklch(0.55 0.22 182)',
  tealBorder:
    'light-dark(oklch(0.55 0.22 182 / 0.32), oklch(0.55 0.22 182 / 0.44))',
  cyanContrast: 'oklch(0.985 0.013 215)',
  cyanFg: 'light-dark(oklch(0.44 0.143 215), oklch(0.78 0.143 215))',
  cyanMuted:
    'light-dark(oklch(0.56 0.22 215 / 0.07), oklch(0.56 0.22 215 / 0.1))',
  cyanSubtle:
    'light-dark(oklch(0.56 0.22 215 / 0.11), oklch(0.56 0.22 215 / 0.16))',
  cyanEmphasized:
    'light-dark(oklch(0.56 0.22 215 / 0.18), oklch(0.56 0.22 215 / 0.24))',
  cyanSolid: 'oklch(0.56 0.22 215)',
  cyanFocusRing: 'oklch(0.56 0.22 215)',
  cyanBorder:
    'light-dark(oklch(0.56 0.22 215 / 0.32), oklch(0.56 0.22 215 / 0.44))',
  skyContrast: 'oklch(0.985 0.013 237)',
  skyFg: 'light-dark(oklch(0.44 0.143 237), oklch(0.78 0.143 237))',
  skyMuted:
    'light-dark(oklch(0.56 0.22 237 / 0.07), oklch(0.56 0.22 237 / 0.1))',
  skySubtle:
    'light-dark(oklch(0.56 0.22 237 / 0.11), oklch(0.56 0.22 237 / 0.16))',
  skyEmphasized:
    'light-dark(oklch(0.56 0.22 237 / 0.18), oklch(0.56 0.22 237 / 0.24))',
  skySolid: 'oklch(0.56 0.22 237)',
  skyFocusRing: 'oklch(0.56 0.22 237)',
  skyBorder:
    'light-dark(oklch(0.56 0.22 237 / 0.32), oklch(0.56 0.22 237 / 0.44))',
  blueContrast: 'oklch(0.985 0.013 260)',
  blueFg: 'light-dark(oklch(0.44 0.143 260), oklch(0.78 0.143 260))',
  blueMuted:
    'light-dark(oklch(0.54 0.22 260 / 0.07), oklch(0.54 0.22 260 / 0.1))',
  blueSubtle:
    'light-dark(oklch(0.54 0.22 260 / 0.11), oklch(0.54 0.22 260 / 0.16))',
  blueEmphasized:
    'light-dark(oklch(0.54 0.22 260 / 0.18), oklch(0.54 0.22 260 / 0.24))',
  blueSolid: 'oklch(0.54 0.22 260)',
  blueFocusRing: 'oklch(0.54 0.22 260)',
  blueBorder:
    'light-dark(oklch(0.54 0.22 260 / 0.32), oklch(0.54 0.22 260 / 0.44))',
  indigoContrast: 'oklch(0.985 0.013 277)',
  indigoFg: 'light-dark(oklch(0.44 0.143 277), oklch(0.78 0.143 277))',
  indigoMuted:
    'light-dark(oklch(0.52 0.22 277 / 0.07), oklch(0.52 0.22 277 / 0.1))',
  indigoSubtle:
    'light-dark(oklch(0.52 0.22 277 / 0.11), oklch(0.52 0.22 277 / 0.16))',
  indigoEmphasized:
    'light-dark(oklch(0.52 0.22 277 / 0.18), oklch(0.52 0.22 277 / 0.24))',
  indigoSolid: 'oklch(0.52 0.22 277)',
  indigoFocusRing: 'oklch(0.52 0.22 277)',
  indigoBorder:
    'light-dark(oklch(0.52 0.22 277 / 0.32), oklch(0.52 0.22 277 / 0.44))',
  violetContrast: 'oklch(0.985 0.013 293)',
  violetFg: 'light-dark(oklch(0.44 0.143 293), oklch(0.78 0.143 293))',
  violetMuted:
    'light-dark(oklch(0.52 0.22 293 / 0.07), oklch(0.52 0.22 293 / 0.1))',
  violetSubtle:
    'light-dark(oklch(0.52 0.22 293 / 0.11), oklch(0.52 0.22 293 / 0.16))',
  violetEmphasized:
    'light-dark(oklch(0.52 0.22 293 / 0.18), oklch(0.52 0.22 293 / 0.24))',
  violetSolid: 'oklch(0.52 0.22 293)',
  violetFocusRing: 'oklch(0.52 0.22 293)',
  violetBorder:
    'light-dark(oklch(0.52 0.22 293 / 0.32), oklch(0.52 0.22 293 / 0.44))',
  purpleContrast: 'oklch(0.985 0.013 304)',
  purpleFg: 'light-dark(oklch(0.44 0.143 304), oklch(0.78 0.143 304))',
  purpleMuted:
    'light-dark(oklch(0.54 0.22 304 / 0.07), oklch(0.54 0.22 304 / 0.1))',
  purpleSubtle:
    'light-dark(oklch(0.54 0.22 304 / 0.11), oklch(0.54 0.22 304 / 0.16))',
  purpleEmphasized:
    'light-dark(oklch(0.54 0.22 304 / 0.18), oklch(0.54 0.22 304 / 0.24))',
  purpleSolid: 'oklch(0.54 0.22 304)',
  purpleFocusRing: 'oklch(0.54 0.22 304)',
  purpleBorder:
    'light-dark(oklch(0.54 0.22 304 / 0.32), oklch(0.54 0.22 304 / 0.44))',
  fuchsiaContrast: 'oklch(0.985 0.013 322)',
  fuchsiaFg: 'light-dark(oklch(0.44 0.143 322), oklch(0.78 0.143 322))',
  fuchsiaMuted:
    'light-dark(oklch(0.55 0.22 322 / 0.07), oklch(0.55 0.22 322 / 0.1))',
  fuchsiaSubtle:
    'light-dark(oklch(0.55 0.22 322 / 0.11), oklch(0.55 0.22 322 / 0.16))',
  fuchsiaEmphasized:
    'light-dark(oklch(0.55 0.22 322 / 0.18), oklch(0.55 0.22 322 / 0.24))',
  fuchsiaSolid: 'oklch(0.55 0.22 322)',
  fuchsiaFocusRing: 'oklch(0.55 0.22 322)',
  fuchsiaBorder:
    'light-dark(oklch(0.55 0.22 322 / 0.32), oklch(0.55 0.22 322 / 0.44))',
  pinkContrast: 'oklch(0.985 0.013 350)',
  pinkFg: 'light-dark(oklch(0.44 0.143 350), oklch(0.78 0.143 350))',
  pinkMuted:
    'light-dark(oklch(0.56 0.22 350 / 0.07), oklch(0.56 0.22 350 / 0.1))',
  pinkSubtle:
    'light-dark(oklch(0.56 0.22 350 / 0.11), oklch(0.56 0.22 350 / 0.16))',
  pinkEmphasized:
    'light-dark(oklch(0.56 0.22 350 / 0.18), oklch(0.56 0.22 350 / 0.24))',
  pinkSolid: 'oklch(0.56 0.22 350)',
  pinkFocusRing: 'oklch(0.56 0.22 350)',
  pinkBorder:
    'light-dark(oklch(0.56 0.22 350 / 0.32), oklch(0.56 0.22 350 / 0.44))',
  roseContrast: 'oklch(0.985 0.013 16)',
  roseFg: 'light-dark(oklch(0.44 0.143 16), oklch(0.78 0.143 16))',
  roseMuted:
    'light-dark(oklch(0.55 0.22 16 / 0.07), oklch(0.55 0.22 16 / 0.1))',
  roseSubtle:
    'light-dark(oklch(0.55 0.22 16 / 0.11), oklch(0.55 0.22 16 / 0.16))',
  roseEmphasized:
    'light-dark(oklch(0.55 0.22 16 / 0.18), oklch(0.55 0.22 16 / 0.24))',
  roseSolid: 'oklch(0.55 0.22 16)',
  roseFocusRing: 'oklch(0.55 0.22 16)',
  roseBorder:
    'light-dark(oklch(0.55 0.22 16 / 0.32), oklch(0.55 0.22 16 / 0.44))',
})
