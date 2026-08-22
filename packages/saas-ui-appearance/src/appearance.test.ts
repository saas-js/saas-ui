import { describe, expect, it } from 'vitest'

import {
  createAppearance,
  createAppearanceCssVars,
  resolveAppearanceSeeds,
} from './appearance.ts'

describe('createAppearance', () => {
  it('creates semantic tokens from the default seeds', () => {
    const appearance = createAppearance()

    expect(appearance.bg.DEFAULT.value).toEqual({
      _light: 'oklch(0.985 0.002 260)',
      _dark: 'oklch(0.14 0.002 260)',
    })
    expect(appearance.accent.solid.value._light).toBe(
      'oklch(0.511 0.262 276.966)',
    )
    expect(appearance.success.solid.value._light).toBe(
      'oklch(0.511 0.262 150)',
    )
  })
})

describe('createAppearanceCssVars', () => {
  it('writes seed variables from the appearance inputs', () => {
    const cssVars = createAppearanceCssVars({
      base: { h: 225, c: 0.01, contrast: 'soft' },
      accent: { l: 0.6, c: 0.18, h: 235, foreground: 'dark' },
    })

    expect(cssVars['--sui-base']).toBe('oklch(0.5 0.01 225)')
    expect(cssVars['--sui-accent']).toBe('oklch(0.6 0.18 235)')
    expect(cssVars['--sui-contrast']).toBe('-1')
    expect(cssVars['--sui-accent-foreground-tone']).toBe('0')
  })

  it('bakes a solid sidebar into the seed variables', () => {
    const cssVars = createAppearanceCssVars({
      sidebar: {
        solid: { l: 0.55, c: 0.24, h: 292 },
        foreground: 'light',
      },
    })

    expect(cssVars['--sui-sidebar-solid']).toBe('oklch(0.55 0.24 292)')
    expect(cssVars['--sui-sidebar-foreground-tone']).toBe('1')
    expect(resolveAppearanceSeeds().tonalSidebar).toEqual({
      h: 260,
      c: 0.012,
      contrast: 'normal',
    })
  })
})
