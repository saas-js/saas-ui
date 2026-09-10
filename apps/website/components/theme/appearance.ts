import type {
  ContrastLevel,
  ForegroundTone,
} from '@saas-ui/chakra-preset/appearance'
import { type ColorPalette, colors } from '@saas-ui/chakra-preset/colors'

export interface BaseAppearance {
  h: number
  c: number
  contrast: ContrastLevel
}

export interface AccentAppearance {
  l: number
  c: number
  h: number
  foreground: ForegroundTone
}

export type SidebarAppearance =
  | { type: 'base' }
  | { type: 'tonal'; h: number; c: number; contrast: ContrastLevel }
  | {
      type: 'solid'
      l: number
      c: number
      h: number
      foreground: ForegroundTone
    }

export interface Appearance {
  base: BaseAppearance
  accent: AccentAppearance
  sidebar: SidebarAppearance
}

export const defaultAppearance: Appearance = {
  base: { h: 260, c: 0.012, contrast: 'normal' },
  accent: { l: 0.511, c: 0.262, h: 276.966, foreground: 'light' },
  sidebar: { type: 'base' },
}

/**
 * Palettes that can seed the accent color. Ordered by hue for the swatch row.
 */
export const accentPalettes = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const satisfies readonly ColorPalette[]

export type AccentPalette = (typeof accentPalettes)[number]

const darkForegroundPalettes: ReadonlySet<string> = new Set([
  'amber',
  'yellow',
  'lime',
])

export function parseOklch(value: string) {
  const match = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(value)
  if (!match) return null
  return {
    l: Number.parseFloat(match[1]!),
    c: Number.parseFloat(match[2]!),
    h: Number.parseFloat(match[3]!),
  }
}

/**
 * Derive an accent seed from a named color palette, matching the shade used
 * for that palette's solid semantic token.
 */
export function accentFromPalette(palette: AccentPalette): AccentAppearance {
  const dark = darkForegroundPalettes.has(palette)
  const shade = dark ? '400' : '600'
  const token = (colors as Record<string, Record<string, { value?: string }>>)[
    palette
  ]?.[shade]?.value
  const parsed = typeof token === 'string' ? parseOklch(token) : null

  if (!parsed) {
    return defaultAppearance.accent
  }

  return { ...parsed, foreground: dark ? 'dark' : 'light' }
}

export interface AppearancePreset {
  id: string
  label: string
  appearance: Appearance
  accentPalette?: AccentPalette
}

export const appearancePresets: AppearancePreset[] = [
  {
    id: 'default',
    label: 'Default',
    appearance: defaultAppearance,
    accentPalette: 'indigo',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    appearance: {
      base: { h: 260, c: 0.006, contrast: 'normal' },
      accent: { l: 0.32, c: 0.02, h: 260, foreground: 'light' },
      sidebar: { type: 'base' },
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    appearance: {
      base: { h: 225, c: 0.01, contrast: 'soft' },
      accent: { l: 0.53, c: 0.18, h: 235, foreground: 'light' },
      sidebar: { type: 'tonal', h: 215, c: 0.018, contrast: 'normal' },
    },
  },
  {
    id: 'ember',
    label: 'Ember',
    appearance: {
      base: { h: 35, c: 0.008, contrast: 'normal' },
      accent: { l: 0.64, c: 0.18, h: 35, foreground: 'dark' },
      sidebar: { type: 'tonal', h: 20, c: 0.016, contrast: 'strong' },
    },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    appearance: {
      base: { h: 55, c: 0.009, contrast: 'soft' },
      accent: { l: 0.55, c: 0.15, h: 160, foreground: 'light' },
      sidebar: { type: 'tonal', h: 55, c: 0.012, contrast: 'normal' },
    },
  },
  {
    id: 'violet',
    label: 'Violet',
    appearance: {
      base: { h: 260, c: 0.012, contrast: 'normal' },
      accent: { l: 0.511, c: 0.262, h: 276.966, foreground: 'light' },
      sidebar: {
        type: 'solid',
        l: 0.511,
        c: 0.262,
        h: 276.966,
        foreground: 'light',
      },
    },
  },
]

function randomValue<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)]!
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function wrapHue(hue: number) {
  return (hue + 360) % 360
}

