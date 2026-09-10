import { describe, expect, it } from 'vitest'

import { recipeClassNames } from './recipe.ts'

describe('recipeClassNames', () => {
  it('joins class with variant modifiers', () => {
    expect(
      recipeClassNames('btn', { size: 'md', variant: 'solid' }),
    ).toEqual('btn btn--size-md btn--variant-solid')
  })

  it('skips empty variant values', () => {
    expect(recipeClassNames('btn', { size: undefined })).toEqual('btn')
  })
})
