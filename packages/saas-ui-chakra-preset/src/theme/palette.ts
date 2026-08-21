/**
 * Named color scales and palettes generated from OKLCH seeds.
 *
 * A seed is a hue, a peak chroma, and a solid lightness. The 50–950 scale
 * shares one lightness curve; chroma peaks around the solid and is capped so
 * catalog hues stay inside a usable sRGB range. Semantic slots use the same
 * formulas as appearance accents: alpha washes for fills, a mode-aware
 * foreground, and the seed as `solid`.
 */

export type ForegroundTone = 'light' | 'dark'
export type PaletteKind = 'neutral' | 'chromatic'

export const scaleSteps = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const

export type ScaleStep = (typeof scaleSteps)[number]

export interface PaletteSeed {
  h: number
  c: number
  /** Solid lightness. Defaults to 0.45 (neutral) or 0.55 (chromatic). */
  l?: number
  foreground: ForegroundTone
  kind?: PaletteKind
  /** Near-black in light, near-white in dark. Used by `neutral`. */
  invertSolid?: boolean
}

export interface PaletteScale {
  [step: string]: { value: string }
}

export interface PaletteTokens {
  [slot: string]: { value: { _light: string; _dark: string } }
  contrast: { value: { _light: string; _dark: string } }
  fg: { value: { _light: string; _dark: string } }
  muted: { value: { _light: string; _dark: string } }
  subtle: { value: { _light: string; _dark: string } }
  emphasized: { value: { _light: string; _dark: string } }
  solid: { value: { _light: string; _dark: string } }
  focusRing: { value: { _light: string; _dark: string } }
  border: { value: { _light: string; _dark: string } }
}

const LIGHTNESS: Record<ScaleStep, number> = {
  50: 0.97,
  100: 0.94,
  200: 0.89,
  300: 0.81,
  400: 0.71,
  500: 0.62,
  600: 0.54,
  700: 0.45,
  800: 0.36,
  900: 0.27,
  950: 0.2,
}

const CHROMATIC_ENVELOPE: Record<ScaleStep, number> = {
  50: 0.12,
  100: 0.22,
  200: 0.4,
  300: 0.62,
  400: 0.85,
  500: 1,
  600: 1,
  700: 0.82,
  800: 0.62,
  900: 0.42,
  950: 0.28,
}

const NEUTRAL_ENVELOPE: Record<ScaleStep, number> = {
  50: 0.25,
  100: 0.4,
  200: 0.55,
  300: 0.7,
  400: 0.85,
  500: 1,
  600: 1,
  700: 0.9,
  800: 0.75,
  900: 0.65,
  950: 0.55,
}

const CHROMATIC_MAX_CHROMA = 0.22
const NEUTRAL_MAX_CHROMA = 0.02

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function round(value: number) {
  const rounded = Math.round(value * 1000) / 1000
  return Object.is(rounded, -0) ? 0 : rounded
}

function formatOklch(color: { l: number; c: number; h: number; a?: number }) {
  const l = round(clamp(color.l, 0, 1))
  const c = round(Math.max(color.c, 0))
  const h = round(((color.h % 360) + 360) % 360)
  const alpha = color.a === undefined ? '' : ` / ${round(clamp(color.a, 0, 1))}`

  return `oklch(${l} ${c} ${h}${alpha})`
}

function resolveSeed(seed: PaletteSeed) {
  const kind = seed.kind ?? 'chromatic'

  return {
    h: seed.h,
    c: seed.c,
    l: seed.l ?? (kind === 'neutral' ? 0.45 : 0.55),
    foreground: seed.foreground,
    kind,
    invertSolid: seed.invertSolid ?? false,
    maxChroma: kind === 'neutral' ? NEUTRAL_MAX_CHROMA : CHROMATIC_MAX_CHROMA,
  }
}

function tone(
  seed: { c: number; h: number },
  l: number,
  chromaScale: number,
  maxChroma = Number.POSITIVE_INFINITY,
  alpha?: number,
) {
  return formatOklch({
    l,
    c: Math.min(seed.c * chromaScale, maxChroma),
    h: seed.h,
    a: alpha,
  })
}

function withAlpha(seed: { l: number; c: number; h: number }, alpha: number) {
  return formatOklch({ ...seed, a: alpha })
}

