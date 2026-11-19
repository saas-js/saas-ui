import { describe, expect, it } from 'vitest'

import { defaultSystem } from '../index.ts'

describe('Chakra 3.37+/3.38 components', () => {
  it('registers Saas UI slot recipes for Command and DateInput', () => {
    expect(defaultSystem.getSlotRecipe('command')).toBeDefined()
    expect(defaultSystem.getSlotRecipe('dateInput')).toBeDefined()
    // The keyboard shortcut group has its own recipe, separate from Command.
    expect(defaultSystem.getRecipe('suiKbdGroup')).toBeDefined()
  })

  it('rings the DateInput group from data-focus, not the input focus-visible ring', () => {
    const recipe = defaultSystem.getSlotRecipe('dateInput')!
    const outline = recipe.variants!.variant.outline.segmentGroup as Record<
      string,
      unknown
    >

    expect(outline.focusVisibleRing).toBeUndefined()
    expect(outline.focusRing).toBe('inside')

    const css = JSON.stringify(defaultSystem.css(outline))
    expect(css).toContain('data-focus')
  })
})
