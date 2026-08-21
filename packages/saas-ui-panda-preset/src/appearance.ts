/**
 * Portable appearance contract shared by the Chakra, Panda, and Tailwind
 * presets.
 *
 * Colors are calculated by CSS from a small set of OKLCH seeds and tuning
 * axes. The framework semantic tokens contain the final formulas directly,
 * avoiding a parallel set of light, dark, and semantic output variables.
 */
import { statusHues } from './palette.ts'

const baseSeed = 'var(--sui-base)'
const accentSeed = 'var(--sui-accent)'
const sidebarSeed = 'var(--sui-sidebar)'
const solidSidebarSeed = 'var(--sui-sidebar-solid)'

const baseContrast = 'var(--sui-contrast)'
const sidebarContrast = 'var(--sui-sidebar-contrast)'
const accentForegroundTone = 'var(--sui-accent-foreground-tone)'
const sidebarForegroundTone = 'var(--sui-sidebar-foreground-tone)'

function contrast(
  normal: number,
  softDelta: number,
  strongDelta: number,
  axis = baseContrast,
) {
  const soft = `max(calc(-1 * ${axis}), 0)`
  const strong = `max(${axis}, 0)`

  const term = (delta: number, factor: string) => {
    if (delta === 0) return ''
    const operator = delta < 0 ? '-' : '+'
    return ` ${operator} ${Math.abs(delta)} * ${factor}`
  }

  return `calc(${normal}${term(softDelta, soft)}${term(strongDelta, strong)})`
}

function relativeColor(
  seed: string,
  lightness: string | number,
  chroma: string | number,
  alpha: string | number = 1,
  hue: string | number = 'h',
) {
  return `oklch(from ${seed} ${lightness} ${chroma} ${hue} / ${alpha})`
}

function lightDark(light: string, dark: string) {
  return light === dark ? light : `light-dark(${light}, ${dark})`
}

function contrastForeground(
  seed: string,
  tone: string,
  alpha = 1,
  hue: string | number = 'h',
) {
  const lightness = `calc(0.16 + 0.825 * ${tone})`
  const chromaScale = `calc(0.1 - 0.04 * ${tone})`
  const chromaMax = `calc(0.025 - 0.01 * ${tone})`

  return relativeColor(
    seed,
    lightness,
    `min(calc(c * ${chromaScale}), ${chromaMax})`,
    alpha,
    hue,
  )
}

function chromaticPalette(
  seed: string,
  tone: string,
  hue: string | number = 'h',
) {
  return {
    contrast: contrastForeground(seed, tone, 1, hue),
    fg: lightDark(
      relativeColor(seed, 'min(l, 0.44)', 'min(calc(c * 0.65), 0.18)', 1, hue),
      relativeColor(seed, 'max(l, 0.78)', 'min(calc(c * 0.65), 0.18)', 1, hue),
    ),
    muted: lightDark(
      relativeColor(seed, 'l', 'c', 0.07, hue),
      relativeColor(seed, 'l', 'c', 0.1, hue),
    ),
    subtle: lightDark(
      relativeColor(seed, 'l', 'c', 0.11, hue),
      relativeColor(seed, 'l', 'c', 0.16, hue),
    ),
    emphasized: lightDark(
      relativeColor(seed, 'l', 'c', 0.18, hue),
      relativeColor(seed, 'l', 'c', 0.24, hue),
    ),
    solid: relativeColor(seed, 'l', 'c', 1, hue),
    border: lightDark(
      relativeColor(seed, 'l', 'c', 0.32, hue),
      relativeColor(seed, 'l', 'c', 0.44, hue),
    ),
  }
}

const baseForegroundLightness = {
  light: contrast(0.18, 0.02, -0.02),
  dark: contrast(0.94, -0.02, 0.02),
}

