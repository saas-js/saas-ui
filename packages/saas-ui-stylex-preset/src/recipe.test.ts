import { describe, expect, it } from 'vitest'

import { recipeStyles } from './recipe.ts'

describe('recipeStyles', () => {
  const recipe = {
    styles: {
      base: { id: 'base' },
      size_sm: { id: 'sm' },
      size_md: { id: 'md' },
      variant_solid: { id: 'solid' },
      variant_surface: { id: 'surface' },
      compound_variant_surface_size_md: { id: 'compound' },
    },
    defaultVariants: {
      size: 'md',
      variant: 'surface',
    },
  }

  it('applies default variants', () => {
    expect(recipeStyles(recipe)).toEqual([
      { id: 'base' },
      { id: 'md' },
      { id: 'surface' },
      { id: 'compound' },
    ])
  })

  it('overrides defaults and skips colorPalette', () => {
    expect(
      recipeStyles(recipe, {
        size: 'sm',
        variant: 'solid',
        colorPalette: 'blue',
      } as never),
    ).toEqual([{ id: 'base' }, { id: 'sm' }, { id: 'solid' }])
  })
})
