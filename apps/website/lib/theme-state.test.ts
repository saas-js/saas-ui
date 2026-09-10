import { defaultAppearance } from '../components/theme/appearance'
import {
  parseThemeCookie,
  parseThemeState,
  themeStateToCssVars,
  themeStateToHtmlAttributes,
} from '../components/theme/theme-state'

describe('theme state persistence', () => {
  it('parses a randomized theme cookie used for SSR', () => {
    const state = parseThemeCookie(
      JSON.stringify({
        ...defaultAppearance,
        scaleFactor: 1.1,
        overlayEffect: 'blur(10px)',
        controlRadius: 1.5,
        panelRadius: 0.75,
        indicatorRadius: 9999,
        preset: null,
        accentPalette: null,
        headingFont: 'lora',
        bodyFont: 'inter',
        base: { h: 40, c: 0.02, contrast: 'strong' },
        accent: { l: 0.5, c: 0.2, h: 200, foreground: 'dark' },
        sidebar: { type: 'tonal', h: 30, c: 0.01, contrast: 'soft' },
      }),
    )

    expect(state).toMatchObject({
      scaleFactor: 1.1,
      headingFont: 'lora',
      bodyFont: 'inter',
      base: { h: 40, contrast: 'strong' },
      accent: { foreground: 'dark' },
      sidebar: { type: 'tonal', contrast: 'soft' },
    })

    expect(themeStateToCssVars(state!)).toMatchObject({
      '--scale-factor': '1.1',
      '--radius-control-factor': '1.5',
      '--radius-panel-factor': '0.75',
      '--radius-indicator-factor': '9999',
      '--font-heading': "'Lora', serif",
      '--font-body': "'Inter', sans-serif",
    })
    expect(themeStateToHtmlAttributes(state!)).toEqual({
      'data-base-contrast': 'strong',
      'data-accent-foreground': 'dark',
      'data-sidebar-contrast': 'soft',
    })
  })

  it('parses a zustand persist wrapper and an encoded cookie', () => {
    const state = {
      ...defaultAppearance,
      scaleFactor: 0.9,
      overlayEffect: 'blur(10px)',
      controlRadius: 1,
      panelRadius: 1,
      indicatorRadius: 1,
      preset: null,
      accentPalette: null,
      headingFont: null,
      bodyFont: null,
    }

    expect(
      parseThemeCookie(JSON.stringify({ state, version: 1 })),
    ).toMatchObject({ scaleFactor: 0.9 })
    expect(parseThemeCookie(encodeURIComponent(JSON.stringify(state)))).toMatchObject({
      scaleFactor: 0.9,
    })
  })

  it('rejects invalid payloads', () => {
    expect(parseThemeState(null)).toBeNull()
    expect(parseThemeCookie('{')).toBeNull()
    expect(parseThemeState({ scaleFactor: 1 })).toBeNull()
  })
})
