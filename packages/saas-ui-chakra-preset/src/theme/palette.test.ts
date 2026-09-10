import { describe, expect, it } from 'vitest'

import { defaultSystem } from '../index.ts'
import {
  createPalette,
  createScale,
  paletteNames,
  paletteSeeds,
} from './palette.ts'
import { semanticColors } from './semantic-tokens/colors.ts'
import { colors } from './tokens/colors.ts'

function parseOklch(value: string) {
  const match = value.match(
    /^oklch\(([-\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/,
  )

  if (!match) {
    throw new Error(`Expected an oklch() color, received ${value}`)
  }

  return {
    l: Number(match[1]),
    c: Number(match[2]),
    h: Number(match[3]),
    a: match[4] === undefined ? undefined : Number(match[4]),
  }
}

describe('createScale', () => {
  it('caps chromatic chroma and keeps hue stable', () => {
    const red = createScale(paletteSeeds.red)
    const mid = parseOklch(red[500].value)
    const light = parseOklch(red[50].value)

    expect(mid.c).toBeLessThanOrEqual(0.22)
    expect(light.c).toBeLessThan(mid.c)
    expect(mid.h).toBe(25)
    expect(light.h).toBe(25)
  })

  it('does not raise neutral chroma toward 950', () => {
    const gray = createScale(paletteSeeds.gray)
    const mid = parseOklch(gray[500].value)
    const dark = parseOklch(gray[950].value)

    expect(dark.c).toBeLessThanOrEqual(0.02)
    expect(dark.c).toBeLessThanOrEqual(mid.c)
  })
})

describe('createPalette', () => {
  it('uses the seed as solid and alpha washes for fills', () => {
    const red = createPalette(paletteSeeds.red)

    expect(red.solid.value._light).toBe('oklch(0.55 0.22 25)')
    expect(red.solid.value._dark).toBe('oklch(0.55 0.22 25)')
    expect(parseOklch(red.muted.value._light).a).toBe(0.07)
    expect(parseOklch(red.muted.value._dark).a).toBe(0.1)
    expect(red.border.value).not.toEqual(red.subtle.value)
  })

  it('uses black and white as the hard neutral accent', () => {
    const neutral = createPalette(paletteSeeds.neutral)

    expect(neutral.solid.value).toEqual({
      _light: '{colors.black}',
      _dark: '{colors.white}',
    })
    expect(neutral.contrast.value).toEqual({
      _light: '{colors.white}',
      _dark: '{colors.black}',
    })
  })
})

describe('theme palettes', () => {
  it('ships palette slots without 50–950 scales or slate', () => {
    expect(paletteNames).not.toContain('slate')
    expect(colors).not.toHaveProperty('slate')
    expect(colors).not.toHaveProperty('red')
    expect(semanticColors).not.toHaveProperty('slate')
    expect(defaultSystem.token('colors.red.500')).toBeUndefined()
    expect(semanticColors.red.solid.value._light).toBe('oklch(0.55 0.22 25)')
    expect(defaultSystem.tokens.colorPaletteMap.get('slate')).toBeUndefined()
    expect(defaultSystem.tokens.colorPaletteMap.get('red')).toBeDefined()
    expect(defaultSystem.tokens.colorPaletteMap.get('destructive')).toBeDefined()
  })

  it('points status, presence, and shadow at semantic roles', () => {
    expect(semanticColors.status.success.value).toBe('{colors.success.solid}')
    expect(semanticColors.status.error.value).toBe('{colors.destructive.solid}')
    expect(semanticColors.presence.dnd.value).toBe(
      '{colors.destructive.solid}',
    )
    expect(semanticColors.bg.error.value).toBe('{colors.destructive.muted}')
    expect(semanticColors.fg.destructive.value).toBe('{colors.destructive.fg}')
    expect(semanticColors.shadow.value).toEqual({
      _light: '{colors.black}',
      _dark: '{colors.black}',
    })
  })
})
