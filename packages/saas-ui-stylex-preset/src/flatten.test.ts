import { describe, expect, it } from 'vitest'

import {
  flattenTokens,
  isLightDarkValue,
  toCssVarName,
  toStylexKey,
} from './flatten.ts'

describe('toStylexKey', () => {
  it('flattens nested color shades', () => {
    expect(toStylexKey(['blue', '500'])).toBe('blue500')
    expect(toStylexKey(['whiteAlpha', '50'])).toBe('whiteAlpha50')
  })

  it('drops DEFAULT segments', () => {
    expect(toStylexKey(['bg', 'DEFAULT'])).toBe('bg')
    expect(toStylexKey(['DEFAULT'])).toBe('DEFAULT')
  })

  it('prefixes keys that start with a number', () => {
    expect(toStylexKey(['0.5'])).toBe('_0_5')
    expect(toStylexKey(['2xs'])).toBe('_2xs')
    expect(toStylexKey(['1/2'])).toBe('_1on2')
    expect(toStylexKey(['1.5'])).toBe('_1_5')
    expect(toStylexKey(['1/5'])).toBe('_1on5')
  })

  it('camelCases grouped semantic tokens', () => {
    expect(toStylexKey(['bg', 'muted'])).toBe('bgMuted')
    expect(toStylexKey(['control', 'sm'])).toBe('controlSm')
    expect(toStylexKey(['heading', '2xl'])).toBe('heading2xl')
    expect(toStylexKey(['layer-1'])).toBe('layer1')
    expect(toStylexKey(['ease-in-out'])).toBe('easeInOut')
  })
})

describe('toCssVarName', () => {
  it('builds stable sui custom properties', () => {
    expect(toCssVarName('colors', ['blue', '500'])).toBe(
      '--sui-colors-blue-500',
    )
    expect(toCssVarName('colors', ['bg', 'DEFAULT'])).toBe('--sui-colors-bg')
    expect(toCssVarName('spacing', ['0.5'])).toBe('--sui-spacing-0_5')
  })
})

describe('flattenTokens', () => {
  it('walks nested Chakra token trees', () => {
    const tokens = flattenTokens(
      {
        blue: {
          500: { value: 'oklch(0.5 0.2 260)' },
        },
        bg: {
          DEFAULT: { value: 'white' },
          muted: { value: 'gray' },
        },
      },
      'colors',
    )

    expect(tokens).toEqual([
      {
        path: 'colors.blue.500',
        segments: ['blue', '500'],
        key: 'blue500',
        cssVar: '--sui-colors-blue-500',
        value: 'oklch(0.5 0.2 260)',
      },
      {
        path: 'colors.bg',
        segments: ['bg', 'DEFAULT'],
        key: 'bg',
        cssVar: '--sui-colors-bg',
        value: 'white',
      },
      {
        path: 'colors.bg.muted',
        segments: ['bg', 'muted'],
        key: 'bgMuted',
        cssVar: '--sui-colors-bg-muted',
        value: 'gray',
      },
    ])
  })

  it('detects light/dark semantic values', () => {
    expect(isLightDarkValue({ _light: 'white', _dark: 'black' })).toBe(true)
    expect(isLightDarkValue('white')).toBe(false)
  })
})
