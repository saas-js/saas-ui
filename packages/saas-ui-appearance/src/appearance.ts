export interface OklchColor {
  l: number
  c: number
  h: number
  a?: number
}

export interface OklchSeed {
  l: number
  c: number
  h: number
  a?: never
}

export type ColorValue = OklchColor | string
export type ContrastLevel = 'soft' | 'normal' | 'strong'

import {
  type ForegroundTone,
  statusHues,
} from './palette.ts'

export {
  createPalette,
  createPalettes,
  createScale,
  createScales,
  paletteNames,
  paletteSeeds,
  statusHues,
} from './palette.ts'
export type {
  ColorPalette,
  ForegroundTone,
  NamedColorPalette,
  PaletteSeed,
  StatusColorPalette,
} from './palette.ts'

export interface BaseSeed {
  /** @default 260 */
  h?: number
  /** @default 0.012 */
  c?: number
  /** @default 'normal' */
  contrast?: ContrastLevel
}

export interface AccentSeed extends OklchSeed {
  /** Foreground used on the solid accent color. */
  foreground: ForegroundTone
  contrast?: never
}

export interface TonalSidebarSeed {
  /** Inherits the base hue when omitted. */
  h?: number
  /** Inherits the base chroma when omitted. */
  c?: number
  /** @default 'normal' */
  contrast?: ContrastLevel
  solid?: never
  foreground?: never
}

export interface SolidSidebarSeed {
  /** Exact OKLCH background used in both color modes. */
  solid: OklchSeed
  /** Foreground used on the solid sidebar color. */
  foreground: ForegroundTone
  h?: never
  c?: never
  contrast?: never
}

export type SidebarSeed = 'base' | TonalSidebarSeed | SolidSidebarSeed

export interface ColorPaletteValues {
  contrast: ColorValue
  fg: ColorValue
  muted: ColorValue
  subtle: ColorValue
  emphasized: ColorValue
  solid: ColorValue
  focusRing: ColorValue
  border: ColorValue
}

export interface AppearanceOverrides {
  bg?: Partial<{
    DEFAULT: ColorValue
    surface: ColorValue
    elevated: ColorValue
    inset: ColorValue
    overlay: ColorValue
    backdrop: ColorValue
    inverted: ColorValue
    /** Compatibility alias for inset. */
    muted: ColorValue
    /** Compatibility alias for interaction.hover. */
    subtle: ColorValue
    /** Compatibility alias for interaction.pressed. */
    emphasized: ColorValue
    /** Compatibility alias for DEFAULT. */
    content: ColorValue
    /** Compatibility alias for surface. */
    panel: ColorValue
  }>
  fg?: Partial<{
    DEFAULT: ColorValue
    muted: ColorValue
    subtle: ColorValue
    emphasized: ColorValue
    inverted: ColorValue
  }>
  border?: Partial<{
    DEFAULT: ColorValue
    muted: ColorValue
    subtle: ColorValue
    emphasized: ColorValue
    inverted: ColorValue
  }>
  interaction?: Partial<{
    hover: ColorValue
    pressed: ColorValue
    selected: ColorValue
  }>
  base?: Partial<ColorPaletteValues>
  accent?: Partial<ColorPaletteValues>
  sidebar?: Partial<{
    bg: ColorValue
    fg: ColorValue
    border: ColorValue
    accent: Partial<{
      bg: ColorValue
      fg: ColorValue
    }>
  }>
}

export interface AppearanceOptions {
  base?: BaseSeed
  accent?: AccentSeed
  sidebar?: SidebarSeed
  /** Values applied after light mode generation. */
  light?: AppearanceOverrides
  /** Values applied after dark mode generation. */
  dark?: AppearanceOverrides
}

interface ResolvedPaletteValues {
  contrast: string
  fg: string
  muted: string
  subtle: string
  emphasized: string
  solid: string
  focusRing: string
  border: string
}

