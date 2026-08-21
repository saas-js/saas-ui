/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const dialogBackdrop = stylex.create({
  base: {
    pos: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100dvh',
    zIndex: zIndices.layer4,
  },
})

export const dialogPositioner = stylex.create({
  base: {
    display: 'flex',
    width: '100vw',
    height: '100dvh',
    position: 'fixed',
    left: 0,
    top: 0,
    '--dialog-z-index': zIndices.layer4,
    zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
    justifyContent: 'center',
  },
})

export const dialogPositionerSizes = stylex.create({
  cover: {
    padding: spacing._10,
  },
})

export const dialogPositionerPlacements = stylex.create({
  center: {
    alignItems: 'center',
  },
  top: {
    alignItems: 'flex-start',
  },
  bottom: {
    alignItems: 'flex-end',
  },
})

export const dialogPositionerScrollBehaviors = stylex.create({
  inside: {
    overflow: 'hidden',
  },
  outside: {
    overflow: 'auto',
    pointerEvents: 'auto',
  },
})

export const dialogContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    outline: 0,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    marginBlock: 'var(--dialog-margin, var(--dialog-base-margin))',
    zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
    '--dialog-padding': spacing._6,
    '--dialog-radius': semanticRadii.panel,
    '--dialog-concentric-radius':
      'max(0px, calc(var(--dialog-radius) - var(--dialog-padding)))',
  },
})

export const dialogContentSizes = stylex.create({
  xs: {
    maxWidth: sizes.sm,
  },
  sm: {
    maxWidth: sizes.md,
  },
  md: {
    maxWidth: sizes.lg,
  },
  lg: {
    maxWidth: '2xl',
  },
  xl: {
    maxWidth: '4xl',
  },
  cover: {
    width: '100%',
    height: '100%',
    '--dialog-margin': '0',
  },
  full: {
    maxWidth: '100vw',
    minHeight: '100vh',
    '--dialog-margin': '0',
    '--dialog-radius': '0px',
    borderRadius: 0,
  },
})

export const dialogContentVariants = stylex.create({
  confirm: {
    textAlign: 'center',
  },
})

export const dialogContentPlacements = stylex.create({
  center: {
    '--dialog-base-margin': 'auto',
    marginInline: 'auto',
  },
  top: {
    '--dialog-base-margin': spacing._16,
    marginInline: 'auto',
  },
  bottom: {
    '--dialog-base-margin': spacing._16,
    marginInline: 'auto',
  },
})

export const dialogContentScrollBehaviors = stylex.create({
  inside: {
    maxHeight: 'calc(100% - 7.5rem)',
  },
})

export const dialogContentMotionPresets = stylex.create({
  scale: {},
  'slide-in-bottom': {},
  'slide-in-top': {},
  'slide-in-left': {},
  'slide-in-right': {},
})

export const dialogHeader = stylex.create({
  base: {
    display: 'flex',
    flex: 0,
    paddingInline: spacing._6,
    paddingBlock: spacing._4,
    paddingBottom: spacing._2,
  },
})

export const dialogHeaderVariants = stylex.create({
  confirm: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const dialogBody = stylex.create({
  base: {
    flex: 1,
    paddingInline: spacing._6,
    paddingBlock: spacing._4,
  },
})

export const dialogBodyScrollBehaviors = stylex.create({
  inside: {
    overflow: 'auto',
  },
})

export const dialogFooter = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing._3,
    paddingInline: spacing._6,
    paddingTop: spacing._2,
    paddingBottom: spacing._4,
  },
})

export const dialogFooterVariants = stylex.create({
  confirm: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'stretch',
    alignItems: 'stretch',
  },
})

export const dialogTitle = stylex.create({
  base: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.medium,
  },
})

export const dialogDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
  },
})

export const dialogCloseTrigger = stylex.create({
  base: {
    position: 'absolute',
    top: spacing._4,
    right: spacing._4,
  },
})

export type DialogVariant = keyof typeof dialogContentVariants

export type DialogPlacement = keyof typeof dialogPositionerPlacements

export type DialogScrollBehavior = keyof typeof dialogPositionerScrollBehaviors

export type DialogSize = keyof typeof dialogPositionerSizes

export type DialogMotionPreset = keyof typeof dialogContentMotionPresets

export const dialogSlotRecipe = {
  slots: {
    backdrop: {
      styles: dialogBackdrop,
    },
    positioner: {
      styles: dialogPositioner,
      sizes: dialogPositionerSizes,
      placement: dialogPositionerPlacements,
      scrollBehavior: dialogPositionerScrollBehaviors,
    },
    content: {
      styles: dialogContent,
      sizes: dialogContentSizes,
      variants: dialogContentVariants,
      placement: dialogContentPlacements,
      scrollBehavior: dialogContentScrollBehaviors,
      motionPreset: dialogContentMotionPresets,
    },
    header: {
      styles: dialogHeader,
      variants: dialogHeaderVariants,
    },
    body: {
      styles: dialogBody,
      scrollBehavior: dialogBodyScrollBehaviors,
    },
    footer: {
      styles: dialogFooter,
      variants: dialogFooterVariants,
    },
    title: {
      styles: dialogTitle,
    },
    description: {
      styles: dialogDescription,
    },
    closeTrigger: {
      styles: dialogCloseTrigger,
    },
  },
  defaultVariants: {
    size: 'md',
    scrollBehavior: 'outside',
    placement: 'top',
    motionPreset: 'scale',
    variant: 'dialog',
  },
} as const

export function dialogSlotStyles(
  slot: keyof typeof dialogSlotRecipe.slots,
  variants?: {
    size?: DialogSize
    scrollBehavior?: DialogScrollBehavior
    placement?: DialogPlacement
    motionPreset?: DialogMotionPreset
    variant?: DialogVariant
  },
) {
  const size = variants?.size ?? dialogSlotRecipe.defaultVariants.size
  const scrollBehavior =
    variants?.scrollBehavior ?? dialogSlotRecipe.defaultVariants.scrollBehavior
  const placement =
    variants?.placement ?? dialogSlotRecipe.defaultVariants.placement
  const motionPreset =
    variants?.motionPreset ?? dialogSlotRecipe.defaultVariants.motionPreset
  const variant = variants?.variant ?? dialogSlotRecipe.defaultVariants.variant
  const def = dialogSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'scrollBehavior' in def
      ? def.scrollBehavior[scrollBehavior as keyof typeof def.scrollBehavior]
      : false,
    'placement' in def
      ? def.placement[placement as keyof typeof def.placement]
      : false,
    'motionPreset' in def
      ? def.motionPreset[motionPreset as keyof typeof def.motionPreset]
      : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
