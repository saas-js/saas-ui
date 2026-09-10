import { describe, expect, it } from 'vitest'

import {
  createAppearanceCss,
  createAppearanceCssVars,
  createAppearanceStylex,
  createAppearanceThemeVars,
} from './create-appearance.ts'

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
  })
})

describe('createAppearanceThemeVars', () => {
  it('bakes status palettes from the accent treatment', () => {
    const vars = createAppearanceThemeVars({
      accent: { l: 0.6, c: 0.18, h: 235, foreground: 'light' },
    })

    expect(vars.accentSolid).toBe('oklch(0.6 0.18 235)')
    expect(vars.successSolid).toBe('oklch(0.6 0.18 150)')
    expect(vars.warningSolid).toBe('oklch(0.6 0.18 50)')
    expect(vars.infoSolid).toBe('oklch(0.6 0.18 260)')
    expect(vars.destructiveSolid).toBe('oklch(0.6 0.18 25)')
  })
})

describe('createAppearance artifacts', () => {
  it('emits a named CSS theme', () => {
    const css = createAppearanceCss({
      name: 'ocean',
      base: { h: 225, c: 0.01 },
      accent: { l: 0.53, c: 0.18, h: 235, foreground: 'light' },
    })

    expect(css).toContain('.sui-theme.ocean')
    expect(css).toContain('--sui-accent: oklch(0.53 0.18 235);')
  })

  it('emits a static StyleX createTheme module', () => {
    const source = createAppearanceStylex({
      name: 'ocean',
      accent: { l: 0.53, c: 0.18, h: 235, foreground: 'light' },
    })

    expect(source).toContain('export const ocean = stylex.createTheme')
    expect(source).toContain('accentSolid: "oklch(0.53 0.18 235)"')
    expect(source).toContain(
      "from '@saas-ui/stylex-preset/semantic-tokens/colors.stylex'",
    )
  })
})