interface AppearanceModeColors {
  bg: {
    DEFAULT: string
    surface: string
    elevated: string
    inset: string
    overlay: string
    backdrop: string
    inverted: string
    muted: string
    subtle: string
    emphasized: string
    content: string
    panel: string
  }
  fg: {
    DEFAULT: string
    muted: string
    subtle: string
    emphasized: string
    inverted: string
  }
  border: {
    DEFAULT: string
    muted: string
    subtle: string
    emphasized: string
    inverted: string
  }
  interaction: {
    hover: string
    pressed: string
    selected: string
  }
  base: ResolvedPaletteValues
  accent: ResolvedPaletteValues
  info: ResolvedPaletteValues
  success: ResolvedPaletteValues
  warning: ResolvedPaletteValues
  destructive: ResolvedPaletteValues
  sidebar: {
    bg: string
    fg: string
    border: string
    accent: {
      bg: string
      fg: string
    }
  }
}

export interface SemanticColorToken {
  value: {
    _light: string
    _dark: string
  }
}

type SemanticGroup<T> = {
  [K in keyof T]: T[K] extends string
    ? SemanticColorToken
    : T[K] extends object
      ? SemanticGroup<T[K]>
      : never
}

export type AppearanceSemanticTokens = SemanticGroup<AppearanceModeColors>

type Mode = 'light' | 'dark'

interface BaseProfile {
  bg: number
  surface: number
  elevated: number
  inset: number
  fg: number
  fgMuted: number
  fgSubtle: number
  fgEmphasized: number
  hoverAlpha: number
  pressedAlpha: number
  borderAlpha: number
  emphasizedBorderAlpha: number
}

const baseProfiles: Record<ContrastLevel, Record<Mode, BaseProfile>> = {
  soft: {
    light: {
      bg: 0.99,
      surface: 1,
      elevated: 1,
      inset: 0.975,
      fg: 0.2,
      fgMuted: 0.44,
      fgSubtle: 0.54,
      fgEmphasized: 0.28,
      hoverAlpha: 0.04,
      pressedAlpha: 0.07,
      borderAlpha: 0.08,
      emphasizedBorderAlpha: 0.14,
    },
    dark: {
      bg: 0.145,
      surface: 0.165,
      elevated: 0.185,
      inset: 0.12,
      fg: 0.92,
      fgMuted: 0.7,
      fgSubtle: 0.58,
      fgEmphasized: 0.82,
      hoverAlpha: 0.06,
      pressedAlpha: 0.09,
      borderAlpha: 0.1,
      emphasizedBorderAlpha: 0.17,
    },
  },
  normal: {
    light: {
      bg: 0.985,
      surface: 1,
      elevated: 1,
      inset: 0.965,
      fg: 0.18,
      fgMuted: 0.42,
      fgSubtle: 0.52,
      fgEmphasized: 0.26,
      hoverAlpha: 0.05,
      pressedAlpha: 0.08,
      borderAlpha: 0.1,
      emphasizedBorderAlpha: 0.17,
    },
    dark: {
      bg: 0.14,
      surface: 0.17,
      elevated: 0.2,
      inset: 0.11,
      fg: 0.94,
      fgMuted: 0.72,
      fgSubtle: 0.6,
      fgEmphasized: 0.84,
      hoverAlpha: 0.07,
      pressedAlpha: 0.11,
      borderAlpha: 0.12,
      emphasizedBorderAlpha: 0.21,
    },
  },
  strong: {
    light: {
      bg: 0.98,
      surface: 1,
      elevated: 1,
      inset: 0.945,
      fg: 0.16,
      fgMuted: 0.4,
      fgSubtle: 0.49,
      fgEmphasized: 0.23,
      hoverAlpha: 0.06,
      pressedAlpha: 0.1,
      borderAlpha: 0.12,
      emphasizedBorderAlpha: 0.22,
    },
    dark: {
      bg: 0.125,
      surface: 0.175,
      elevated: 0.225,
      inset: 0.085,
      fg: 0.96,
      fgMuted: 0.75,
      fgSubtle: 0.63,
      fgEmphasized: 0.87,
      hoverAlpha: 0.08,
      pressedAlpha: 0.14,
      borderAlpha: 0.15,
      emphasizedBorderAlpha: 0.26,
    },
  },
}

