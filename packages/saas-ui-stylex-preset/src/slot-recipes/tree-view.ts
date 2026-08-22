/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { treeViewTreeIconVars } from './tree-view.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { treeViewTreeIconVars }

export const treeViewRoot = stylex.create({
  base: {
    width: sizes.full,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._2,
  },
})

export const treeViewTree = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '--tree-item-gap': spacing._2,
    '--tree-indentation':
      'calc(var(--tree-indent-size) + var(--tree-icon-size) * 0.5)',
    [treeViewTreeIconVars.width]: 'var(--tree-icon-size)',
    [treeViewTreeIconVars.height]: 'var(--tree-icon-size)',
  },
})

export const treeViewTreeSizes = stylex.create({
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    '--tree-indent-size': spacing._4,
    '--tree-icon-size': spacing._4,
    '--tree-padding-inline': spacing._3,
    '--tree-padding-block': spacing._1_5,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    '--tree-indent-size': spacing._4,
    '--tree-icon-size': spacing._3,
    '--tree-padding-inline': spacing._3,
    '--tree-padding-block': spacing._1,
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    '--tree-indent-size': spacing._4,
    '--tree-icon-size': spacing._3,
    '--tree-padding-inline': spacing._2,
    '--tree-padding-block': spacing._1,
  },
})

export const treeViewTreeIcon = stylex.create({
  base: {
    width: treeViewTreeIconVars.width,
    height: treeViewTreeIconVars.height,
  },
})

export const treeViewLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const treeViewBranch = stylex.create({
  base: {
    position: 'relative',
  },
})

export const treeViewBranchContent = stylex.create({
  base: {
    position: 'relative',
  },
})

export const treeViewBranchContentAnimateContents = stylex.create({
  true: {},
})

export const treeViewBranchIndentGuide = stylex.create({
  base: {
    height: '100%',
    width: '1px',
    backgroundColor: semanticColors.border,
    position: 'absolute',
    '--tree-depth': 'calc(var(--depth) - 1)',
    '--tree-indentation-offset':
      'calc(var(--tree-indentation) * var(--tree-depth))',
    '--tree-offset':
      'calc(var(--tree-padding-inline) + var(--tree-indentation-offset))',
    insetInlineStart: 'calc(var(--tree-offset) + var(--tree-icon-size) * 0.5)',
    zIndex: 1,
  },
})

export const treeViewBranchIndicator = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    transformOrigin: 'center',
    transitionDuration: durations.moderate,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-in-out',
  },
})

export const treeViewBranchTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const treeViewBranchControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--tree-item-gap)',
    borderRadius: semanticRadii.controlMd,
    userSelect: 'none',
    position: 'relative',
    '--tree-depth': 'calc(var(--depth) - 1)',
    '--tree-indentation-offset':
      'calc(var(--tree-indentation) * var(--tree-depth))',
    '--tree-offset':
      'calc(var(--tree-padding-inline) + var(--tree-indentation-offset))',
    ps: 'var(--tree-offset)',
    pe: 'var(--tree-padding-inline)',
    paddingBlock: 'var(--tree-padding-block)',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    '--focus-ring-color': semanticColors.borderEmphasized,
    focusRingWidth: '2px',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const treeViewBranchControlVariants = stylex.create({
  subtle: {},
  solid: {},
})

export const treeViewItem = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--tree-item-gap)',
    borderRadius: semanticRadii.controlMd,
    userSelect: 'none',
    position: 'relative',
    '--tree-depth': 'calc(var(--depth) - 1)',
    '--tree-indentation-offset':
      'calc(var(--tree-indentation) * var(--tree-depth))',
    '--tree-offset':
      'calc(var(--tree-padding-inline) + var(--tree-indentation-offset))',
    ps: 'var(--tree-offset)',
    pe: 'var(--tree-padding-inline)',
    paddingBlock: 'var(--tree-padding-block)',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    '--focus-ring-color': semanticColors.borderEmphasized,
    focusRingWidth: '2px',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const treeViewItemVariants = stylex.create({
  subtle: {},
  solid: {},
})

export const treeViewItemText = stylex.create({
  base: {
    flex: 1,
  },
})

export const treeViewBranchText = stylex.create({
  base: {
    flex: 1,
  },
})

export const treeViewNodeCheckbox = stylex.create({
  base: {
    display: 'inline-flex',
  },
})

export type TreeViewSize = keyof typeof treeViewTreeSizes

export type TreeViewVariant = keyof typeof treeViewBranchControlVariants

export type TreeViewAnimateContent =
  keyof typeof treeViewBranchContentAnimateContents

export const treeViewSlotRecipe = {
  slots: {
    root: {
      styles: treeViewRoot,
    },
    tree: {
      styles: treeViewTree,
      sizes: treeViewTreeSizes,
      icon: {
        vars: treeViewTreeIconVars,
        styles: treeViewTreeIcon,
      },
    },
    label: {
      styles: treeViewLabel,
    },
    branch: {
      styles: treeViewBranch,
    },
    branchContent: {
      styles: treeViewBranchContent,
      animateContent: treeViewBranchContentAnimateContents,
    },
    branchIndentGuide: {
      styles: treeViewBranchIndentGuide,
    },
    branchIndicator: {
      styles: treeViewBranchIndicator,
    },
    branchTrigger: {
      styles: treeViewBranchTrigger,
    },
    branchControl: {
      styles: treeViewBranchControl,
      variants: treeViewBranchControlVariants,
    },
    item: {
      styles: treeViewItem,
      variants: treeViewItemVariants,
    },
    itemText: {
      styles: treeViewItemText,
    },
    branchText: {
      styles: treeViewBranchText,
    },
    nodeCheckbox: {
      styles: treeViewNodeCheckbox,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
} as const

export function treeViewSlotStyles(
  slot: keyof typeof treeViewSlotRecipe.slots,
  variants?: {
    size?: TreeViewSize
    variant?: TreeViewVariant
  },
) {
  const size = variants?.size ?? treeViewSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? treeViewSlotRecipe.defaultVariants.variant
  const def = treeViewSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
