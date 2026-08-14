'use client'

import * as React from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react'
import type { ColorPalette } from '@saas-ui/chakra-preset/colors'

const cx = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ')

type ThemeVariables = React.CSSProperties & {
  '--scale-factor'?: number
  '--overlay-effect'?: string
  '--radius-control'?: number
  '--radius-panel'?: number
  '--radius-indicator'?: number
}

export interface ThemeProps extends HTMLChakraProps<'div'> {
  /** The light or dark appearance applied to this subtree. */
  appearance?: 'light' | 'dark' | undefined
  /** Whether to apply the theme background and foreground colors. */
  hasBackground?: boolean | undefined
  /** The default color palette for components in this subtree. */
  colorPalette?: ColorPalette | undefined
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
      ...rest
    } = props

    const variables: ThemeVariables = {
      '--scale-factor': scaleFactor,
      '--overlay-effect': overlayEffect,
      '--radius-control': controlRadius,
      '--radius-panel': panelRadius,
      '--radius-indicator': indicatorRadius,
    }

    return (
      <chakra.div
        color="fg"
        bg={hasBackground ? 'bg' : undefined}
        colorPalette="gray"
        {...rest}
        className={cx('chakra-theme', appearance, className)}
        style={{ ...style, colorScheme: appearance, ...variables }}
        ref={ref}
      />
    )
  },
)