const sidebarProfiles = {
  soft: {
    light: { bg: 0.975, fg: 0.22, border: 0.07, accent: 0.05 },
    dark: { bg: 0.14, fg: 0.9, border: 0.09, accent: 0.06 },
  },
  normal: {
    light: { bg: 0.965, fg: 0.2, border: 0.09, accent: 0.06 },
    dark: { bg: 0.12, fg: 0.92, border: 0.11, accent: 0.08 },
  },
  strong: {
    light: { bg: 0.95, fg: 0.18, border: 0.12, accent: 0.08 },
    dark: { bg: 0.1, fg: 0.95, border: 0.15, accent: 0.11 },
  },
} as const

const defaultBase: Required<BaseSeed> = {
  h: 260,
  c: 0.012,
  contrast: 'normal',
}

const defaultAccent: AccentSeed = {
  l: 0.511,
  c: 0.262,
  h: 276.966,
  foreground: 'light',
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function round(value: number) {
  const rounded = Math.round(value * 1000) / 1000
  return Object.is(rounded, -0) ? 0 : rounded
}

function formatOklch(color: OklchColor) {
  const l = round(clamp(color.l, 0, 1))
  const c = round(Math.max(color.c, 0))
  const h = round(((color.h % 360) + 360) % 360)
  const alpha = color.a === undefined ? '' : ` / ${round(clamp(color.a, 0, 1))}`

  return `oklch(${l} ${c} ${h}${alpha})`
}

function tone(
  seed: Pick<OklchColor, 'c' | 'h'>,
  l: number,
  chromaScale: number,
  options: { alpha?: number; maxChroma?: number } = {},
) {
  return formatOklch({
    l,
    c: Math.min(
      seed.c * chromaScale,
      options.maxChroma ?? Number.POSITIVE_INFINITY,
    ),
    h: seed.h,
    a: options.alpha,
  })
}

function withAlpha(color: OklchColor, alpha: number) {
  return formatOklch({ ...color, a: alpha })
}

function resolveColor(value: ColorValue) {
  return typeof value === 'string' ? value : formatOklch(value)
}

function createAccent(seed: AccentSeed, mode: Mode): ResolvedPaletteValues {
  const dark = mode === 'dark'
  const solid = formatOklch(seed)
  const contrast = formatOklch(createForeground(seed, seed.foreground))

  return {
    contrast,
    fg: tone(
      seed,
      dark ? Math.max(seed.l, 0.78) : Math.min(seed.l, 0.44),
      0.65,
      {
        maxChroma: 0.18,
      },
    ),
    muted: withAlpha(seed, dark ? 0.1 : 0.07),
    subtle: withAlpha(seed, dark ? 0.16 : 0.11),
    emphasized: withAlpha(seed, dark ? 0.24 : 0.18),
    solid,
    focusRing: solid,
    border: withAlpha(seed, dark ? 0.44 : 0.32),
  }
}

function createForeground(
  seed: Pick<OklchColor, 'c' | 'h'>,
  foreground: ForegroundTone,
) {
  return foreground === 'light'
    ? {
        l: 0.985,
        c: Math.min(seed.c * 0.06, 0.015),
        h: seed.h,
      }
    : {
        l: 0.16,
        c: Math.min(seed.c * 0.1, 0.025),
        h: seed.h,
      }
}

function createBase(
  seed: Required<BaseSeed>,
  accent: AccentSeed,
  mode: Mode,
): Omit<
  AppearanceModeColors,
  'accent' | 'sidebar' | 'info' | 'success' | 'warning' | 'destructive'
> {
  const profile = baseProfiles[seed.contrast][mode]
  const dark = mode === 'dark'
  const fgSeed: OklchColor = {
    l: profile.fg,
    c: seed.c * 0.3,
    h: seed.h,
  }
  const bg = tone(seed, profile.bg, 0.2)
  const surface = tone(seed, profile.surface, 0)
  const elevated = tone(seed, profile.elevated, dark ? 0.45 : 0)
  const inset = tone(seed, profile.inset, dark ? 0.3 : 0.35)
  const hover = withAlpha(fgSeed, profile.hoverAlpha)
  const pressed = withAlpha(fgSeed, profile.pressedAlpha)
  const invertedBg = tone(seed, dark ? 0.985 : 0.16, dark ? 0.08 : 0.4)
  const invertedFg = tone(seed, dark ? 0.16 : 0.985, dark ? 0.4 : 0.08)

  return {
    bg: {
      DEFAULT: bg,
      surface,
      elevated,
      inset,
      overlay: tone(seed, profile.elevated, dark ? 0.45 : 0, {
        alpha: dark ? 0.9 : 0.95,
      }),
      backdrop: formatOklch({ l: 0, c: 0, h: 0, a: 0.3 }),
      inverted: invertedBg,
      muted: inset,
      subtle: hover,
      emphasized: pressed,
      content: bg,
      panel: surface,
    },
    fg: {
      DEFAULT: formatOklch(fgSeed),
      muted: tone(seed, profile.fgMuted, 0.55),
      subtle: tone(seed, profile.fgSubtle, 0.5),
      emphasized: tone(seed, profile.fgEmphasized, 0.4),
      inverted: invertedFg,
    },
    border: {
      DEFAULT: withAlpha(fgSeed, profile.borderAlpha),
      muted: withAlpha(fgSeed, profile.borderAlpha * 0.55),
      subtle: withAlpha(fgSeed, profile.borderAlpha * 0.75),
      emphasized: withAlpha(fgSeed, profile.emphasizedBorderAlpha),
      inverted: withAlpha(
        { l: dark ? 0.16 : 0.985, c: seed.c * 0.2, h: seed.h },
        0.8,
      ),
    },
    interaction: {
      hover,
      pressed,
      selected: withAlpha(accent, dark ? 0.16 : 0.11),
    },
    base: {
      contrast: dark ? tone(seed, 0.16, 0.4) : tone(seed, 0.985, 0.08),
      fg: tone(seed, dark ? 0.84 : 0.28, dark ? 0.5 : 0.65),
      muted: withAlpha(fgSeed, dark ? 0.08 : 0.05),
      subtle: withAlpha(fgSeed, dark ? 0.13 : 0.08),
      emphasized: withAlpha(fgSeed, dark ? 0.2 : 0.14),
      solid: tone(seed, dark ? 0.92 : 0.2, dark ? 0.25 : 0.5),
      focusRing: tone(seed, dark ? 0.68 : 0.48, 0.8),
      border: withAlpha(fgSeed, dark ? 0.18 : 0.12),
    },
  }
}

function createSidebar(
  seed: Required<BaseSeed> | SolidSidebarSeed,
  mode: Mode,
): AppearanceModeColors['sidebar'] {
  if ('solid' in seed) {
    const foreground = createForeground(seed.solid, seed.foreground)

    return {
      bg: formatOklch(seed.solid),
      fg: formatOklch(foreground),
      border: withAlpha(foreground, 0.22),
      accent: {
        bg: withAlpha(foreground, 0.14),
        fg: formatOklch(foreground),
      },
    }
  }

  const profile = sidebarProfiles[seed.contrast][mode]
  const dark = mode === 'dark'
  const foreground: OklchColor = {
    l: profile.fg,
    c: seed.c * 0.3,
    h: seed.h,
  }

  return {
    bg: tone(seed, profile.bg, dark ? 0.5 : 0.35),
    fg: formatOklch(foreground),
    border: withAlpha(foreground, profile.border),
    accent: {
      bg: withAlpha(foreground, profile.accent),
      fg: formatOklch(foreground),
    },
  }
}

function resolveOverrideGroup<T extends object>(values?: T) {
  if (!values) return {}

  return Object.fromEntries(
    Object.entries(values)
      .filter((entry): entry is [string, ColorValue] => entry[1] !== undefined)
      .map(([key, value]) => [key, resolveColor(value)]),
  )
}

function applyOverrides(
  colors: AppearanceModeColors,
  overrides?: AppearanceOverrides,
): AppearanceModeColors {
  return {
    bg: { ...colors.bg, ...resolveOverrideGroup(overrides?.bg) },
    fg: { ...colors.fg, ...resolveOverrideGroup(overrides?.fg) },
    border: {
      ...colors.border,
      ...resolveOverrideGroup(overrides?.border),
    },
    interaction: {
      ...colors.interaction,
      ...resolveOverrideGroup(overrides?.interaction),
    },
    base: {
      ...colors.base,
      ...resolveOverrideGroup(overrides?.base),
    },
    accent: {
      ...colors.accent,
      ...resolveOverrideGroup(overrides?.accent),
    },
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    destructive: colors.destructive,
    sidebar: {
      ...colors.sidebar,
      ...resolveOverrideGroup({
        bg: overrides?.sidebar?.bg,
        fg: overrides?.sidebar?.fg,
        border: overrides?.sidebar?.border,
      }),
      accent: {
        ...colors.sidebar.accent,
        ...resolveOverrideGroup(overrides?.sidebar?.accent),
      },
    },
  }
}

function toSemanticGroup<T extends object>(light: T, dark: T) {
  const result = {} as { [K in keyof T]: SemanticColorToken }

  for (const key of Object.keys(light) as Array<keyof T>) {
    result[key] = {
      value: {
        _light: light[key] as string,
        _dark: dark[key] as string,
      },
    }
  }

  return result
}

function isSolidSidebar(
  seed: TonalSidebarSeed | SolidSidebarSeed,
): seed is SolidSidebarSeed {
  return seed.solid !== undefined
}

function resolveOptions(options: AppearanceOptions) {
  const base: Required<BaseSeed> = {
    h: options.base?.h ?? defaultBase.h,
    c: options.base?.c ?? defaultBase.c,
    contrast: options.base?.contrast ?? defaultBase.contrast,
  }
  const accent = options.accent ?? defaultAccent
  const sidebarOptions = options.sidebar ?? 'base'
  const sidebar: Required<BaseSeed> | SolidSidebarSeed =
    sidebarOptions === 'base'
      ? base
      : isSolidSidebar(sidebarOptions)
        ? sidebarOptions
        : {
            h: sidebarOptions.h ?? base.h,
            c: sidebarOptions.c ?? base.c,
            contrast: sidebarOptions.contrast ?? base.contrast,
          }

  return { base, accent, sidebar }
}

export interface AppearanceCssVars {
  '--sui-base': string
  '--sui-accent': string
  '--sui-sidebar': string
  '--sui-sidebar-solid': string
  '--sui-contrast': string
  '--sui-sidebar-contrast': string
  '--sui-accent-foreground-tone': string
  '--sui-sidebar-foreground-tone': string
}

export interface ResolvedAppearanceSeeds {
  base: Required<BaseSeed>
  accent: AccentSeed
  sidebar: SidebarSeed
  solidSidebar: boolean
  tonalSidebar: Required<BaseSeed> | undefined
  cssVars: AppearanceCssVars
}

function contrastAxis(contrast: ContrastLevel | undefined) {
  if (contrast === 'soft') return '-1'
  if (contrast === 'strong') return '1'
  return '0'
}

function foregroundTone(foreground: ForegroundTone | undefined) {
  return foreground === 'dark' ? '0' : '1'
}

/** Resolve seeds and the CSS variables written onto `.sui-theme`. */
export function resolveAppearanceSeeds(
  options: AppearanceOptions = {},
): ResolvedAppearanceSeeds {
  const { base, accent, sidebar } = resolveOptions(options)
  const solidSidebar = 'solid' in sidebar
  const tonalSidebar = solidSidebar ? undefined : sidebar

  return {
    base,
    accent,
    sidebar: options.sidebar ?? 'base',
    solidSidebar,
    tonalSidebar,
    cssVars: {
      '--sui-base': formatOklch({ l: 0.5, c: base.c, h: base.h }),
      '--sui-accent': formatOklch(accent),
      '--sui-sidebar': tonalSidebar
        ? formatOklch({ l: 0.5, c: tonalSidebar.c, h: tonalSidebar.h })
        : 'var(--sui-base)',
      '--sui-sidebar-solid': solidSidebar
        ? formatOklch(sidebar.solid)
        : 'var(--sui-accent)',
      '--sui-contrast': contrastAxis(base.contrast),
      '--sui-sidebar-contrast': tonalSidebar
        ? contrastAxis(tonalSidebar.contrast)
        : 'var(--sui-contrast)',
      '--sui-accent-foreground-tone': foregroundTone(accent.foreground),
      '--sui-sidebar-foreground-tone': solidSidebar
        ? foregroundTone(sidebar.foreground)
        : '1',
    },
  }
}

export function createAppearanceCssVars(options: AppearanceOptions = {}) {
  return resolveAppearanceSeeds(options).cssVars
}

/**
 * Create semantic color tokens from a small set of OKLCH seeds.
 *
 * The generator performs only lightness substitution, chroma scaling, alpha
 * application, clamping, and formatting. It does not parse colors, convert
 * color spaces, or add runtime dependencies.
 */
export function createAppearance(
  options: AppearanceOptions = {},
): AppearanceSemanticTokens {
  const resolved = resolveOptions(options)
  const createMode = (mode: Mode) => {
    const base = createBase(resolved.base, resolved.accent, mode)
    const colors: AppearanceModeColors = {
      ...base,
      accent: createAccent(resolved.accent, mode),
      info: createAccent({ ...resolved.accent, h: statusHues.info }, mode),
      success: createAccent({ ...resolved.accent, h: statusHues.success }, mode),
      warning: createAccent({ ...resolved.accent, h: statusHues.warning }, mode),
      destructive: createAccent(
        { ...resolved.accent, h: statusHues.destructive },
        mode,
      ),
      sidebar: createSidebar(resolved.sidebar, mode),
    }

    return applyOverrides(colors, options[mode])
  }
  const light = createMode('light')
  const dark = createMode('dark')

  return {
    bg: toSemanticGroup(light.bg, dark.bg),
    fg: toSemanticGroup(light.fg, dark.fg),
    border: toSemanticGroup(light.border, dark.border),
    interaction: toSemanticGroup(light.interaction, dark.interaction),
    base: toSemanticGroup(light.base, dark.base),
    accent: toSemanticGroup(light.accent, dark.accent),
    info: toSemanticGroup(light.info, dark.info),
    success: toSemanticGroup(light.success, dark.success),
    warning: toSemanticGroup(light.warning, dark.warning),
    destructive: toSemanticGroup(light.destructive, dark.destructive),
    sidebar: {
      bg: {
        value: { _light: light.sidebar.bg, _dark: dark.sidebar.bg },
      },
      fg: {
        value: { _light: light.sidebar.fg, _dark: dark.sidebar.fg },
      },
      border: {
        value: {
          _light: light.sidebar.border,
          _dark: dark.sidebar.border,
        },
      },
      accent: toSemanticGroup(light.sidebar.accent, dark.sidebar.accent),
    },
  }
}
