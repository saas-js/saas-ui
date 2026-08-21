import { getStylexCondition, isConditionKey } from './conditions.ts'
import { cssOnlyProperties, getProperty } from './properties.ts'
import { resolveStyleValue, tokenRefToCode } from './resolve-token.ts'

export type StyleObject = Record<string, unknown>

const TEXT_STYLES: Record<string, StyleObject> = {
  '2xs': { fontSize: 'fontSizes._2xs', lineHeight: 'lineHeights._2xs' },
  xs: { fontSize: 'fontSizes.xs', lineHeight: 'lineHeights.xs' },
  sm: { fontSize: 'fontSizes.sm', lineHeight: 'lineHeights.sm' },
  md: { fontSize: 'fontSizes.md', lineHeight: 'lineHeights.md' },
  lg: { fontSize: 'fontSizes.lg', lineHeight: 'lineHeights.lg' },
  xl: { fontSize: 'fontSizes.xl', lineHeight: 'lineHeights.xl' },
  '2xl': { fontSize: 'fontSizes._2xl', lineHeight: 'lineHeights._2xl' },
}

const LAYER_STYLES: Record<string, StyleObject> = {
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}

const TRANSITION_PROPERTIES: Record<string, string> = {
  common:
    'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  colors: 'background-color, border-color, color, fill, stroke',
  size: 'width, height',
  position: 'left, right, top, bottom, inset',
}

const FOCUS_RING: Record<string, StyleObject> = {
  outside: {
    outlineWidth: '1px',
    outlineOffset: '2px',
    outlineStyle: 'solid',
    outlineColor: 'colorPalette.focusRing',
  },
  inside: {
    outlineWidth: 'var(--focus-ring-width, 0)',
    outlineOffset: '0px',
    outlineStyle: 'solid',
    outlineColor: 'colorPalette.focusRing',
  },
  none: {
    outline: 'none',
  },
}

export interface TransformedStyle {
  [key: string]: string | number | TransformedStyle
}

export interface TransformMeta {
  skipped: string[]
}

/**
 * Translate a Chakra style object into a StyleX-shaped object whose values
 * are either raw CSS or `group.key` token references.
 */
export function transformStyleObject(
  styles: StyleObject,
  meta: TransformMeta = { skipped: [] },
): TransformedStyle {
  const result: TransformedStyle = {}

  for (const [key, value] of Object.entries(styles)) {
    if (key === 'colorPalette') {
      continue
    }

    if (key === 'textStyle' && typeof value === 'string') {
      Object.assign(result, expandTextStyle(value))
      continue
    }

    if (key === 'layerStyle' && typeof value === 'string') {
      Object.assign(result, LAYER_STYLES[value] ?? {})
      continue
    }

    if (key === 'focusVisibleRing' && typeof value === 'string') {
      const ring = FOCUS_RING[value]
      if (ring) {
        result[':focus-visible'] = {
          ...((result[':focus-visible'] as TransformedStyle) ?? {}),
          ...transformStyleObject(ring, meta),
        }
      }
      continue
    }

    if (key === 'focusRing' && typeof value === 'string') {
      const ring = FOCUS_RING[value]
      if (ring) {
        result[':focus'] = {
          ...((result[':focus'] as TransformedStyle) ?? {}),
          ...transformStyleObject(ring, meta),
        }
      }
      continue
    }

    if (key === 'transitionProperty' && typeof value === 'string') {
      result.transitionProperty = TRANSITION_PROPERTIES[value] ?? value
      continue
    }

    if (isConditionKey(key)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const condition = getStylexCondition(key)
        if (!condition) {
          meta.skipped.push(key)
          continue
        }
        result[condition] = transformStyleObject(value as StyleObject, meta)
      }
      continue
    }

    if (key.startsWith('--')) {
      result[key] =
        typeof value === 'string' || typeof value === 'number'
          ? resolveCustomProperty(value)
          : String(value)
      continue
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (isLightDarkShorthand(value)) {
        const mapped = getProperty(key)
        const cssKeys = toArray(mapped?.css ?? key)
        const light = resolveLiteral(value.base, mapped?.category)
        const dark = resolveLiteral(value._dark, mapped?.category)
        for (const cssKey of cssKeys) {
          result[toStylexCssKey(cssKey, value.base)] =
            `light-dark(${light}, ${dark})`
        }
        continue
      }

      meta.skipped.push(key)
      continue
    }

    const mapped = getProperty(key)
    if (mapped) {
      const resolved = resolveLiteral(value, mapped.category)
      for (const cssKey of toArray(mapped.css)) {
        result[toStylexCssKey(cssKey, value)] = resolved
      }
      continue
    }

    if (cssOnlyProperties.has(key) || key in result || isCssProperty(key)) {
      result[toStylexCssKey(key, value)] = resolveCssOnlyValue(value)
      continue
    }

    meta.skipped.push(key)
  }

  return result
}

