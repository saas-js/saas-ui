import { describe, expect, it } from 'vitest'

import {
  contrastRatio,
  hexToOklch,
  inSrgbGamut,
  normalizeHex,
  oklchToHex,
  parseOklch,
} from './color'

describe('color', () => {
  it('normalizes hex input', () => {
    expect(normalizeHex('ABC')).toBe('#aabbcc')
    expect(normalizeHex('#6D28D9')).toBe('#6d28d9')
    expect(normalizeHex('#12345')).toBeNull()
  })

  it('converts hex to oklch', () => {
    expect(hexToOklch('#ffffff')).toEqual({ l: 1, c: 0, h: 0 })
    expect(hexToOklch('#000000')).toEqual({ l: 0, c: 0, h: 0 })
    // Tailwind violet-700
    const violet = hexToOklch('#6d28d9')
    expect(violet.l).toBeCloseTo(0.491, 2)
    expect(violet.c).toBeCloseTo(0.241, 2)
    expect(violet.h).toBeCloseTo(292.6, 0)
  })

  it('round trips sRGB colors within the 3 decimal oklch precision', () => {
    const channels = (hex: string) =>
      [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))
    for (const hex of ['#6d28d9', '#1f2937', '#f59e0b', '#10b981', '#ff0000']) {
      const result = channels(oklchToHex(hexToOklch(hex)))
      channels(hex).forEach((channel, i) => {
        expect(Math.abs(channel - result[i]!)).toBeLessThanOrEqual(2)
      })
    }
  })

  it('detects out of gamut colors', () => {
    expect(inSrgbGamut({ l: 0.62, c: 0.1, h: 260 })).toBe(true)
    expect(inSrgbGamut({ l: 0.9, c: 0.3, h: 150 })).toBe(false)
  })

  it('parses oklch strings', () => {
    expect(parseOklch('oklch(0.5 0.1 200)')).toEqual({
      l: 0.5,
      c: 0.1,
      h: 200,
      a: undefined,
    })
    expect(parseOklch('oklch(50% 0.1 200 / 0.4)')).toEqual({
      l: 0.5,
      c: 0.1,
      h: 200,
      a: 0.4,
    })
    expect(parseOklch('#fff')).toBeNull()
  })

  it('computes WCAG contrast', () => {
    expect(contrastRatio(hexToOklch('#fff'), hexToOklch('#000'))).toBeCloseTo(21, 1)
    expect(
      contrastRatio(hexToOklch('#767676'), hexToOklch('#ffffff')),
    ).toBeCloseTo(4.54, 1)
  })
})
