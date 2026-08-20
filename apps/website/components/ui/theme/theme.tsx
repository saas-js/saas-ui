'use client'

import * as React from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react'
import type { AppearanceOptions } from '@saas-ui/chakra-preset/appearance'
import type { ColorPalette } from '@saas-ui/chakra-preset/colors'

export type AppearanceSeeds = Pick<
  AppearanceOptions,
  'base' | 'accent' | 'sidebar'
>

const cx = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ')

type ThemeVariables = React.CSSProperties & {
  '--scale-factor'?: number
  '--overlay-effect'?: string
  '--radius-control'?: number
  '--radius-panel'?: number
  '--radius-indicator'?: number
  '--sui-base'?: string
  '--sui-accent'?: string
  '--sui-sidebar'?: string
  '--sui-sidebar-solid'?: string
}

export interface ThemeProps extends HTMLChakraProps<'div'> {
  /** The light or dark appearance applied to this subtree. */
  appearance?: 'light' | 'dark' | undefined
  /** Whether to apply the theme background and foreground colors. */
  hasBackground?: boolean | undefined
  /** The default color palette for components in this subtree. */
  colorPalette?: ColorPalette | 'accent' | undefined
  /** Scale factor consumed by Saas UI semantic radius tokens. */
  scaleFactor?: number | undefined
  /** Radius factor for controls such as Button, Input, and Select. */
  controlRadius?: number | undefined
  /** Radius factor for panels such as Drawer and Popover. */
  panelRadius?: number | undefined
  /** Radius factor for indicators such as Badge and Tag. */
  indicatorRadius?: number | undefined
  /** Backdrop effect consumed by Saas UI overlay layer styles. */
  overlayEffect?: string | undefined
  /** OKLCH appearance seeds (base, accent, sidebar) for this subtree. */
  seeds?: AppearanceSeeds | undefined
}

export const Theme = React.forwardRef<HTMLDivElement, ThemeProps>(
  function Theme(props, ref) {
    const {
      appearance,
      style,
      className,
      hasBackground = true,
      scaleFactor = 1,
      controlRadius = 1,
      panelRadius = 1,
      indicatorRadius = 1,
      overlayEffect = 'blur(10px)',
      seeds,
      ...rest
    } = props

    const { base, accent, sidebar } = seeds ?? {}

    const variables: ThemeVariables = {
      '--scale-factor': scaleFactor,
      '--overlay-effect': overlayEffect,
      '--radius-control': controlRadius,
      '--radius-panel': panelRadius,
      '--radius-indicator': indicatorRadius,
    }

    const sidebarSeed = sidebar === 'base' ? undefined : sidebar
    const solidSidebar =
      sidebarSeed && 'solid' in sidebarSeed && sidebarSeed.solid
        ? sidebarSeed
        : undefined
    const tonalSidebar = sidebarSeed && !solidSidebar ? sidebarSeed : undefined

    if (base) {
      variables['--sui-base'] = `oklch(0.5 ${base.c ?? 0.012} ${base.h ?? 260})`
    }
    if (accent) {
      variables['--sui-accent'] = `oklch(${accent.l} ${accent.c} ${accent.h})`
    }
    if (tonalSidebar) {
      variables['--sui-sidebar'] =
        `oklch(0.5 ${tonalSidebar.c ?? base?.c ?? 0.012} ${tonalSidebar.h ?? base?.h ?? 260})`
    }
    if (solidSidebar) {
      variables['--sui-sidebar-solid'] =
        `oklch(${solidSidebar.solid.l} ${solidSidebar.solid.c} ${solidSidebar.solid.h})`
    }

    const contrastAttribute = (contrast: string | undefined) =>
      contrast === 'soft' || contrast === 'strong' ? contrast : undefined

    return (
      <chakra.div
        color="fg"
        bg={hasBackground ? 'bg' : undefined}
        colorPalette="gray"
        {...rest}
        data-base-contrast={contrastAttribute(base?.contrast)}
        data-accent-foreground={
          accent?.foreground === 'dark' ? 'dark' : undefined
        }
        data-sidebar={solidSidebar ? 'solid' : undefined}
        data-sidebar-foreground={
          solidSidebar?.foreground === 'dark' ? 'dark' : undefined
        }
        data-sidebar-contrast={contrastAttribute(tonalSidebar?.contrast)}
        className={cx('chakra-theme', 'sui-theme', appearance, className)}
        style={{ ...style, colorScheme: appearance, ...variables }}
        ref={ref}
      />
    )
  },
)
