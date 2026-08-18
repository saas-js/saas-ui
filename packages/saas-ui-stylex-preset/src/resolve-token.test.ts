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
