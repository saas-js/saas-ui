'use client'

import { forwardRef } from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react/styled-system'
import type { ColorPalette } from '@saas-ui/chakra-preset/colors'
import { cx } from '@saas-ui/core/utils'

export interface ThemeProps extends HTMLChakraProps<'div'> {
  /**
   * The appearance of the theme.
   */
  appearance?: 'light' | 'dark' | undefined
  /**
   * Whether to apply the theme background and color.
   */
  hasBackground?: boolean | undefined
  /**
   * The default color palette of the theme.
   */
  colorPalette?: ColorPalette | undefined
  /**
   * The scale factor of the theme.
   */
  scaleFactor?: number | undefined
  /**
   * Radius factor for control components.
   * Eg Button, Input, Select, etc.
   */
  controlRadius?: number | undefined
  /**
   * Radius factor for panel components.
   * Eg Drawer, Popover, etc.
   */
  panelRadius?: number | undefined
  /**
   * Radius factor for indicator components.
   * Eg Badge, Tag, etc.
   */
  indicatorRadius?: number | undefined
  /**
   * The overlay effect of the theme.
   */
  overlayEffect?: string | undefined
}

export const Theme = forwardRef<HTMLDivElement, ThemeProps>(
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

    let modifiers: Record<string, any> = {
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
        style={{ ...style, colorScheme: appearance, ...modifiers }}
        ref={ref}
      />
    )
  },
)
