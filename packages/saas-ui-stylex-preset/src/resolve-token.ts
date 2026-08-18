import { toStylexKey } from './flatten.ts'
import type { TokenCategory } from './properties.ts'

export interface TokenRef {
  kind: 'token' | 'colorPalette' | 'raw' | 'cssVar' | 'colorMix'
  category?: TokenCategory | 'semanticColors'
  key?: string
  cssVar?: string
  raw?: string
  opacity?: number
  source: string
}

const CSS_FUNCTIONS =
  /^(var\(|calc\(|clamp\(|min\(|max\(|oklch\(|rgb\(|hsl\(|color-mix\(|light-dark\(|linear-gradient\(|url\()/
const CSS_KEYWORDS = new Set([
  'auto',
  'none',
  'inherit',
  'initial',
  'unset',
  'revert',
  'transparent',
  'currentColor',
  'currentcolor',
  'solid',
  'dashed',
  'dotted',
  'hidden',
  'visible',
  'clip',
  'center',
  'start',
  'end',
  'stretch',
  'baseline',
  'pointer',
  'default',
  'not-allowed',
  'relative',
  'absolute',
  'fixed',
  'sticky',
  'inline-flex',
  'flex',
  'grid',
  'block',
  'inline',
  'inline-block',
  'contents',
])

const CATEGORY_ALIASES: Record<string, TokenCategory | 'semanticColors'> = {
  colors: 'colors',
  color: 'colors',
  spacing: 'spacing',
  space: 'spacing',
  sizes: 'sizes',
  size: 'sizes',
  radii: 'radii',
  radius: 'radii',
  shadows: 'shadows',
  shadow: 'shadows',
  fonts: 'fonts',
  fontSizes: 'fontSizes',
  fontWeights: 'fontWeights',
  lineHeights: 'lineHeights',
  letterSpacings: 'letterSpacings',
  durations: 'durations',
  easings: 'easings',
  zIndex: 'zIndex',
  zIndices: 'zIndex',
  blurs: 'blurs',
  borders: 'borders',
  cursor: 'cursor',
  animations: 'animations',
}

const SEMANTIC_COLOR_ROOTS = new Set([
  'bg',
  'fg',
  'border',
  'accent',
  'sidebar',
  'status',
  'presence',
  'interaction',
  'colorPalette',
])

export function parseTokenReference(value: string): TokenRef {
  const braced = value.match(/^\{([^{}]+)\}$/)
  if (braced) {
    return parseTokenPath(braced[1], value)
  }

  return parseTokenPath(value, value)
}

function parseTokenPath(path: string, source: string): TokenRef {
  const [withoutOpacity, opacityPart] = path.split('/')
  const opacity = opacityPart ? Number(opacityPart) : undefined
  const segments = withoutOpacity.split('.')

  if (segments[0] === 'colorPalette') {
    return {
      kind: opacity ? 'colorMix' : 'colorPalette',
      key: toStylexKey(segments.slice(1)),
      opacity,
      source,
    }
  }

  if (segments[0] in CATEGORY_ALIASES) {
    const category = CATEGORY_ALIASES[segments[0]]
    const key = toStylexKey(segments.slice(1))
    return {
      kind: opacity ? 'colorMix' : 'token',
      category,
      key,
      opacity,
      source,
    }
  }

  if (SEMANTIC_COLOR_ROOTS.has(segments[0])) {
    return {
      kind: opacity ? 'colorMix' : 'token',
      category: 'semanticColors',
      key: toStylexKey(segments),
      opacity,
      source,
    }
  }

  return {
    kind: 'raw',
    raw: source,
    source,
  }
}

export function isRawCssValue(value: string): boolean {
  if (CSS_KEYWORDS.has(value)) {
    return true
  }

  if (CSS_FUNCTIONS.test(value)) {
    return true
  }

  if (
    /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|dvh|svh|lvh|ch|ms|s|deg)?$/.test(value)
  ) {
    return true
  }

  if (value.startsWith('#') || value.includes(' ') || value.includes(',')) {
    return true
  }

  return false
}

export function resolveStyleValue(
  value: unknown,
  category?: TokenCategory,
): TokenRef {
  if (typeof value === 'number') {
    if (category) {
      return {
        kind: 'token',
        category,
        key: toStylexKey([String(value)]),
        source: String(value),
      }
    }

    return { kind: 'raw', raw: String(value), source: String(value) }
  }

  if (typeof value !== 'string') {
    return { kind: 'raw', raw: String(value), source: String(value) }
  }

  if (value.startsWith('var(--') || value.startsWith('--')) {
    const cssVar = value.startsWith('--') ? value : undefined
    return {
      kind: cssVar ? 'cssVar' : 'raw',
      cssVar,
      raw: value,
      source: value,
    }
  }

  if (!category && isRawCssValue(value)) {
    return { kind: 'raw', raw: value, source: value }
  }

  if (category && isExplicitCssValue(value)) {
    return { kind: 'raw', raw: value, source: value }
  }

  const parsed = parseTokenReference(value)

  if (parsed.kind === 'raw' && category) {
    return {
      kind: 'token',
      category: category === 'colors' ? inferColorCategory(value) : category,
      key: toStylexKey(value.split('.')),
      source: value,
    }
  }

  return parsed
}

function isExplicitCssValue(value: string): boolean {
  if (CSS_FUNCTIONS.test(value) || value.startsWith('#')) {
    return true
  }

  if (
    /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|dvh|svh|lvh|ch|ms|s|deg)$/.test(value)
  ) {
    return true
  }

  return CSS_KEYWORDS.has(value)
}

function inferColorCategory(value: string): TokenCategory | 'semanticColors' {
  const root = value.split('.')[0]
  if (SEMANTIC_COLOR_ROOTS.has(root) || root === 'colorPalette') {
    return 'semanticColors'
  }
  return 'colors'
}

export function tokenRefToCode(
  ref: TokenRef,
  identifiers: Record<string, string> = defaultIdentifiers,
): string {
  if (ref.kind === 'raw' || ref.kind === 'cssVar') {
    return JSON.stringify(ref.raw ?? ref.cssVar)
  }

  const ident =
    ref.kind === 'colorPalette' || ref.category === undefined
      ? identifiers.colorPalette
      : (identifiers[ref.category] ?? identifiers.colors)

  const access = `${ident}.${ref.key}`

  if (ref.kind === 'colorMix' && ref.opacity != null) {
    return `\`color-mix(in oklch, \${${access}} ${ref.opacity}%, transparent)\``
  }

  return access
}

export const defaultIdentifiers: Record<string, string> = {
  colors: 'colors',
  semanticColors: 'semanticColors',
  colorPalette: 'colorPalette',
  spacing: 'spacing',
  sizes: 'sizes',
  radii: 'semanticRadii',
  fontSizes: 'fontSizes',
  fontWeights: 'fontWeights',
  lineHeights: 'lineHeights',
  letterSpacings: 'letterSpacings',
  shadows: 'semanticShadows',
  durations: 'durations',
  easings: 'easings',
  zIndex: 'zIndices',
  blurs: 'blurs',
  borders: 'borders',
  fonts: 'fonts',
  cursor: 'cursor',
  animations: 'animations',
}