const appearanceValues = {
  bg: lightDark(
    relativeColor(baseSeed, contrast(0.985, 0.005, -0.005), 'calc(c * 0.2)'),
    relativeColor(baseSeed, contrast(0.14, 0.005, -0.015), 'calc(c * 0.2)'),
  ),
  surface: lightDark(
    relativeColor(baseSeed, 1, 0),
    relativeColor(baseSeed, contrast(0.17, -0.005, 0.005), 0),
  ),
  elevated: lightDark(
    relativeColor(baseSeed, 1, 0),
    relativeColor(baseSeed, contrast(0.2, -0.015, 0.025), 'calc(c * 0.45)'),
  ),
  inset: lightDark(
    relativeColor(baseSeed, contrast(0.965, 0.01, -0.02), 'calc(c * 0.35)'),
    relativeColor(baseSeed, contrast(0.11, 0.01, -0.025), 'calc(c * 0.3)'),
  ),
  overlay: lightDark(
    relativeColor(baseSeed, 1, 0, 0.95),
    relativeColor(
      baseSeed,
      contrast(0.2, -0.015, 0.025),
      'calc(c * 0.45)',
      0.9,
    ),
  ),
  backdrop: 'oklch(0 0 0 / 0.3)',
  bgInverted: lightDark(
    relativeColor(baseSeed, 0.16, 'calc(c * 0.4)'),
    relativeColor(baseSeed, 0.985, 'calc(c * 0.08)'),
  ),
  fg: lightDark(
    relativeColor(baseSeed, baseForegroundLightness.light, 'calc(c * 0.3)'),
    relativeColor(baseSeed, baseForegroundLightness.dark, 'calc(c * 0.3)'),
  ),
  fgMuted: lightDark(
    relativeColor(baseSeed, contrast(0.42, 0.02, -0.02), 'calc(c * 0.55)'),
    relativeColor(baseSeed, contrast(0.72, -0.02, 0.03), 'calc(c * 0.55)'),
  ),
  fgSubtle: lightDark(
    relativeColor(baseSeed, contrast(0.52, 0.02, -0.03), 'calc(c * 0.5)'),
    relativeColor(baseSeed, contrast(0.6, -0.02, 0.03), 'calc(c * 0.5)'),
  ),
  fgEmphasized: lightDark(
    relativeColor(baseSeed, contrast(0.26, 0.02, -0.03), 'calc(c * 0.4)'),
    relativeColor(baseSeed, contrast(0.84, -0.02, 0.03), 'calc(c * 0.4)'),
  ),
  fgInverted: lightDark(
    relativeColor(baseSeed, 0.985, 'calc(c * 0.08)'),
    relativeColor(baseSeed, 0.16, 'calc(c * 0.4)'),
  ),
  border: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      contrast(0.1, -0.02, 0.02),
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      contrast(0.12, -0.02, 0.03),
    ),
  ),
  borderMuted: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      contrast(0.055, -0.011, 0.011),
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      contrast(0.066, -0.011, 0.0165),
    ),
  ),
  borderSubtle: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      contrast(0.075, -0.015, 0.015),
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      contrast(0.09, -0.015, 0.0225),
    ),
  ),
  borderEmphasized: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      contrast(0.17, -0.03, 0.05),
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      contrast(0.21, -0.04, 0.05),
    ),
  ),
  borderInverted: lightDark(
    relativeColor(baseSeed, 0.985, 'calc(c * 0.2)', 0.8),
    relativeColor(baseSeed, 0.16, 'calc(c * 0.2)', 0.8),
  ),
  hover: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      contrast(0.05, -0.01, 0.01),
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      contrast(0.07, -0.01, 0.01),
    ),
  ),
  pressed: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      contrast(0.08, -0.01, 0.02),
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      contrast(0.11, -0.02, 0.03),
    ),
  ),
  baseFg: lightDark(
    relativeColor(baseSeed, 0.28, 'calc(c * 0.65)'),
    relativeColor(baseSeed, 0.84, 'calc(c * 0.5)'),
  ),
  baseMuted: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      0.05,
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      0.08,
    ),
  ),
  baseSubtle: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      0.08,
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      0.13,
    ),
  ),
  baseEmphasized: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      0.14,
    ),
    relativeColor(baseSeed, baseForegroundLightness.dark, 'calc(c * 0.3)', 0.2),
  ),
  baseSolid: lightDark(
    relativeColor(baseSeed, 0.2, 'calc(c * 0.5)'),
    relativeColor(baseSeed, 0.92, 'calc(c * 0.25)'),
  ),
  baseFocusRing: lightDark(
    relativeColor(baseSeed, 0.48, 'calc(c * 0.8)'),
    relativeColor(baseSeed, 0.68, 'calc(c * 0.8)'),
  ),
  baseBorder: lightDark(
    relativeColor(
      baseSeed,
      baseForegroundLightness.light,
      'calc(c * 0.3)',
      0.12,
    ),
    relativeColor(
      baseSeed,
      baseForegroundLightness.dark,
      'calc(c * 0.3)',
      0.18,
    ),
  ),
} as const

