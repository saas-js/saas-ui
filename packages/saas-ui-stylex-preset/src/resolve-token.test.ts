import { describe, expect, it } from 'vitest'

import { parseTokenReference, resolveStyleValue } from './resolve-token.ts'

describe('parseTokenReference', () => {
  it('parses colorPalette tokens and opacity modifiers', () => {
    expect(parseTokenReference('colorPalette.solid')).toEqual({
      kind: 'colorPalette',
      key: 'solid',
      opacity: undefined,
      source: 'colorPalette.solid',
    })
    expect(parseTokenReference('colorPalette.solid/90')).toMatchObject({
      kind: 'colorMix',
      key: 'solid',
      opacity: 90,
    })
  })

  it('keeps decimal size paths and colorPalette CSS vars', () => {
    expect(parseTokenReference('sizes.3.5')).toMatchObject({
      kind: 'token',
      category: 'sizes',
      key: '_3_5',
    })
    expect(parseTokenReference('colors.colorPalette.focusRing')).toMatchObject({
      kind: 'colorPalette',
      key: 'focusRing',
    })
    expect(parseTokenReference('colors.bg.emphasized')).toMatchObject({
      kind: 'token',
      category: 'semanticColors',
      key: 'bgEmphasized',
    })
  })

  it('parses semantic color aliases', () => {
    expect(parseTokenReference('bg.muted')).toMatchObject({
      kind: 'token',
      category: 'semanticColors',
      key: 'bgMuted',
    })
    expect(parseTokenReference('{colors.blue.500}')).toMatchObject({
      kind: 'token',
      category: 'colors',
      key: 'blue500',
    })
  })
})

describe('resolveStyleValue', () => {
  it('maps spacing scale values through the category', () => {
    expect(resolveStyleValue('2', 'spacing')).toMatchObject({
      kind: 'token',
      category: 'spacing',
      key: '_2',
    })
    expect(resolveStyleValue(4, 'spacing')).toMatchObject({
      kind: 'token',
      key: '_4',
    })
    expect(resolveStyleValue('2.5', 'spacing')).toMatchObject({
      kind: 'token',
      key: '_2_5',
    })
    expect(resolveStyleValue('3.75', 'sizes')).toMatchObject({
      kind: 'raw',
      raw: 'calc(3.75 * 0.25rem * var(--scale-factor, 1))',
    })
  })

  it('maps dotted heading tokens to flattened keys', () => {
    expect(resolveStyleValue('heading.xs', 'lineHeights')).toMatchObject({
      kind: 'token',
      key: 'heading_xs',
    })
  })

  it('keeps unitless line-heights and zero as raw values', () => {
    expect(resolveStyleValue('1.2', 'lineHeights')).toMatchObject({
      kind: 'raw',
      raw: '1.2',
    })
    expect(resolveStyleValue(0, 'spacing')).toMatchObject({
      kind: 'raw',
      raw: '0',
    })
  })

  it('keeps raw CSS values', () => {
    expect(resolveStyleValue('inline-flex')).toMatchObject({
      kind: 'raw',
      raw: 'inline-flex',
    })
    expect(resolveStyleValue('100%')).toMatchObject({ kind: 'raw' })
    expect(resolveStyleValue('var(--card-padding)')).toMatchObject({
      kind: 'raw',
    })
  })
})
