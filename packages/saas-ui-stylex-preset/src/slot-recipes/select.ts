/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { selectIndicatorIconVars, selectItemIconVars } from './select.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export { selectIndicatorIconVars, selectItemIconVars }

export const selectRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    width: sizes.full,
  },
})

export const selectRootSizes = stylex.create({
  xs: {
    '--select-trigger-height': sizes.controlXs,
    '--select-trigger-padding-x': spacing._2,
  },
  sm: {
    '--select-trigger-height': sizes.controlSm,
    '--select-trigger-padding-x': spacing._2_5,
  },
  md: {
    '--select-trigger-height': sizes.controlMd,
    '--select-trigger-padding-x': spacing._3,
  },
  lg: {
    '--select-trigger-height': sizes.controlLg,
    '--select-trigger-padding-x': spacing._4,
  },
})

export const selectTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.full,
    minHeight: 'var(--select-trigger-height)',
    paddingInline: 'var(--select-trigger-padding-x)',
    userSelect: 'none',
    textAlign: 'start',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ':invalid': {
      borderColor: semanticColors.borderError,
    },
    ':hover': {
      borderColor: semanticColors.borderEmphasized,
      ':focus-visible': {
        borderColor: 'var(--focus-ring-color)',
      },
    },
  },
})

export const selectTriggerSizes = stylex.create({
  xs: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    gap: spacing._1,
  },
  sm: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    gap: spacing._1,
  },
  md: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    gap: spacing._2,
  },
  lg: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingBlock: spacing._3,
    gap: spacing._2,
  },
})

export const selectTriggerVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: semanticColors.border,
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
  },
})

export const selectIndicatorGroup = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._1,
    pos: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingInline: 'var(--select-trigger-padding-x)',
    pointerEvents: 'none',
  },
})

export const selectIndicator = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [selectIndicatorIconVars.width]: sizes._3_5,
    [selectIndicatorIconVars.height]: sizes._3_5,
  },
})

export const selectIndicatorSizes = stylex.create({
  xs: {
    [selectIndicatorIconVars.width]: sizes._3_5,
    [selectIndicatorIconVars.height]: sizes._3_5,
  },
  sm: {
    [selectIndicatorIconVars.width]: sizes._4,
    [selectIndicatorIconVars.height]: sizes._4,
  },
  md: {
    [selectIndicatorIconVars.width]: sizes._4,
    [selectIndicatorIconVars.height]: sizes._4,
  },
  lg: {
    [selectIndicatorIconVars.width]: sizes._5,
    [selectIndicatorIconVars.height]: sizes._5,
  },
})

export const selectIndicatorIcon = stylex.create({
  base: {
    width: selectIndicatorIconVars.width,
    height: selectIndicatorIconVars.height,
  },
})

export const selectContent = stylex.create({
  base: {
    outline: 0,
    color: semanticColors.fg,
    maxHeight: 'var(--available-height)',
    '--menu-z-index': zIndices.layer3,
    zIndex: 'calc(var(--menu-z-index) + var(--layer-index, 0))',
    overflowY: 'auto',
    scrollbar: 'thin',
  },
})

export const selectContentSizes = stylex.create({
  xs: {
    padding: spacing._1,
    gap: spacing._1,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    padding: spacing._1,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    padding: spacing._1,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    padding: spacing._1_5,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const selectItem = stylex.create({
  base: {
    position: 'relative',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    cursor: cursor.option,
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'start',
    borderRadius: semanticRadii.control,
    ':disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    [selectItemIconVars.width]: sizes._4,
    [selectItemIconVars.height]: sizes._4,
  },
})

export const selectItemSizes = stylex.create({
  xs: {
    paddingBlock: spacing._1,
    paddingInline: spacing._2,
  },
  sm: {
    paddingBlock: spacing._1,
    paddingInline: spacing._1_5,
  },
  md: {
    paddingBlock: spacing._1_5,
    paddingInline: spacing._2,
  },
  lg: {
    paddingBlock: spacing._2,
    paddingInline: spacing._3,
  },
})

export const selectItemIcon = stylex.create({
  base: {
    width: selectItemIconVars.width,
    height: selectItemIconVars.height,
  },
})

export const selectControl = stylex.create({
  base: {
    pos: 'relative',
  },
})

export const selectItemText = stylex.create({
  base: {
    flex: 1,
  },
})

export const selectItemGroup = stylex.create({
  base: {
    ':first-child': {
      marginTop: 0,
    },
  },
})

export const selectItemGroupSizes = stylex.create({
  sm: {
    marginTop: spacing._1,
  },
  md: {
    marginTop: spacing._1_5,
  },
  lg: {
    marginTop: spacing._2,
  },
})

export const selectItemGroupLabel = stylex.create({
  base: {
    paddingBlock: spacing._1,
    fontWeight: fontWeights.medium,
  },
})

export const selectItemGroupLabelSizes = stylex.create({
  xs: {
    paddingBlock: spacing._1,
    paddingInline: spacing._2,
  },
  sm: {
    paddingBlock: spacing._1,
    paddingInline: spacing._1_5,
  },
  md: {
    paddingBlock: spacing._1_5,
    paddingInline: spacing._2,
  },
  lg: {
    paddingBlock: spacing._2,
    paddingInline: spacing._3,
  },
})

export const selectLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    userSelect: 'none',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const selectValueText = stylex.create({
  base: {
    lineClamp: 1,
    maxWidth: '80%',
  },
})

export const selectItemIndicator = stylex.create({
  base: {},
})

export const selectItemIndicatorSizes = stylex.create({
  md: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export type SelectVariant = keyof typeof selectTriggerVariants

export type SelectSize = keyof typeof selectRootSizes

export const selectSlotRecipe = {
  slots: {
    root: {
      styles: selectRoot,
      sizes: selectRootSizes,
    },
    trigger: {
      styles: selectTrigger,
      sizes: selectTriggerSizes,
      variants: selectTriggerVariants,
    },
    indicatorGroup: {
      styles: selectIndicatorGroup,
    },
    indicator: {
      styles: selectIndicator,
      sizes: selectIndicatorSizes,
      icon: {
        vars: selectIndicatorIconVars,
        styles: selectIndicatorIcon,
      },
    },
    content: {
      styles: selectContent,
      sizes: selectContentSizes,
    },
    item: {
      styles: selectItem,
      sizes: selectItemSizes,
      icon: {
        vars: selectItemIconVars,
        styles: selectItemIcon,
      },
    },
    control: {
      styles: selectControl,
    },
    itemText: {
      styles: selectItemText,
    },
    itemGroup: {
      styles: selectItemGroup,
      sizes: selectItemGroupSizes,
    },
    itemGroupLabel: {
      styles: selectItemGroupLabel,
      sizes: selectItemGroupLabelSizes,
    },
    label: {
      styles: selectLabel,
    },
    valueText: {
      styles: selectValueText,
    },
    itemIndicator: {
      styles: selectItemIndicator,
      sizes: selectItemIndicatorSizes,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function selectSlotStyles(
  slot: keyof typeof selectSlotRecipe.slots,
  variants?: {
    size?: SelectSize
    variant?: SelectVariant
  },
) {
  const size = variants?.size ?? selectSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? selectSlotRecipe.defaultVariants.variant
  const def = selectSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