const accentValues = chromaticPalette(accentSeed, accentForegroundTone)
const infoValues = chromaticPalette(
  accentSeed,
  accentForegroundTone,
  statusHues.info,
)
const successValues = chromaticPalette(
  accentSeed,
  accentForegroundTone,
  statusHues.success,
)
const warningValues = chromaticPalette(
  accentSeed,
  accentForegroundTone,
  statusHues.warning,
)
const destructiveValues = chromaticPalette(
  accentSeed,
  accentForegroundTone,
  statusHues.destructive,
)

function paletteFromValues(values: ReturnType<typeof chromaticPalette>) {
  return {
    contrast: { value: values.contrast },
    fg: { value: values.fg },
    muted: { value: values.muted },
    subtle: { value: values.subtle },
    emphasized: { value: values.emphasized },
    solid: { value: values.solid },
    focusRing: { value: values.solid },
    border: { value: values.border },
  }
}

const sidebarValues = {
  bg: lightDark(
    relativeColor(
      sidebarSeed,
      contrast(0.965, 0.01, -0.015, sidebarContrast),
      'calc(c * 0.35)',
    ),
    relativeColor(
      sidebarSeed,
      contrast(0.12, 0.02, -0.02, sidebarContrast),
      'calc(c * 0.5)',
    ),
  ),
  fg: lightDark(
    relativeColor(
      sidebarSeed,
      contrast(0.2, 0.02, -0.02, sidebarContrast),
      'calc(c * 0.3)',
    ),
    relativeColor(
      sidebarSeed,
      contrast(0.92, -0.02, 0.03, sidebarContrast),
      'calc(c * 0.3)',
    ),
  ),
  border: lightDark(
    relativeColor(
      sidebarSeed,
      contrast(0.2, 0.02, -0.02, sidebarContrast),
      'calc(c * 0.3)',
      contrast(0.09, -0.02, 0.03, sidebarContrast),
    ),
    relativeColor(
      sidebarSeed,
      contrast(0.92, -0.02, 0.03, sidebarContrast),
      'calc(c * 0.3)',
      contrast(0.11, -0.02, 0.04, sidebarContrast),
    ),
  ),
  accentBg: lightDark(
    relativeColor(
      sidebarSeed,
      contrast(0.2, 0.02, -0.02, sidebarContrast),
      'calc(c * 0.3)',
      contrast(0.06, -0.01, 0.02, sidebarContrast),
    ),
    relativeColor(
      sidebarSeed,
      contrast(0.92, -0.02, 0.03, sidebarContrast),
      'calc(c * 0.3)',
      contrast(0.08, -0.02, 0.03, sidebarContrast),
    ),
  ),
} as const

const solidSidebarValues = {
  bg: relativeColor(solidSidebarSeed, 'l', 'c'),
  fg: contrastForeground(solidSidebarSeed, sidebarForegroundTone),
  border: contrastForeground(solidSidebarSeed, sidebarForegroundTone, 0.22),
  accentBg: contrastForeground(solidSidebarSeed, sidebarForegroundTone, 0.14),
} as const

