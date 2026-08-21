import * as React from 'react'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useColorMode } from '#components/setup/color-mode/color-mode'
import {
  type AppearanceSeeds,
  Theme,
  type ThemeProps,
} from '#components/ui/theme'

import {
  type AccentAppearance,
  type AccentPalette,
  type Appearance,
  type AppearancePreset,
  type BaseAppearance,
  type SidebarAppearance,
  accentFromPalette,
  appearancePresets,
  applyAppearance,
  createRandomAppearance,
  defaultAppearance,
} from './appearance'
import { applyFonts, createRandomFonts } from './fonts'

type ThemeStoreProps = Required<
  Pick<
    ThemeProps,
    | 'scaleFactor'
    | 'overlayEffect'
    | 'controlRadius'
    | 'panelRadius'
    | 'indicatorRadius'
  >
> &
  Appearance & {
    /** Active preset id, cleared when the appearance is tweaked manually. */
    preset: string | null
    /** Named palette that seeded the accent, for swatch highlighting. */
    accentPalette: AccentPalette | null
    /** Selected heading font id, null for the site default. */
    headingFont: string | null
    /** Selected body font id, null for the site default. */
    bodyFont: string | null
  }

const defaultValue: ThemeStoreProps = {
  scaleFactor: 1,
  overlayEffect: 'blur(10px)',
  controlRadius: 1,
  panelRadius: 1,
  indicatorRadius: 1,
  ...defaultAppearance,
  preset: 'default',
  accentPalette: 'indigo',
  headingFont: null,
  bodyFont: null,
}

const scaleFactors = [0.9, 0.95, 1, 1.05, 1.1] as const
const controlRadii = [0, 0.75, 1, 1.5, 9999] as const
const panelRadii = [0, 0.75, 1, 1.5, 2] as const
const indicatorRadii = [0, 0.75, 1, 1.5, 9999] as const

function randomValue<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)]!
}

interface ThemeStore extends ThemeStoreProps {
  setScaleFactor: (scaleFactor: number) => void
  setOverlayEffect: (overlayEffect: string) => void
  setControlRadius: (controlRadius: number) => void
  setPanelRadius: (panelRadius: number) => void
  setIndicatorRadius: (indicatorRadius: number) => void
  setBase: (base: BaseAppearance) => void
  setAccent: (accent: AccentAppearance) => void
  setAccentPalette: (palette: AccentPalette) => void
  setSidebar: (sidebar: SidebarAppearance) => void
  setHeadingFont: (headingFont: string | null) => void
  setBodyFont: (bodyFont: string | null) => void
  applyPreset: (preset: AppearancePreset) => void
  randomize: () => void
  reset: () => void
}

const useStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...defaultValue,
      setScaleFactor: (scaleFactor) => set({ scaleFactor }),
      setOverlayEffect: (overlayEffect) => set({ overlayEffect }),
      setControlRadius: (controlRadius) => set({ controlRadius }),
      setPanelRadius: (panelRadius) => set({ panelRadius }),
      setIndicatorRadius: (indicatorRadius) => set({ indicatorRadius }),
      setBase: (base) => set({ base, preset: null }),
      setAccent: (accent) => set({ accent, preset: null, accentPalette: null }),
      setAccentPalette: (palette) =>
        set({
          accent: accentFromPalette(palette),
          accentPalette: palette,
          preset: null,
        }),
      setSidebar: (sidebar) => set({ sidebar, preset: null }),
      setHeadingFont: (headingFont) => set({ headingFont }),
      setBodyFont: (bodyFont) => set({ bodyFont }),
      applyPreset: (preset) =>
        set({
          ...preset.appearance,
          preset: preset.id,
          accentPalette: preset.accentPalette ?? null,
        }),
      randomize: () => {
        const fonts = createRandomFonts()
        set({
          ...createRandomAppearance(),
          scaleFactor: randomValue(scaleFactors),
          controlRadius: randomValue(controlRadii),
          panelRadius: randomValue(panelRadii),
          indicatorRadius: randomValue(indicatorRadii),
          headingFont: fonts.heading,
          bodyFont: fonts.body,
          preset: null,
          accentPalette: null,
        })
      },
      reset: () => set(defaultValue),
    }),
    {
      name: 'sui-theme',
      version: 1,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([, value]) => typeof value !== 'function',
          ),
        ),
    },
  ),
)

export const useTheme = () => {
  return useStore()
}

export { appearancePresets }

function toSeeds(appearance: Appearance): AppearanceSeeds {
  const { base, accent, sidebar } = appearance
  return {
    base,
    accent,
    sidebar:
      sidebar.type === 'base'
        ? 'base'
        : sidebar.type === 'tonal'
          ? { h: sidebar.h, c: sidebar.c, contrast: sidebar.contrast }
          : {
              solid: { l: sidebar.l, c: sidebar.c, h: sidebar.h },
              foreground: sidebar.foreground,
            },
  }
}

/**
 * Applies the selected appearance seeds to the root element so the whole
 * site, including portalled overlays and docs examples, picks them up.
 * Mounted once in the root provider.
 */
export const GlobalAppearance = () => {
  const {
    base,
    accent,
    sidebar,
    scaleFactor,
    controlRadius,
    panelRadius,
    indicatorRadius,
    headingFont,
    bodyFont,
  } = useStore()

  React.useEffect(() => {
    applyAppearance(document.documentElement, { base, accent, sidebar })
  }, [base, accent, sidebar])

  React.useEffect(() => {
    applyFonts(document.documentElement, {
      heading: headingFont,
      body: bodyFont,
    })
  }, [headingFont, bodyFont])

  React.useEffect(() => {
    const style = document.documentElement.style
    style.setProperty('--scale-factor', String(scaleFactor))
    style.setProperty('--radius-control', String(controlRadius))
    style.setProperty('--radius-panel', String(panelRadius))
    style.setProperty('--radius-indicator', String(indicatorRadius))
  }, [scaleFactor, controlRadius, panelRadius, indicatorRadius])

  return null
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    scaleFactor,
    overlayEffect,
    controlRadius,
    panelRadius,
    indicatorRadius,
    base,
    accent,
    sidebar,
  } = useStore()

  const { colorMode } = useColorMode()

  return (
    <Theme
      appearance={colorMode}
      colorPalette="accent"
      scaleFactor={scaleFactor}
      overlayEffect={overlayEffect}
      controlRadius={controlRadius}
      panelRadius={panelRadius}
      indicatorRadius={indicatorRadius}
      seeds={toSeeds({ base, accent, sidebar })}
    >
      {children}
    </Theme>
  )
}
