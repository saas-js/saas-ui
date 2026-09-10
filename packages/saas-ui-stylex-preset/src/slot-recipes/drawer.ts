/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const drawerBackdrop = stylex.create({
  base: {
    pos: 'fixed',
    insetInlineStart: 0,
    top: 0,
    width: '100vw',
    height: '100dvh',
    zIndex: zIndices.layer4,
  },
})

export const drawerPositioner = stylex.create({
  base: {
    '--drawer-z-index': zIndices.layer4,
    display: 'flex',
    width: '100vw',
    height: '100dvh',
    position: 'fixed',
    padding: spacing._2,
    insetInlineStart: 0,
    top: 0,
    zIndex: 'calc(var(--drawer-z-index) + var(--layer-index, 0))',
  },
})

export const drawerPositionerPlacements = stylex.create({
  start: {
    justifyContent: 'flex-start',
  },
  end: {
    justifyContent: 'flex-end',
  },
  top: {
    alignItems: 'flex-start',
  },
  bottom: {
    alignItems: 'flex-end',
  },
})

export const drawerPositionerAttacheds = stylex.create({
  true: {
    padding: 0,
  },
})

export const drawerContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    outline: 0,
    zIndex: 'calc(var(--drawer-z-index) + var(--layer-index, 0))',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    maxHeight: '100dvh',
    color: 'inherit',
  },
})

export const drawerContentSizes = stylex.create({
  xs: {
    maxWidth: sizes.xs,
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
  full: {
    maxWidth: '100vw',
    height: '100dvh',
  },
})

export const drawerContentPlacements = stylex.create({
  start: {},
  end: {},
  top: {
    maxWidth: '100%',
  },
  bottom: {
    maxWidth: '100%',
  },
})

export const drawerContentAttacheds = stylex.create({
  true: {
    borderRadius: 'none',
  },
})

export const drawerHeader = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0,
    paddingInline: spacing._6,
    paddingBlock: spacing._4,
  },
})

export const drawerBody = stylex.create({
  base: {
    paddingInline: spacing._6,
    paddingBlock: spacing._2,
    flex: 1,
    overflow: 'auto',
  },
})

export const drawerFooter = stylex.create({
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

export const drawerTitle = stylex.create({
  base: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.medium,
  },
})

export const drawerDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
  },
})

export const drawerCloseTrigger = stylex.create({
  base: {
    position: 'absolute',
    top: spacing._4,
    right: spacing._4,
  },
})

export type DrawerSize = keyof typeof drawerContentSizes

export type DrawerPlacement = keyof typeof drawerPositionerPlacements

export type DrawerAttached = keyof typeof drawerPositionerAttacheds

export const drawerSlotRecipe = {
  slots: {
    backdrop: {
      styles: drawerBackdrop,
    },
    positioner: {
      styles: drawerPositioner,
      placement: drawerPositionerPlacements,
      attached: drawerPositionerAttacheds,
    },
    content: {
      styles: drawerContent,
      sizes: drawerContentSizes,
      placement: drawerContentPlacements,
      attached: drawerContentAttacheds,
    },
    header: {
      styles: drawerHeader,
    },
    body: {
      styles: drawerBody,
    },
    footer: {
      styles: drawerFooter,
    },
    title: {
      styles: drawerTitle,
    },
    description: {
      styles: drawerDescription,
    },
    closeTrigger: {
      styles: drawerCloseTrigger,
    },
  },
  defaultVariants: {
    size: 'xs',
    placement: 'end',
  },
} as const

export function drawerSlotStyles(
  slot: keyof typeof drawerSlotRecipe.slots,
  variants?: {
    size?: DrawerSize
    placement?: DrawerPlacement
  },
) {
  const size = variants?.size ?? drawerSlotRecipe.defaultVariants.size
  const placement =
    variants?.placement ?? drawerSlotRecipe.defaultVariants.placement
  const def = drawerSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'placement' in def
      ? def.placement[placement as keyof typeof def.placement]
      : false,
  ]
}
