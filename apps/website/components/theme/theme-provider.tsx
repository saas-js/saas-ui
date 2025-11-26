import type { ColorPalette, ThemeProps } from '@saas-ui/react'
import { Theme, useColorMode } from '@saas-ui/react'
import { create } from 'zustand'

type ThemeStoreProps = Required<
  Pick<
    ThemeProps,
    | 'colorPalette'
    | 'scaleFactor'
    | 'overlayEffect'
    | 'controlRadius'
    | 'panelRadius'
    | 'indicatorRadius'
  >
>

const defaultValue: ThemeStoreProps = {
  colorPalette: 'indigo',
  scaleFactor: 1,
  overlayEffect: 'blur(10px)',
  controlRadius: 1,
  panelRadius: 1,
  indicatorRadius: 1,
}

interface ThemeStore extends ThemeStoreProps {
  setColorPalette: (colorPalette: ColorPalette) => void
  setScaleFactor: (scaleFactor: number) => void
  setOverlayEffect: (overlayEffect: string) => void
  setControlRadius: (controlRadius: number) => void
  setPanelRadius: (panelRadius: number) => void
  setIndicatorRadius: (indicatorRadius: number) => void
}

const useStore = create<ThemeStore>((set) => ({
  ...defaultValue,
  setColorPalette: (colorPalette: ColorPalette) => set({ colorPalette }),
  setScaleFactor: (scaleFactor: number) => set({ scaleFactor }),
  setOverlayEffect: (overlayEffect: string) => set({ overlayEffect }),
  setControlRadius: (controlRadius: number) => set({ controlRadius }),
  setPanelRadius: (panelRadius: number) => set({ panelRadius }),
  setIndicatorRadius: (indicatorRadius: number) => set({ indicatorRadius }),
}))

export const useTheme = () => {
  return useStore()
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    colorPalette,
    scaleFactor,
    overlayEffect,
    controlRadius,
    panelRadius,
    indicatorRadius,
  } = useStore()

  const { colorMode } = useColorMode()

  return (
    <Theme
      appearance={colorMode}
      colorPalette={colorPalette}
      scaleFactor={scaleFactor}
      overlayEffect={overlayEffect}
      controlRadius={controlRadius}
      panelRadius={panelRadius}
      indicatorRadius={indicatorRadius}
    >
      {children}
    </Theme>
  )
}
