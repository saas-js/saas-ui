/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { cursor } from '../tokens/cursor.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const sidebarRoot = stylex.create({
  base: {
    '--sidebar-z-index': zIndices.layer3,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    color: semanticColors.sidebarFg,
  },
})

export const sidebarRootVariants = stylex.create({
  sidebar: {
    borderRightWidth: '1px',
    borderColor: semanticColors.sidebarBorder,
  },
})

export const sidebarRootModes = stylex.create({
  collapsible: {
    width: 'var(--sidebar-width, 280px)',
    maxWidth: '100vw,var(--sidebar-max-width, 320px)',
    minWidth: 'var(--sidebar-min-width, 220px)',
    backgroundColor: semanticColors.sidebarBg,
    transitionProperty: 'margin-left',
  },
  flyout: {
    position: 'fixed',
    top: spacing._2,
    left: spacing._2,
    bottom: spacing._2,
    zIndex: 'var(--sidebar-z-index)',
    width: 'var(--sidebar-width, 280px)',
    maxWidth: '100vw,var(--sidebar-max-width, 320px)',
    minWidth: 'var(--sidebar-min-width, 220px)',
    backgroundColor: semanticColors.sidebarBg,
    borderColor: semanticColors.sidebarBorder,
    boxShadow: 'none',
    borderWidth: '1px',
    borderRadius: radii.lg,
  },
})

export const sidebarBackdrop = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    '--sidebar-backdrop-z-index': zIndices.layer3,
    zIndex: 'calc(var(--sidebar-backdrop-z-index) - 2)',
  },
})

export const sidebarTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    outline: 'none',
  },
})

export const sidebarHeader = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    paddingBlock: spacing._2,
  },
})

export const sidebarHeaderSizes = stylex.create({
  md: {
    paddingInline: spacing._3,
  },
})

export const sidebarBody = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._4,
    flex: 1,
    paddingBlock: spacing._3,
    overflowY: 'auto',
  },
})

export const sidebarBodySizes = stylex.create({
  md: {
    paddingInline: spacing._3,
  },
})

export const sidebarFooter = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: spacing._2,
  },
})

export const sidebarFooterSizes = stylex.create({
  md: {
    paddingInline: spacing._3,
  },
})

export const sidebarGroup = stylex.create({
  base: {
    position: 'relative',
  },
})

export const sidebarGroupHeader = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing._1,
    height: sizes._6,
    borderRadius: radii.md,
    fontSize: fontSizes.xs,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.fast,
  },
})

export const sidebarGroupTitle = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingInline: spacing._2,
    fontWeight: fontWeights.medium,
    color: `color-mix(in oklch, ${semanticColors.sidebarFg} 70%, transparent)`,
  },
})

export const sidebarGroupEndElement = stylex.create({
  base: {},
})

export const sidebarGroupEndElementSizes = stylex.create({
  md: {
    pe: 1,
  },
})

export const sidebarGroupContent = stylex.create({
  base: {
    paddingTop: spacing._1,
    display: 'flex',
    flexDirection: 'column',
  },
})

export const sidebarTrack = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: '-4px',
    bottom: 0,
    width: '7px',
    cursor: cursor.button,
    '::after': {
      content: '""',
      display: 'block',
      height: '100%',
      width: '2px',
      opacity: 0,
      transitionProperty: 'opacity',
      transitionDuration: durations.fast,
      transitionDelay: '0.2s',
      backgroundColor: `color-mix(in oklch, ${semanticColors.sidebarAccentFg} 60%, transparent)`,
      pointerEvents: 'none',
    },
    ':hover': {
      '::after': {
        opacity: 1,
      },
    },
  },
})

export const sidebarTrackModes = stylex.create({
  flyout: {
    top: '8px',
    bottom: '8px',
  },
})

export const sidebarFlyoutTrigger = stylex.create({
  base: {
    display: 'none',
  },
})

export const sidebarFlyoutTriggerModes = stylex.create({
  flyout: {
    display: 'block',
    position: 'absolute',
    '--sidebar-flyout-trigger-z-index': zIndices.layer3,
    zIndex: 'calc(var(--sidebar-flyout-trigger-z-index) - 1)',
    height: '100%',
    width: '8px',
  },
})

export const sidebarInset = stylex.create({
  base: {
    height: '100%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: semanticColors.bgContent,
  },
})

export const sidebarInsetVariants = stylex.create({
  sidebar: {},
  inset: {
    borderColor: semanticColors.sidebarBorder,
    borderWidth: '1px',
    borderRadius: semanticRadii.panel,
    marginBlock: 'var(--inset-gap, {spacing.2})',
    marginEnd: 'var(--inset-gap, {spacing.2})',
    overflow: 'clip',
  },
})

export type SidebarVariant = keyof typeof sidebarRootVariants

export type SidebarMode = keyof typeof sidebarRootModes

export type SidebarSize = keyof typeof sidebarHeaderSizes

export const sidebarSlotRecipe = {
  slots: {
    root: {
      styles: sidebarRoot,
      variants: sidebarRootVariants,
      mode: sidebarRootModes,
    },
    backdrop: {
      styles: sidebarBackdrop,
    },
    trigger: {
      styles: sidebarTrigger,
    },
    header: {
      styles: sidebarHeader,
      sizes: sidebarHeaderSizes,
    },
    body: {
      styles: sidebarBody,
      sizes: sidebarBodySizes,
    },
    footer: {
      styles: sidebarFooter,
      sizes: sidebarFooterSizes,
    },
    group: {
      styles: sidebarGroup,
    },
    groupHeader: {
      styles: sidebarGroupHeader,
    },
    groupTitle: {
      styles: sidebarGroupTitle,
    },
    groupEndElement: {
      styles: sidebarGroupEndElement,
      sizes: sidebarGroupEndElementSizes,
    },
    groupContent: {
      styles: sidebarGroupContent,
    },
    track: {
      styles: sidebarTrack,
      mode: sidebarTrackModes,
    },
    flyoutTrigger: {
      styles: sidebarFlyoutTrigger,
      mode: sidebarFlyoutTriggerModes,
    },
    inset: {
      styles: sidebarInset,
      variants: sidebarInsetVariants,
    },
  },
  defaultVariants: {
    variant: 'sidebar',
    mode: 'collapsible',
    size: 'md',
  },
} as const

export function sidebarSlotStyles(
  slot: keyof typeof sidebarSlotRecipe.slots,
  variants?: {
    variant?: SidebarVariant
    mode?: SidebarMode
    size?: SidebarSize
  },
) {
  const variant = variants?.variant ?? sidebarSlotRecipe.defaultVariants.variant
  const mode = variants?.mode ?? sidebarSlotRecipe.defaultVariants.mode
  const size = variants?.size ?? sidebarSlotRecipe.defaultVariants.size
  const def = sidebarSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'mode' in def ? def.mode[mode as keyof typeof def.mode] : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