function createForeground(
  seed: { c: number; h: number },
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

function createSlots(
  seed: ReturnType<typeof resolveSeed>,
  mode: 'light' | 'dark',
) {
  const dark = mode === 'dark'
  const solid = formatOklch(seed)
  const contrast = formatOklch(createForeground(seed, seed.foreground))

  return {
    contrast,
    fg: tone(
      seed,
      dark ? Math.max(seed.l, 0.78) : Math.min(seed.l, 0.44),
      0.65,
      0.18,
    ),
    muted: withAlpha(seed, dark ? 0.1 : 0.07),
    subtle: withAlpha(seed, dark ? 0.16 : 0.11),
    emphasized: withAlpha(seed, dark ? 0.24 : 0.18),
    solid,
    focusRing: solid,
    border: withAlpha(seed, dark ? 0.44 : 0.32),
  }
}

export function createScale(seed: PaletteSeed): PaletteScale {
  const resolved = resolveSeed(seed)
  const envelope =
    resolved.kind === 'neutral' ? NEUTRAL_ENVELOPE : CHROMATIC_ENVELOPE

  return Object.fromEntries(
    scaleSteps.map((step) => [
      step,
      {
        value: formatOklch({
          l: LIGHTNESS[step],
          c: Math.min(resolved.c * envelope[step], resolved.maxChroma),
          h: resolved.h,
        }),
      },
    ]),
  )
}

export function createPalette(seed: PaletteSeed): PaletteTokens {
  const resolved = resolveSeed(seed)
  const light = createSlots(resolved, 'light')
  const dark = createSlots(resolved, 'dark')

  if (resolved.invertSolid) {
    return {
      contrast: {
        value: { _light: '{colors.white}', _dark: '{colors.black}' },
      },
      fg: { value: { _light: '{colors.black}', _dark: '{colors.white}' } },
      muted: { value: { _light: '{colors.black/5}', _dark: '{colors.white/8}' } },
      subtle: {
        value: { _light: '{colors.black/8}', _dark: '{colors.white/13}' },
      },
      emphasized: {
        value: { _light: '{colors.black/14}', _dark: '{colors.white/20}' },
      },
      solid: { value: { _light: '{colors.black}', _dark: '{colors.white}' } },
      focusRing: {
        value: { _light: '{colors.black}', _dark: '{colors.white}' },
      },
      border: {
        value: { _light: '{colors.black/12}', _dark: '{colors.white/18}' },
      },
    }
  }

  return {
    contrast: { value: { _light: light.contrast, _dark: dark.contrast } },
    fg: { value: { _light: light.fg, _dark: dark.fg } },
    muted: { value: { _light: light.muted, _dark: dark.muted } },
    subtle: { value: { _light: light.subtle, _dark: dark.subtle } },
    emphasized: { value: { _light: light.emphasized, _dark: dark.emphasized } },
    solid: { value: { _light: light.solid, _dark: dark.solid } },
    focusRing: { value: { _light: light.focusRing, _dark: dark.focusRing } },
    border: { value: { _light: light.border, _dark: dark.border } },
  }
}

export const paletteSeeds = {
  gray: { h: 260, c: 0.012, l: 0.45, foreground: 'light', kind: 'neutral' },
  zinc: { h: 286, c: 0.01, l: 0.45, foreground: 'light', kind: 'neutral' },
  neutral: {
    h: 0,
    c: 0,
    l: 0.205,
    foreground: 'light',
    kind: 'neutral',
    invertSolid: true,
  },
  stone: { h: 56, c: 0.01, l: 0.45, foreground: 'light', kind: 'neutral' },
  red: { h: 25, c: 0.22, l: 0.55, foreground: 'light' },
  orange: { h: 50, c: 0.22, l: 0.58, foreground: 'light' },
  amber: { h: 80, c: 0.22, l: 0.8, foreground: 'dark' },
  yellow: { h: 95, c: 0.22, l: 0.84, foreground: 'dark' },
  lime: { h: 128, c: 0.22, l: 0.8, foreground: 'dark' },
  green: { h: 150, c: 0.22, l: 0.55, foreground: 'light' },
  emerald: { h: 163, c: 0.22, l: 0.55, foreground: 'light' },
  teal: { h: 182, c: 0.22, l: 0.55, foreground: 'light' },
  cyan: { h: 215, c: 0.22, l: 0.56, foreground: 'light' },
  sky: { h: 237, c: 0.22, l: 0.56, foreground: 'light' },
  blue: { h: 260, c: 0.22, l: 0.54, foreground: 'light' },
  indigo: { h: 277, c: 0.22, l: 0.52, foreground: 'light' },
  violet: { h: 293, c: 0.22, l: 0.52, foreground: 'light' },
  purple: { h: 304, c: 0.22, l: 0.54, foreground: 'light' },
  fuchsia: { h: 322, c: 0.22, l: 0.55, foreground: 'light' },
  pink: { h: 350, c: 0.22, l: 0.56, foreground: 'light' },
  rose: { h: 16, c: 0.22, l: 0.55, foreground: 'light' },
} as const satisfies Record<string, PaletteSeed>

/** Semantic hues that reuse the accent lightness and chroma. */
export const statusHues = {
  info: 260,
  success: 150,
  warning: 50,
  destructive: 25,
} as const

export type StatusColorPalette = keyof typeof statusHues
export type NamedColorPalette = keyof typeof paletteSeeds
export type ColorPalette =
  | 'base'
  | 'accent'
  | StatusColorPalette
  | NamedColorPalette

export const paletteNames = Object.keys(paletteSeeds) as NamedColorPalette[]

export function createScales() {
  return Object.fromEntries(
    paletteNames.map((name) => [name, createScale(paletteSeeds[name])]),
  ) as { [K in NamedColorPalette]: PaletteScale }
}

export function createPalettes() {
  return Object.fromEntries(
    paletteNames.map((name) => [name, createPalette(paletteSeeds[name])]),
  ) as { [K in NamedColorPalette]: PaletteTokens }
}
