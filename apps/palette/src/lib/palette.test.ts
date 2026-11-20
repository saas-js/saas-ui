import { paletteSeeds } from '@saas-ui/appearance'
import { describe, expect, it } from 'vitest'

import { exportFormats, exportPalette } from './code'
import {
  defaultState,
  generatePalette,
  stateFromSearchParams,
  stateToSearch,
} from './palette'

describe('generatePalette', () => {
  it('reproduces the Saas UI default accent', () => {
    const palette = generatePalette(defaultState)
    expect(palette.accent.l).toBeCloseTo(0.511, 2)
    expect(palette.accent.c).toBeCloseTo(0.262, 2)
    expect(palette.accent.h).toBeCloseTo(277, 0)
    expect(palette.accent.foreground).toBe('light')
  })

  it('picks dark text for light brand colors', () => {
    const palette = generatePalette({ ...defaultState, color: '#facc15' })
    expect(palette.accent.foreground).toBe('dark')
  })

  it('respects an explicit foreground', () => {
    const palette = generatePalette({
      ...defaultState,
      color: '#facc15',
      foreground: 'light',
    })
    expect(palette.accent.foreground).toBe('light')
  })

  it('generates a full scale for brand, gray and catalog hues', () => {
    const palette = generatePalette(defaultState)
    expect(Object.keys(palette.scales.brand!)).toHaveLength(11)
    expect(palette.scales.gray!['500']!.value).toMatch(/^oklch\(/)
    expect(palette.scales.teal).toBeDefined()
    expect(palette.palettes.brand!.solid.value._light).toMatch(/^oklch\(/)
  })

  it('harmonizes catalog chroma to a muted brand color', () => {
    const palette = generatePalette({ ...defaultState, color: '#5b7083' })
    expect(palette.harmonized).toBe(true)
    expect(palette.catalog.blue!.c).toBe(palette.accent.c)
    expect(palette.catalog.blue!.h).toBe(paletteSeeds.blue.h)

    const off = generatePalette({
      ...defaultState,
      color: '#5b7083',
      harmonize: false,
    })
    expect(off.harmonized).toBe(false)
    expect(off.catalog).toEqual({})
  })

  it('leaves the catalog alone for vivid brand colors', () => {
    expect(generatePalette(defaultState).harmonized).toBe(false)
  })

  it('tints gray with the base hue', () => {
    const palette = generatePalette({ ...defaultState, baseHue: 40 })
    expect(palette.scales.gray!['500']!.value).toMatch(/ 40\)$/)
  })
})

describe('url state', () => {
  it('round trips through the search string', () => {
    const state = {
      ...defaultState,
      color: '#0ea5e9',
      baseHue: 220,
      baseChroma: 0.02,
      contrast: 'strong' as const,
      harmonize: false,
    }
    const search = stateToSearch(state)
    const parsed = stateFromSearchParams(
      Object.fromEntries(new URLSearchParams(search)),
    )
    expect(parsed).toEqual(state)
  })

  it('keeps default links clean', () => {
    expect(stateToSearch(defaultState)).toBe('')
  })

  it('falls back on garbage input', () => {
    expect(
      stateFromSearchParams({ color: 'nope', hue: 'x', contrast: 'loud' }),
    ).toEqual(defaultState)
  })
})

describe('exportPalette', () => {
  it('produces every format', () => {
    const palette = generatePalette({ ...defaultState, color: '#5b7083' })
    for (const { value } of exportFormats) {
      expect(exportPalette(palette, value).length).toBeGreaterThan(50)
    }
    expect(exportPalette(palette, 'saas-ui')).toContain('createAppearance')
    expect(exportPalette(palette, 'saas-ui')).toContain('catalog(createScale)')
    expect(exportPalette(palette, 'css')).toContain('--sui-accent')
    expect(exportPalette(palette, 'tailwind')).toContain('--color-brand-500')
    expect(() => JSON.parse(exportPalette(palette, 'json'))).not.toThrow()
  })
})
