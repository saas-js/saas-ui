'use client'

import * as React from 'react'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { useColorMode } from '#components/setup/color-mode/color-mode'
import { type AppearanceSeeds, Theme } from '#components/ui/theme'

import {
  type AccentAppearance,
  type AccentPalette,
  type Appearance,
  type AppearancePreset,
  type BaseAppearance,
  type SidebarAppearance,
  accentFromPalette,
  appearancePresets,
  createRandomAppearance,
} from './appearance'
import { createRandomFonts } from './fonts'
import {
  THEME_STORAGE_KEY,
  type ThemeState,
  applyThemeState,
  clearThemeCookie,
  defaultThemeState,
  pickThemeState,
  syncThemeCookieFromPersistValue,
  writeThemeCookie,
} from './theme-state'

const scaleFactors = [0.9, 0.95, 1, 1.05, 1.1] as const
const controlRadii = [0, 0.75, 1, 1.5, 9999] as const
const panelRadii = [0, 0.75, 1, 1.5, 2] as const
const indicatorRadii = [0, 0.75, 1, 1.5, 9999] as const

function randomValue<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)]!
}

interface ThemeStore extends ThemeState {
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

const themeStorage = createJSONStorage(() => ({
  getItem: (name) => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(name)
  },
  setItem: (name, value) => {
    localStorage.setItem(name, value)
    syncThemeCookieFromPersistValue(value)
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
    clearThemeCookie()
  },
}))

const useStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...defaultThemeState,
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
      reset: () => set(defaultThemeState),
    }),
    {
      name: THEME_STORAGE_KEY,
      version: 1,
      storage: themeStorage,
      partialize: (state) => pickThemeState(state),
      onRehydrateStorage: () => (state) => {
        if (state) writeThemeCookie(pickThemeState(state))
      },
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

function usePersistedThemeHydrated() {
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    const finish = () => setHydrated(true)
    const unsubscribe = useStore.persist.onFinishHydration(finish)
    if (useStore.persist.hasHydrated()) finish()
    return unsubscribe
  }, [])

  return hydrated
}

const ServerThemeContext = React.createContext<ThemeState | null>(null)

/**
 * Seeds the client store from the cookie the server already rendered, so the
 * first React tree matches SSR. Must not run on the server — the zustand
 * store is a module singleton and would leak across requests.
 *
 * The cookie value is also provided as context so landing `Theme` can paint
 * the same inline vars the server rendered. A nested `.sui-theme` otherwise
 * reapplies the preset defaults and ignores `<html>` cookie styles.
 */
export function ThemeStoreHydrator({
  initial,
  children,
}: {
  initial?: ThemeState | null
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (initial) useStore.setState(initial)
  }, [initial])

  return (
    <ServerThemeContext.Provider value={initial ?? null}>
      {children}
    </ServerThemeContext.Provider>
  )
}

/**
 * Applies the selected appearance seeds to the root element so the whole
 * site, including portalled overlays and docs examples, picks them up.
 * Mounted once in the root provider.
 *
 * Waits for persist rehydration so a default store does not overwrite the
 * cookie/script values already painted on `documentElement`.
 */
export const GlobalAppearance = () => {
  const hydrated = usePersistedThemeHydrated()
  const {
    base,
    accent,
    sidebar,
    scaleFactor,
    overlayEffect,
    controlRadius,
    panelRadius,
    indicatorRadius,
    headingFont,
    bodyFont,
    preset,
    accentPalette,
  } = useStore()

  React.useEffect(() => {
    if (!hydrated) return
    applyThemeState(document.documentElement, {
      base,
      accent,
      sidebar,
      scaleFactor,
      overlayEffect,
      controlRadius,
      panelRadius,
      indicatorRadius,
      headingFont,
      bodyFont,
      preset,
      accentPalette,
    })
  }, [
    hydrated,
    base,
    accent,
    sidebar,
    scaleFactor,
    overlayEffect,
    controlRadius,
    panelRadius,
    indicatorRadius,
    headingFont,
    bodyFont,
    preset,
    accentPalette,
  ])

  return null
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const serverTheme = React.useContext(ServerThemeContext)
  const hydrated = usePersistedThemeHydrated()
  const store = useStore()
  const { colorMode } = useColorMode()

  const theme = hydrated ? store : serverTheme

  return (
    <Theme
      appearance={hydrated ? colorMode : undefined}
      colorPalette="accent"
      hasBackground={false}
      {...(theme
        ? {
            scaleFactor: theme.scaleFactor,
            overlayEffect: theme.overlayEffect,
            controlRadius: theme.controlRadius,
            panelRadius: theme.panelRadius,
            indicatorRadius: theme.indicatorRadius,
            seeds: toSeeds(theme),
          }
        : {})}
    >
      {children}
    </Theme>
  )
}
