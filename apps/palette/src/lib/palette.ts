import {
  type AccentSeed,
  type AppearanceOptions,
  type BaseSeed,
  type ContrastLevel,
  type ForegroundTone,
  type NamedColorPalette,
  type PaletteScale,
  type PaletteSeed,
  type PaletteTokens,
  createAppearance,
  createPalette,
  createScale,
  paletteNames,
  paletteSeeds,
} from '@saas-ui/appearance'

import {
  type Oklch,
  contrastRatio,
  hexToOklch,
  normalizeHex,
  oklchToHex,
} from './color'

export type ForegroundMode = 'auto' | ForegroundTone

export interface PaletteState {
  /** Brand color as hex, the only input most people touch. */
  color: string
  /** Base (neutral) hue in degrees. */
  baseHue: number
  /** Base chroma, how strongly the neutrals are tinted. */
  baseChroma: number
  contrast: ContrastLevel
  foreground: ForegroundMode
  /** Cap the catalog hues at the brand chroma so they sit next to it. */
  harmonize: boolean
}

/** The Saas UI default appearance, expressed as palette app input. */
export const defaultState: PaletteState = {
  color: oklchToHex({ l: 0.511, c: 0.262, h: 276.966 }),
  baseHue: 260,
  baseChroma: 0.012,
  contrast: 'normal',
  foreground: 'auto',
  harmonize: true,
}

export const MAX_BASE_CHROMA = 0.03
export const CATALOG_MAX_CHROMA = 0.22

export const contrastLevels = ['soft', 'normal', 'strong'] as const

/** Catalog palettes that carry a hue, in the order the color grid shows them. */
export const chromaticNames = paletteNames.filter(
  (name) => !('kind' in paletteSeeds[name]),
) as Exclude<NamedColorPalette, 'gray' | 'zinc' | 'neutral' | 'stone'>[]

export type ChromaticName = (typeof chromaticNames)[number]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const LIGHT_FOREGROUND = 0.985
const DARK_FOREGROUND = 0.16

/** The text color `@saas-ui/appearance` puts on a solid for each tone. */
export function foregroundColor(seed: Oklch, tone: ForegroundTone): Oklch {
  return tone === 'light'
    ? { l: LIGHT_FOREGROUND, c: Math.min(seed.c * 0.06, 0.015), h: seed.h }
    : { l: DARK_FOREGROUND, c: Math.min(seed.c * 0.1, 0.025), h: seed.h }
}

export function pickForeground(seed: Oklch): ForegroundTone {
  const light = contrastRatio(seed, foregroundColor(seed, 'light'))
  const dark = contrastRatio(seed, foregroundColor(seed, 'dark'))
  return light >= dark ? 'light' : 'dark'
}

export interface GeneratedPalette {
  state: PaletteState
  accent: AccentSeed
  base: Required<BaseSeed>
  /** Neutral seed that tints the `gray` scale with the base hue. */
  gray: PaletteSeed
  /** Catalog seeds after harmonizing. Only the ones that changed. */
  catalog: Partial<Record<ChromaticName, PaletteSeed>>
  /** Whether harmonizing changes anything for this brand color. */
  harmonized: boolean
  appearance: AppearanceOptions
  scales: Record<string, PaletteScale>
  palettes: Record<string, PaletteTokens>
  semanticTokens: ReturnType<typeof createAppearance>
}

export function resolveState(state: PaletteState): PaletteState {
  return {
    color: normalizeHex(state.color) ?? defaultState.color,
    baseHue: clamp(Math.round(state.baseHue), 0, 360) % 360,
    baseChroma: clamp(state.baseChroma, 0, MAX_BASE_CHROMA),
    contrast: contrastLevels.includes(state.contrast)
      ? state.contrast
      : 'normal',
    foreground: ['auto', 'light', 'dark'].includes(state.foreground)
      ? state.foreground
      : 'auto',
    harmonize: Boolean(state.harmonize),
  }
}

export function generatePalette(input: PaletteState): GeneratedPalette {
  const state = resolveState(input)
  const brand = hexToOklch(state.color)
  const foreground =
    state.foreground === 'auto' ? pickForeground(brand) : state.foreground

  const accent: AccentSeed = { l: brand.l, c: brand.c, h: brand.h, foreground }
  const base: Required<BaseSeed> = {
    h: state.baseHue,
    c: Number(state.baseChroma.toFixed(3)),
    contrast: state.contrast,
  }
  const gray: PaletteSeed = {
    h: base.h,
    c: base.c,
    l: 0.45,
    foreground: 'light',
    kind: 'neutral',
  }

  const harmonized = state.harmonize && brand.c < CATALOG_MAX_CHROMA
  const catalog: GeneratedPalette['catalog'] = {}
  if (harmonized) {
    for (const name of chromaticNames) {
      catalog[name] = {
        ...paletteSeeds[name],
        c: Math.min(paletteSeeds[name].c, brand.c),
      }
    }
  }

  const scales: Record<string, PaletteScale> = {
    brand: createScale(accent),
    gray: createScale(gray),
  }
  const palettes: Record<string, PaletteTokens> = {
    brand: createPalette(accent),
    gray: createPalette(gray),
  }

  for (const name of chromaticNames) {
    const seed = catalog[name] ?? paletteSeeds[name]
    scales[name] = createScale(seed)
    if (catalog[name]) palettes[name] = createPalette(seed)
  }

  const appearance: AppearanceOptions = { base, accent }

  return {
    state,
    accent,
    base,
    gray,
    catalog,
    harmonized,
    appearance,
    scales,
    palettes,
    semanticTokens: createAppearance(appearance),
  }
}

/* -------------------------------------------------------------------------- */
/* URL state                                                                  */
/* -------------------------------------------------------------------------- */

type SearchParams = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function number(value: string | undefined, fallback: number) {
  const parsed = value === undefined ? Number.NaN : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function stateFromSearchParams(params: SearchParams): PaletteState {
  const color = first(params.color)
  return resolveState({
    color: color ? `#${color.replace(/^#/, '')}` : defaultState.color,
    baseHue: number(first(params.hue), defaultState.baseHue),
    baseChroma: number(first(params.tint), defaultState.baseChroma),
    contrast: (first(params.contrast) as ContrastLevel) ?? defaultState.contrast,
    foreground:
      (first(params.text) as ForegroundMode) ?? defaultState.foreground,
    harmonize: first(params.harmonize) !== '0',
  })
}

/** Only non-default values go in the URL so shared links stay short. */
export function stateToSearch(state: PaletteState) {
  const params = new URLSearchParams()
  const resolved = resolveState(state)
  if (resolved.color !== defaultState.color) {
    params.set('color', resolved.color.slice(1))
  }
  if (resolved.baseHue !== defaultState.baseHue) {
    params.set('hue', String(resolved.baseHue))
  }
  if (resolved.baseChroma !== defaultState.baseChroma) {
    params.set('tint', String(Number(resolved.baseChroma.toFixed(3))))
  }
  if (resolved.contrast !== defaultState.contrast) {
    params.set('contrast', resolved.contrast)
  }
  if (resolved.foreground !== defaultState.foreground) {
    params.set('text', resolved.foreground)
  }
  if (!resolved.harmonize) params.set('harmonize', '0')
  const search = params.toString()
  return search ? `?${search}` : ''
}
