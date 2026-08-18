export interface RecipeDefinition<
  V extends Record<string, Record<string, unknown>> = Record<
    string,
    Record<string, unknown>
  >,
> {
  styles: { readonly [key: string]: unknown }
  defaultVariants?: {
    [K in keyof V]?: keyof V[K] & string
  }
  variantKeys?: (keyof V & string)[]
}

export type RecipeSelection<V extends Record<string, Record<string, unknown>>> =
  {
    [K in keyof V]?: keyof V[K] & string
  }

/**
 * Pick precompiled StyleX recipe keys for the resolved variant selection.
 *
 * StyleX requires `stylex.create()` objects to be static, so recipes compile
 * each variant to a named style (`variant_solid`, `size_md`) and this helper
 * only chooses which ones to pass to `stylex.props`.
 */
export function recipeStyles<V extends Record<string, Record<string, unknown>>>(
  recipe: RecipeDefinition<V>,
  variants?: RecipeSelection<V>,
): unknown[] {
  const resolved = {
    ...(recipe.defaultVariants ?? {}),
    ...variants,
  }

  const selected: unknown[] = []
  const styles = recipe.styles as Record<string, unknown>

  if (styles.base) {
    selected.push(styles.base)
  }

  for (const [name, value] of Object.entries(resolved)) {
    if (name === 'colorPalette' || value == null) {
      continue
    }

    const key = `${name}_${value}`
    if (styles[key]) {
      selected.push(styles[key])
    }
  }

  for (const [key, style] of Object.entries(styles)) {
    if (key.startsWith('compound_') && matchesCompound(key, resolved)) {
      selected.push(style)
    }
  }

  return selected
}

function matchesCompound(
  key: string,
  resolved: Record<string, unknown>,
): boolean {
  // compound_variant_surface_size_md
  const parts = key.replace(/^compound_/, '').split('_')
  const pairs: string[] = []

  for (let index = 0; index < parts.length; index += 2) {
    const name = parts[index]
    const value = parts[index + 1]
    if (!name || value == null) {
      return false
    }
    pairs.push(name)
    if (resolved[name] !== value) {
      return false
    }
  }

  return pairs.length > 0
}

export function recipeClassNames(
  className: string,
  variants?: Record<string, string | undefined>,
): string {
  const parts = [className]

  for (const [name, value] of Object.entries(variants ?? {})) {
    if (value) {
      parts.push(`${className}--${name}-${value}`)
    }
  }

  return parts.join(' ')
}
