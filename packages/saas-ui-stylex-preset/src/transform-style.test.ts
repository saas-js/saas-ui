import { describe, expect, it } from 'vitest'

import { transformStyleObject } from './transform-style.ts'

describe('transformStyleObject', () => {
  it('maps Chakra shorthands, tokens, and conditions', () => {
    const result = transformStyleObject({
      display: 'inline-flex',
      bg: 'colorPalette.solid',
      color: 'colorPalette.contrast',
      px: '3',
      h: '8',
      borderRadius: 'control.md',
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
      height: 'sizes._8',
      borderRadius: 'semanticRadii.controlMd',
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