function expandTextStyle(name: string): TransformedStyle {
  const style = TEXT_STYLES[name]
  if (!style) {
    return {}
  }

  return {
    fontSize: String(style.fontSize),
    lineHeight: String(style.lineHeight),
  }
}

function resolveCustomProperty(value: string | number): string {
  if (typeof value === 'number') {
    return String(value)
  }

  const ref = resolveStyleValue(value)
  if (ref.kind === 'raw' || ref.kind === 'cssVar') {
    return value
  }

  return tokenRefToCode(ref)
}

function resolveLiteral(
  value: unknown,
  category?: Parameters<typeof resolveStyleValue>[1],
): string | number {
  if (value === 0) {
    return 0
  }

  const ref = resolveStyleValue(value, category)

  if (ref.kind === 'raw') {
    if (ref.raw != null && /^-?\d+(\.\d+)?$/.test(ref.raw)) {
      const numeric = Number(ref.raw)
      return Number.isNaN(numeric) ? ref.raw : numeric
    }
    return ref.raw ?? ''
  }

  if (ref.kind === 'cssVar') {
    return ref.raw ?? ''
  }

  return tokenRefToCode(ref)
}

function isLightDarkShorthand(
  value: object,
): value is { base: unknown; _dark: unknown } {
  return 'base' in value && '_dark' in value
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

function isBackgroundImageValue(value: unknown): boolean {
  return (
    typeof value === 'string' &&
    /(?:repeating-)?(?:linear|radial|conic)-gradient\(|url\(|image-set\(/i.test(
      value,
    )
  )
}

function toStylexCssKey(cssKey: string, value: unknown): string {
  if (cssKey !== 'background') {
    return cssKey
  }

  return isBackgroundImageValue(value) ? 'backgroundImage' : 'backgroundColor'
}

function resolveCssOnlyValue(value: unknown): string | number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value)
  }

  if (typeof value === 'string') {
    const ref = resolveStyleValue(value)
    if (ref.kind !== 'raw' && ref.kind !== 'cssVar') {
      return tokenRefToCode(ref)
    }
  }

  return String(value)
}

function isCssProperty(key: string): boolean {
  return /^[a-z]+(?:[A-Z][a-z]+)*$/.test(key)
}

export function styleObjectToCode(
  styles: TransformedStyle,
  indent = 2,
): string {
  return serialize(styles, indent)
}

function serialize(value: unknown, indent: number): string {
  const pad = ' '.repeat(indent)

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const entries = Object.entries(value as TransformedStyle)
    if (entries.length === 0) {
      return '{}'
    }

    const inner = entries
      .map(([key, val]) => {
        const printedKey = needsQuotes(key) ? JSON.stringify(key) : key
        return `${pad}${printedKey}: ${serialize(val, indent + 2)}`
      })
      .join(',\n')

    return `{\n${inner},\n${' '.repeat(indent - 2)}}`
  }

  if (typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'string') {
    if (/^[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*$/.test(value)) {
      return value
    }

    if (value.startsWith('`') || value.startsWith('color-mix(')) {
      return value
    }

    return JSON.stringify(value)
  }

  return JSON.stringify(value)
}

function needsQuotes(key: string): boolean {
  if (key.startsWith('[') && key.endsWith(']')) {
    return false
  }

  return !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
}
