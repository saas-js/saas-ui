import { describe, expect, it } from 'vitest'

import { transformStyleObject } from './transform-style.ts'

describe('transformStyleObject', () => {
  it('maps Chakra shorthands, tokens, and conditions', () => {
    const result = transformStyleObject({
      display: 'inline-flex',
      bg: 'colorPalette.solid',
      color: 'colorPalette.contrast',
      px: '3',
      h: 'control.md',
      borderRadius: 'control',
      fontWeight: 'medium',
      _hover: {
        bg: 'colorPalette.solid/90',
      },
      _disabled: {
        layerStyle: 'disabled',
      },
    })

    expect(result).toMatchObject({
      display: 'inline-flex',
      backgroundColor: 'colorPalette.solid',
      color: 'colorPalette.contrast',
      paddingInline: 'spacing._3',
      height: 'sizes.controlMd',
      borderRadius: 'semanticRadii.control',
      fontWeight: 'fontWeights.medium',
      ':hover': {
        backgroundColor:
          '`color-mix(in oklch, ${colorPalette.solid} 90%, transparent)`',
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    })
  })

  it('expands textStyle and focusVisibleRing', () => {
    const result = transformStyleObject({
      textStyle: 'sm',
      focusVisibleRing: 'outside',
    })

    expect(result.fontSize).toBe('fontSizes.sm')
    expect(result.lineHeight).toBe('lineHeights.sm')
    expect(result[':focus-visible']).toMatchObject({
      outlineStyle: 'solid',
      outlineColor: 'colorPalette.focusRing',
    })
  })

  it('keeps decimal spacing tokens and raw CSS shadows', () => {
    const result = transformStyleObject({
      px: '2.5',
      lineHeight: '1.2',
      boxShadow: {
        base: '0 0 0 1px rgba(0,0,0,0.25) inset, var(--btn-shadow)',
        _dark: '0px 1px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow)',
      },
    })

    expect(result.paddingInline).toBe('spacing._2_5')
    expect(result.lineHeight).toBe(1.2)
    expect(result.boxShadow).toBe(
      'light-dark(0 0 0 1px rgba(0,0,0,0.25) inset, var(--btn-shadow), 0px 1px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow))',
    )
  })

  it('rewrites background shorthand to StyleX longhands', () => {
    const result = transformStyleObject({
      background: 'linear-gradient(180deg, white 40%, rgba(0,0,0,0.2))',
      _hover: {
        background: 'bg.emphasized',
      },
    })

    expect(result.backgroundImage).toBe(
      'linear-gradient(180deg, white 40%, rgba(0,0,0,0.2))',
    )
    expect(result.background).toBeUndefined()
    expect(result[':hover']).toMatchObject({
      backgroundColor: 'semanticColors.bgEmphasized',
    })
  })

  it('skips descendant conditions StyleX cannot represent', () => {
    const meta = { skipped: [] as string[] }
    transformStyleObject(
      {
        _icon: { fontSize: '1em' },
        _pressable: { _hover: { color: 'fg' } },
      },
      meta,
    )

    expect(meta.skipped).toEqual(['_icon', '_pressable'])
  })
})
