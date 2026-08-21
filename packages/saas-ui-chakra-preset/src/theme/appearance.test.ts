import { describe, expect, it } from 'vitest'

import { defaultSystem } from '../index.ts'
import { appearanceColors, appearanceGlobalCss } from './appearance.ts'

describe('CSS appearance contract', () => {
  it('emits the appearance formulas through Chakra global styles', () => {
    expect(appearanceGlobalCss[':where(html, .sui-theme)']).toMatchObject({
      '--sui-base': 'oklch(0.5 0.012 260)',
      '--sui-accent': 'oklch(0.511 0.262 276.966)',
      '--sui-contrast': '0',
      '--sui-color-sidebar-bg': expect.stringContaining('light-dark('),
    })

    expect(JSON.stringify(defaultSystem.getGlobalCss())).not.toContain(
      '--sui-color-bg-surface',
    )
  })

  it('calculates semantic colors directly from the scoped inputs', () => {
    expect(appearanceColors.bg.DEFAULT.value).toContain('light-dark(')
    expect(appearanceColors.bg.DEFAULT.value).toContain('var(--sui-contrast)')
    expect(appearanceColors.accent.solid.value).toBe(
      'oklch(from var(--sui-accent) l c h / 1)',
    )
    expect(appearanceColors.success.solid.value).toBe(
      'oklch(from var(--sui-accent) l c 150 / 1)',
    )
    expect(appearanceColors.warning.solid.value).toBe(
      'oklch(from var(--sui-accent) l c 50 / 1)',
    )
    expect(appearanceColors.info.solid.value).toBe(
      'oklch(from var(--sui-accent) l c 260 / 1)',
    )
    expect(appearanceColors.destructive.solid.value).toBe(
      'oklch(from var(--sui-accent) l c 25 / 1)',
    )
    expect(appearanceColors.interaction.selected.value).toBe(
      '{colors.accent.subtle}',
    )
  })

  it('registers base as a color palette despite Chakra reserving the name', () => {
    expect(defaultSystem.token('colors.base.solid')).toContain('light-dark(')
    expect(defaultSystem.token('colors.base.contrast')).toContain('light-dark(')
    expect(defaultSystem.tokens.colorPaletteMap.get('base')).toBeDefined()
  })

  it('keeps the appearance variable graph within its input budget', () => {
    const variables = new Set(
      Object.values(appearanceGlobalCss).flatMap((styles) =>
        Object.keys(styles).filter((property) => property.startsWith('--sui-')),
      ),
    )

    expect(variables.size).toBeLessThanOrEqual(13)
    expect(
      [...variables].some(
        (variable) =>
          variable.startsWith('--sui-profile-') ||
          /-(light|dark)$/.test(variable),
      ),
    ).toBe(false)
  })
})

describe('shared scale tokens', () => {
  it('exposes a control size track and role radii', () => {
    expect(defaultSystem.token('sizes.control.sm')).toBeTruthy()
    expect(defaultSystem.token('sizes.control.md')).toBeTruthy()
    expect(defaultSystem.token('sizes.control.lg')).toBeTruthy()
    expect(defaultSystem.token('radii.control')).toBeTruthy()
    expect(defaultSystem.token('radii.panel')).toBeTruthy()
    expect(defaultSystem.token('durations.motion.fast')).toBe('var(--motion-fast)')
    expect(defaultSystem.token('colors.shadow')).toBeTruthy()
  })
})
