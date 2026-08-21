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
  /^(var\(|calc\(|clamp\(|min\(|max\(|oklch\(|rgb\(|rgba\(|hsl\(|hsla\(|color-mix\(|light-dark\(|linear-gradient\(|url\()/
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
  'text',
  'fit-content',
  'max-content',
  'min-content',
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

function splitTokenPath(path: string): string[] {
  return path.split('.').reduce<string[]>((parts, part) => {
    const previous = parts.at(-1)
    if (previous && /^\d+$/.test(previous) && /^\d+$/.test(part)) {
      parts[parts.length - 1] = `${previous}.${part}`
      return parts
    }

    parts.push(part)
    return parts
  }, [])
}

function parseTokenPath(path: string, source: string): TokenRef {
  const [withoutOpacity, opacityPart] = path.split('/')
  const opacity = opacityPart ? Number(opacityPart) : undefined
  const segments = splitTokenPath(withoutOpacity)

  if (segments[0] === 'colors' && segments[1] === 'colorPalette') {
    return {
      kind: opacity ? 'colorMix' : 'colorPalette',
      key: toStylexKey(segments.slice(2)),
      opacity,
      source,
    }
  }

  if (segments[0] === 'colors' && SEMANTIC_COLOR_ROOTS.has(segments[1] ?? '')) {
    return {
      kind: opacity ? 'colorMix' : 'token',
      category: 'semanticColors',
      key: toStylexKey(segments.slice(1)),
      opacity,
      source,
    }
  }

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
    if (category && value !== 0 && isScaleCategory(category)) {
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

  if (value === '0') {
    return { kind: 'raw', raw: '0', source: value }
  }

  if (isNumericString(value)) {
    if (category && isScaleCategory(category)) {
      if (isKnownScaleToken(value)) {
        return {
          kind: 'token',
          category,
          key: toStylexKey([value]),
          source: value,
        }
      }

      return {
        kind: 'raw',
        raw: `calc(${value} * 0.25rem * var(--scale-factor, 1))`,
        source: value,
      }
    }

    return { kind: 'raw', raw: value, source: value }
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

  if (parsed.kind === 'raw' && category && looksLikeTokenPath(value)) {
    const key = isDottedTokenCategory(category)
      ? toStylexKey([value])
      : toStylexKey(splitTokenPath(value))

    return {
      kind: 'token',
      category: category === 'colors' ? inferColorCategory(value) : category,
      key,
      source: value,
    }
  }

  return parsed
}

function isExplicitCssValue(value: string): boolean {
  if (CSS_FUNCTIONS.test(value) || value.startsWith('#')) {
    return true
  }

  if (value.includes(' ') || value.includes(',')) {
    return true
  }

  if (
    /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|dvh|svh|lvh|ch|ms|s|deg)$/.test(value)
  ) {
    return true
  }

  return CSS_KEYWORDS.has(value)
}

function isNumericString(value: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(value)
}

function isScaleCategory(category: TokenCategory): boolean {
  return category === 'spacing' || category === 'sizes'
}

function isKnownScaleToken(value: string): boolean {
  if (!value.includes('.')) {
    return true
  }

  return /^(0|1|2|3|4)\.5$/.test(value)
}

function isDottedTokenCategory(category: TokenCategory): boolean {
  return category === 'lineHeights' || category === 'letterSpacings'
}

function looksLikeTokenPath(value: string): boolean {
  return /^[A-Za-z][\w./-]*$/.test(value) || isNumericString(value)
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
      : ref.category === 'radii' && ref.key && !isSemanticRadius(ref.key)
        ? 'radii'
        : (identifiers[ref.category] ?? identifiers.colors)

  const access = `${ident}.${ref.key}`

  if (ref.kind === 'colorMix' && ref.opacity != null) {
    return `\`color-mix(in oklch, \${${access}} ${ref.opacity}%, transparent)\``
  }

  return access
}

function isSemanticRadius(key: string): boolean {
  return /^(l\d|control|panel|indicator)/.test(key)
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
