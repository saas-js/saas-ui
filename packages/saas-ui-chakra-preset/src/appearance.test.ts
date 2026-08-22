import { createAppearance } from './appearance.ts'
import { semanticColors } from './theme/semantic-tokens/colors.ts'

describe('createAppearance', () => {
  it('creates Chakra-ready semantic tokens from the default seeds', () => {
    const appearance = createAppearance()

    expect(appearance.bg.DEFAULT.value).toEqual({
      _light: 'oklch(0.985 0.002 260)',
      _dark: 'oklch(0.14 0.002 260)',
    })
    expect(appearance.bg.surface.value).toEqual({
      _light: 'oklch(1 0 260)',
      _dark: 'oklch(0.17 0 260)',
    })
    expect(appearance.interaction.selected.value).toEqual({
      _light: 'oklch(0.511 0.262 276.966 / 0.11)',
      _dark: 'oklch(0.511 0.262 276.966 / 0.16)',
    })
  })

  it('derives independent base, accent, and sidebar colors', () => {
    const appearance = createAppearance({
      base: { h: 225, c: 0.01 },
      accent: { l: 0.6, c: 0.18, h: 235, foreground: 'light' },
      sidebar: { h: 215, c: 0.02, contrast: 'strong' },
    })

    expect(appearance.bg.DEFAULT.value._dark).toContain('225')
    expect(appearance.accent.solid.value._light).toBe('oklch(0.6 0.18 235)')
    expect(appearance.success.solid.value._light).toBe('oklch(0.6 0.18 150)')
    expect(appearance.warning.solid.value._light).toBe('oklch(0.6 0.18 50)')
    expect(appearance.info.solid.value._light).toBe('oklch(0.6 0.18 260)')
    expect(appearance.destructive.solid.value._light).toBe('oklch(0.6 0.18 25)')
    expect(appearance.sidebar.bg.value).toEqual({
      _light: 'oklch(0.95 0.007 215)',
      _dark: 'oklch(0.1 0.01 215)',
    })
  })

  it('keeps the absolute neutral palette separate from appearance base', () => {
    const appearance = createAppearance()

    expect(appearance.base.solid.value).toEqual({
      _light: 'oklch(0.2 0.006 260)',
      _dark: 'oklch(0.92 0.003 260)',
    })
    expect(semanticColors.neutral.solid.value).toEqual({
      _light: '{colors.black}',
      _dark: '{colors.white}',
    })
  })

  it('keeps neutral palette borders distinct from subtle fills', () => {
    for (const palette of ['neutral', 'gray', 'zinc', 'stone'] as const) {
      expect(semanticColors[palette].border.value).not.toEqual(
        semanticColors[palette].subtle.value,
      )
    }
  })

  it('creates a solid sidebar with contrast-derived roles', () => {
    const appearance = createAppearance({
      sidebar: {
        solid: { l: 0.55, c: 0.24, h: 292 },
        foreground: 'light',
      },
    })

    expect(appearance.sidebar.bg.value).toEqual({
      _light: 'oklch(0.55 0.24 292)',
      _dark: 'oklch(0.55 0.24 292)',
    })
    expect(appearance.sidebar.fg.value).toEqual({
      _light: 'oklch(0.985 0.014 292)',
      _dark: 'oklch(0.985 0.014 292)',
    })
    expect(appearance.sidebar.border.value._light).toBe(
      'oklch(0.985 0.014 292 / 0.22)',
    )
    expect(appearance.sidebar.accent.bg.value._dark).toBe(
      'oklch(0.985 0.014 292 / 0.14)',
    )
    expect(appearance.sidebar.accent.fg.value).toEqual(
      appearance.sidebar.fg.value,
    )
  })

  it('supports dark contrast on light solid sidebars', () => {
    const appearance = createAppearance({
      sidebar: {
        solid: { l: 0.88, c: 0.14, h: 95 },
        foreground: 'dark',
      },
    })

    expect(appearance.sidebar.bg.value._light).toBe('oklch(0.88 0.14 95)')
    expect(appearance.sidebar.fg.value._light).toBe('oklch(0.16 0.014 95)')
    expect(appearance.sidebar.accent.fg.value._dark).toBe(
      'oklch(0.16 0.014 95)',
    )
  })

  it('applies mode overrides after generation', () => {
    const appearance = createAppearance({
      accent: { l: 0.65, c: 0.18, h: 35, foreground: 'dark' },
      dark: {
        bg: {
          DEFAULT: { l: 0.12, c: 0.004, h: -10 },
        },
        accent: {
          solid: '{colors.orange.500}',
        },
      },
    })

    expect(appearance.bg.DEFAULT.value._dark).toBe('oklch(0.12 0.004 350)')
    expect(appearance.accent.solid.value._dark).toBe('{colors.orange.500}')
    expect(appearance.accent.contrast.value._light).toBe('oklch(0.16 0.018 35)')
  })

  it('keeps compatibility aliases aligned with the structural roles', () => {
    const appearance = createAppearance()

    expect(appearance.bg.panel.value).toEqual(appearance.bg.surface.value)
    expect(appearance.bg.content.value).toEqual(appearance.bg.DEFAULT.value)
    expect(appearance.bg.subtle.value).toEqual(
      appearance.interaction.hover.value,
    )
    expect(appearance.bg.emphasized.value).toEqual(
      appearance.interaction.pressed.value,
    )
  })
})