const contrasts = ['normal', 'soft', 'strong'] as const

/**
 * Random appearance generator, ported from the storybook appearance
 * randomizer story.
 */
export function createRandomAppearance(): Appearance {
  const baseHue = randomBetween(0, 360)
  const accentHue = randomBetween(0, 360)
  const accentForeground: ForegroundTone =
    Math.random() > 0.7 ? 'dark' : 'light'
  const sidebarForeground: ForegroundTone =
    Math.random() > 0.7 ? 'dark' : 'light'

  const accentLightness =
    accentForeground === 'dark'
      ? randomBetween(0.72, 0.82)
      : randomBetween(0.46, 0.58)
  const sidebarLightness =
    sidebarForeground === 'dark'
      ? randomBetween(0.72, 0.82)
      : randomBetween(0.44, 0.56)

  const sidebarRoll = Math.random()
  const sidebar: SidebarAppearance =
    sidebarRoll > 0.55
      ? {
          type: 'solid',
          l: sidebarLightness,
          c: randomBetween(0.14, 0.27),
          h: wrapHue(accentHue + randomBetween(-30, 30)),
          foreground: sidebarForeground,
        }
      : sidebarRoll > 0.25
        ? {
            type: 'tonal',
            h: wrapHue(baseHue + randomBetween(-35, 35)),
            c: randomBetween(0.008, 0.034),
            contrast: randomValue(contrasts),
          }
        : { type: 'base' }

  return {
    base: {
      h: baseHue,
      c: randomBetween(0.004, 0.024),
      contrast: randomValue(contrasts),
    },
    accent: {
      l: accentLightness,
      c: randomBetween(0.14, 0.27),
      h: accentHue,
      foreground: accentForeground,
    },
    sidebar,
  }
}

function round(value: number) {
  return Math.round(value * 1000) / 1000
}

export function formatOklch(color: { l: number; c: number; h: number }) {
  return `oklch(${round(color.l)} ${round(color.c)} ${round(color.h)})`
}

function setContrastAttribute(
  el: HTMLElement,
  attribute: string,
  contrast: ContrastLevel | undefined,
) {
  if (contrast === 'soft' || contrast === 'strong') {
    el.setAttribute(attribute, contrast)
  } else {
    el.removeAttribute(attribute)
  }
}

/**
 * Apply appearance seeds to an element by setting the `--sui-*` seed
 * variables and data attributes consumed by the preset's global CSS.
 *
 * Applying to `document.documentElement` themes the entire site, including
 * portalled overlays and docs examples.
 */
export function applyAppearance(el: HTMLElement, appearance: Appearance) {
  const { base, accent, sidebar } = appearance

  // The data attribute selectors in the preset target `.sui-theme`.
  el.classList.add('sui-theme')

  el.style.setProperty(
    '--sui-base',
    formatOklch({ l: 0.5, c: base.c, h: base.h }),
  )
  el.style.setProperty('--sui-accent', formatOklch(accent))

  setContrastAttribute(el, 'data-base-contrast', base.contrast)

  if (accent.foreground === 'dark') {
    el.setAttribute('data-accent-foreground', 'dark')
  } else {
    el.removeAttribute('data-accent-foreground')
  }

  if (sidebar.type === 'tonal') {
    el.style.setProperty(
      '--sui-sidebar',
      formatOklch({ l: 0.5, c: sidebar.c, h: sidebar.h }),
    )
  } else {
    el.style.removeProperty('--sui-sidebar')
  }
  setContrastAttribute(
    el,
    'data-sidebar-contrast',
    sidebar.type === 'tonal' ? sidebar.contrast : undefined,
  )

  if (sidebar.type === 'solid') {
    el.style.setProperty('--sui-sidebar-solid', formatOklch(sidebar))
    el.setAttribute('data-sidebar', 'solid')
    if (sidebar.foreground === 'dark') {
      el.setAttribute('data-sidebar-foreground', 'dark')
    } else {
      el.removeAttribute('data-sidebar-foreground')
    }
  } else {
    el.style.removeProperty('--sui-sidebar-solid')
    el.removeAttribute('data-sidebar')
    el.removeAttribute('data-sidebar-foreground')
  }
}
