import {
  type AppearanceOptions,
  type ContrastLevel,
  type ForegroundTone,
  type SemanticColorToken,
  createAppearance,
} from '../../saas-ui-chakra-preset/src/appearance.ts'

import { isLightDarkValue, toStylexKey } from './flatten.ts'

export type AppearanceFormat = 'css' | 'stylex'

export interface AppearanceThemeInput extends AppearanceOptions {
  /** Class name written into the CSS selector and the StyleX export. */
  name?: string
}

export interface AppearanceCssOptions {
  /** CSS selector. Defaults to `.sui-theme` or `.sui-theme.<name>`. */
  selector?: string
}

const DEFAULT_BASE = { h: 260, c: 0.012, contrast: 'normal' as ContrastLevel }
const DEFAULT_ACCENT = {
  l: 0.511,
  c: 0.262,
  h: 276.966,
  foreground: 'light' as ForegroundTone,
}

function contrastAxis(contrast: ContrastLevel | undefined) {
  if (contrast === 'soft') return '-1'
  if (contrast === 'strong') return '1'
  return '0'
}

function foregroundTone(foreground: ForegroundTone | undefined) {
  return foreground === 'dark' ? '0' : '1'
}

function oklch(l: number, c: number, h: number) {
  return `oklch(${l} ${c} ${h})`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

function isSemanticToken(value: unknown): value is SemanticColorToken {
  return isRecord(value) && isLightDarkValue(value.value)
}

function toLightDark(token: SemanticColorToken) {
  const { _light, _dark } = token.value
  return _light === _dark ? _light : `light-dark(${_light}, ${_dark})`
}

function flattenAppearanceTokens(
  tokens: unknown,
  prefix: string[] = [],
): Record<string, string> {
  const result: Record<string, string> = {}

  if (!isRecord(tokens)) return result

  for (const [key, node] of Object.entries(tokens)) {
    const segments = [...prefix, key]

    if (isSemanticToken(node)) {
      result[toStylexKey(segments)] = toLightDark(node)
      continue
    }

    if (isRecord(node)) {
      Object.assign(result, flattenAppearanceTokens(node, segments))
    }
  }

  return result
}

function toIdent(name: string) {
  const ident = name
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+([a-zA-Z0-9])/g, (_, char: string) => char.toUpperCase())

  if (!ident) return 'appearance'
  return /^[A-Za-z_]/.test(ident) ? ident : `appearance${ident}`
}

function toClassName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

export function resolveAppearanceSeeds(options: AppearanceOptions = {}) {
  const base = {
    h: options.base?.h ?? DEFAULT_BASE.h,
    c: options.base?.c ?? DEFAULT_BASE.c,
    contrast: options.base?.contrast ?? DEFAULT_BASE.contrast,
  }
  const accent = options.accent ?? DEFAULT_ACCENT
  const sidebar = options.sidebar ?? 'base'
  const solidSidebar = sidebar !== 'base' && sidebar.solid !== undefined
  const tonalSidebar =
    sidebar === 'base'
      ? base
      : solidSidebar
        ? undefined
        : {
            h: sidebar.h ?? base.h,
            c: sidebar.c ?? base.c,
            contrast: sidebar.contrast ?? base.contrast,
          }

  return {
    base,
    accent,
    sidebar,
    solidSidebar,
    tonalSidebar,
    knobs: {
      '--sui-base': oklch(0.5, base.c, base.h),
      '--sui-accent': oklch(accent.l, accent.c, accent.h),
      '--sui-sidebar': tonalSidebar
        ? oklch(0.5, tonalSidebar.c, tonalSidebar.h)
        : 'var(--sui-base)',
      '--sui-sidebar-solid': solidSidebar
        ? oklch(sidebar.solid.l, sidebar.solid.c, sidebar.solid.h)
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

export function createAppearanceKnobs(options: AppearanceOptions = {}) {
  return resolveAppearanceSeeds(options).knobs
}

export function createAppearanceThemeVars(options: AppearanceOptions = {}) {
  return flattenAppearanceTokens(createAppearance(options))
}

export function createAppearanceCss(
  input: AppearanceThemeInput = {},
  cssOptions: AppearanceCssOptions = {},
) {
  const resolved = resolveAppearanceSeeds(input)
  const className = input.name ? toClassName(input.name) : undefined
  const selector =
    cssOptions.selector ??
    (className ? `.sui-theme.${className}` : '.sui-theme')

  const declarations = Object.entries(resolved.knobs)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n')

  const solidSidebar =
    resolved.solidSidebar &&
    `
  --sui-color-sidebar-bg: oklch(from var(--sui-sidebar-solid) l c h / 1);
  --sui-color-sidebar-fg: oklch(from var(--sui-sidebar-solid) calc(0.16 + 0.825 * var(--sui-sidebar-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-sidebar-foreground-tone))), calc(0.025 - 0.01 * var(--sui-sidebar-foreground-tone))) h / 1);
  --sui-color-sidebar-border: oklch(from var(--sui-sidebar-solid) calc(0.16 + 0.825 * var(--sui-sidebar-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-sidebar-foreground-tone))), calc(0.025 - 0.01 * var(--sui-sidebar-foreground-tone))) h / 0.22);
  --sui-color-sidebar-accent-bg: oklch(from var(--sui-sidebar-solid) calc(0.16 + 0.825 * var(--sui-sidebar-foreground-tone)) min(calc(c * calc(0.1 - 0.04 * var(--sui-sidebar-foreground-tone))), calc(0.025 - 0.01 * var(--sui-sidebar-foreground-tone))) h / 0.14);
  --sui-color-sidebar-accent-fg: var(--sui-color-sidebar-fg);`

  return `/* Generated by @saas-ui/stylex-preset appearance. */\n${selector} {\n${declarations}${solidSidebar || ''}\n}\n`
}

export function createAppearanceStylex(input: AppearanceThemeInput = {}) {
  const exportName = toIdent(input.name ?? 'appearance')
  const overrides = Object.entries(createAppearanceThemeVars(input))
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
    .join('\n')

  return `import * as stylex from '@stylexjs/stylex'

import { semanticColors } from '@saas-ui/stylex-preset/semantic-tokens/colors.stylex'

export const ${exportName} = stylex.createTheme(semanticColors, {
${overrides}
})
`
}

export function createAppearanceArtifact(
  input: AppearanceThemeInput,
  format: AppearanceFormat,
) {
  return format === 'stylex'
    ? createAppearanceStylex(input)
    : createAppearanceCss(input)
}
