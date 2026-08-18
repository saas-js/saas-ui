export interface ChakraToken {
  value: unknown
}

export type TokenNode = ChakraToken | TokenTree

export interface TokenTree {
  [key: string]: TokenNode
}

export interface FlattenedToken {
  /** Dotted Chakra path, e.g. `colors.blue.500` or `bg.muted`. */
  path: string
  /** Path segments without the token category. */
  segments: string[]
  /** CamelCase StyleX `defineVars` key, e.g. `blue500`. */
  key: string
  /** Stable CSS custom property, e.g. `--sui-colors-blue-500`. */
  cssVar: string
  value: unknown
}

export function isLeafToken(value: unknown): value is ChakraToken {
  return value != null && typeof value === 'object' && 'value' in value
}

/**
 * Convert a Chakra token path to a StyleX-safe identifier.
 *
 * `blue.500` → `blue500`
 * `bg.DEFAULT` → `bg`
 * `0.5` → `_0_5`
 * `control.sm` → `controlSm`
 */
export function toStylexKey(segments: string[]): string {
  const parts = segments.filter((part) => part !== 'DEFAULT')

  if (parts.length === 0) {
    return 'DEFAULT'
  }

  const camel = parts
    .map((part, index) => {
      const normalized = part
        .replace(/\//g, 'on')
        .replace(/\./g, '_')
        .replace(/-([a-zA-Z0-9])/g, (_, char: string) => char.toUpperCase())

      if (index === 0) {
        return normalized
      }

      return normalized.charAt(0).toUpperCase() + normalized.slice(1)
    })
    .join('')

  return /^[0-9]/.test(camel) ? `_${camel}` : camel
}

export function toCssVarName(category: string, segments: string[]): string {
  const parts = [category, ...segments.filter((part) => part !== 'DEFAULT')]
    .join('-')
    .replace(/\//g, '-on-')
    .replace(/\./g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .toLowerCase()

  return `--sui-${parts}`
}

export function flattenTokens(
  tokens: TokenTree,
  category: string,
  prefix: string[] = [],
): FlattenedToken[] {
  const result: FlattenedToken[] = []

  for (const [key, node] of Object.entries(tokens)) {
    const segments = [...prefix, key]

    if (isLeafToken(node)) {
      result.push({
        path: [category, ...segments.filter((part) => part !== 'DEFAULT')].join(
          '.',
        ),
        segments,
        key: toStylexKey(segments),
        cssVar: toCssVarName(category, segments),
        value: node.value,
      })
      continue
    }

    if (node && typeof node === 'object') {
      result.push(...flattenTokens(node as TokenTree, category, segments))
    }
  }

  return result
}

export function isLightDarkValue(
  value: unknown,
): value is { _light: unknown; _dark: unknown } {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    '_light' in (value as object) &&
    '_dark' in (value as object)
  )
}