export const appearanceGlobalCss = {
  ':where(html, .sui-theme)': {
    colorScheme: 'light',
    '--sui-base': 'oklch(0.5 0.012 260)',
    '--sui-accent': 'oklch(0.511 0.262 276.966)',
    '--sui-sidebar': 'var(--sui-base)',
    '--sui-sidebar-solid': 'var(--sui-accent)',
    '--sui-contrast': '0',
    '--sui-sidebar-contrast': 'var(--sui-contrast)',
    '--sui-accent-foreground-tone': '1',
    '--sui-sidebar-foreground-tone': '1',
    '--sui-color-sidebar-bg': sidebarValues.bg,
    '--sui-color-sidebar-fg': sidebarValues.fg,
    '--sui-color-sidebar-border': sidebarValues.border,
    '--sui-color-sidebar-accent-bg': sidebarValues.accentBg,
    '--sui-color-sidebar-accent-fg': 'var(--sui-color-sidebar-fg)',
  },
  ":where(html.dark, html[data-color-mode='dark'], .sui-theme.dark, .sui-theme[data-color-mode='dark'], .dark .sui-theme:not(.light):not([data-color-mode='light']))":
    {
      colorScheme: 'dark',
    },
  ":where(html.light, html[data-color-mode='light'], .sui-theme.light, .sui-theme[data-color-mode='light'], .light .sui-theme:not(.dark):not([data-color-mode='dark']))":
    {
      colorScheme: 'light',
    },
  ":where(.sui-theme[data-base-contrast='soft'])": {
    '--sui-contrast': '-1',
  },
  ":where(.sui-theme[data-base-contrast='strong'])": {
    '--sui-contrast': '1',
  },
  ":where(.sui-theme[data-sidebar-contrast='soft'])": {
    '--sui-sidebar-contrast': '-1',
  },
  ":where(.sui-theme[data-sidebar-contrast='strong'])": {
    '--sui-sidebar-contrast': '1',
  },
  ":where(.sui-theme[data-accent-foreground='dark'])": {
    '--sui-accent-foreground-tone': '0',
  },
  ":where(.sui-theme[data-sidebar-foreground='dark'])": {
    '--sui-sidebar-foreground-tone': '0',
  },
  ":where(.sui-theme[data-sidebar='solid'])": {
    '--sui-color-sidebar-bg': solidSidebarValues.bg,
    '--sui-color-sidebar-fg': solidSidebarValues.fg,
    '--sui-color-sidebar-border': solidSidebarValues.border,
    '--sui-color-sidebar-accent-bg': solidSidebarValues.accentBg,
    '--sui-color-sidebar-accent-fg': 'var(--sui-color-sidebar-fg)',
  },
} as const

/** Semantic color aliases backed directly by the appearance formulas. */
export const appearanceColors = {
  bg: {
    DEFAULT: { value: appearanceValues.bg },
    surface: { value: appearanceValues.surface },
    elevated: { value: appearanceValues.elevated },
    inset: { value: appearanceValues.inset },
    overlay: { value: appearanceValues.overlay },
    backdrop: { value: appearanceValues.backdrop },
    inverted: { value: appearanceValues.bgInverted },
    muted: { value: '{colors.bg.inset}' },
    subtle: { value: '{colors.interaction.hover}' },
    emphasized: { value: '{colors.interaction.pressed}' },
    content: { value: '{colors.bg}' },
    panel: { value: '{colors.bg.surface}' },
  },
  fg: {
    DEFAULT: { value: appearanceValues.fg },
    muted: { value: appearanceValues.fgMuted },
    subtle: { value: appearanceValues.fgSubtle },
    emphasized: { value: appearanceValues.fgEmphasized },
    inverted: { value: appearanceValues.fgInverted },
  },
  border: {
    DEFAULT: { value: appearanceValues.border },
    muted: { value: appearanceValues.borderMuted },
    subtle: { value: appearanceValues.borderSubtle },
    emphasized: { value: appearanceValues.borderEmphasized },
    inverted: { value: appearanceValues.borderInverted },
  },
  interaction: {
    hover: { value: appearanceValues.hover },
    pressed: { value: appearanceValues.pressed },
    selected: { value: '{colors.accent.subtle}' },
  },
  base: {
    contrast: { value: appearanceValues.fgInverted },
    fg: { value: appearanceValues.baseFg },
    muted: { value: appearanceValues.baseMuted },
    subtle: { value: appearanceValues.baseSubtle },
    emphasized: { value: appearanceValues.baseEmphasized },
    solid: { value: appearanceValues.baseSolid },
    focusRing: { value: appearanceValues.baseFocusRing },
    border: { value: appearanceValues.baseBorder },
  },
  accent: {
    ...paletteFromValues(accentValues),
    focusRing: { value: '{colors.accent.solid}' },
  },
  info: paletteFromValues(infoValues),
  success: paletteFromValues(successValues),
  warning: paletteFromValues(warningValues),
  destructive: paletteFromValues(destructiveValues),
  sidebar: {
    bg: { value: 'var(--sui-color-sidebar-bg)' },
    fg: { value: 'var(--sui-color-sidebar-fg)' },
    border: { value: 'var(--sui-color-sidebar-border)' },
    accent: {
      bg: { value: 'var(--sui-color-sidebar-accent-bg)' },
      fg: { value: '{colors.sidebar.fg}' },
    },
  },
} as const
