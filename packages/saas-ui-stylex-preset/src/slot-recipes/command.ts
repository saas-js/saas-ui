/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import {
  commandIndicatorIconVars,
  commandClearTriggerIconVars,
  commandItemIconVars,
} from './command.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { letterSpacings } from '../tokens/letter-spacings.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export {
  commandIndicatorIconVars,
  commandClearTriggerIconVars,
  commandItemIconVars,
}

export const commandRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: sizes.full,
    minHeight: 0,
    outline: 0,
    backgroundColor: semanticColors.bgPanel,
    color: semanticColors.fg,
    borderRadius: semanticRadii.panel,
    overflow: 'hidden',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const commandRootSizes = stylex.create({
  sm: {
    '--command-control-padding-x': spacing._3,
    '--command-input-height': sizes.controlLg,
    '--command-indicator-size': sizes._4,
    '--command-list-padding': spacing._1,
    '--command-item-height': sizes.controlXs,
    '--command-item-padding-x': spacing._1_5,
    '--command-item-gap': spacing._1_5,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    '--command-control-padding-x': spacing._3,
    '--command-input-height': sizes.controlXl,
    '--command-indicator-size': sizes._4,
    '--command-list-padding': spacing._1,
    '--command-item-height': sizes.controlSm,
    '--command-item-padding-x': spacing._2,
    '--command-item-gap': spacing._2,
  },
  lg: {
    '--command-control-padding-x': spacing._4,
    '--command-input-height': sizes._14,
    '--command-indicator-size': sizes._5,
    '--command-list-padding': spacing._1_5,
    '--command-item-height': sizes.controlMd,
    '--command-item-padding-x': spacing._2_5,
    '--command-item-gap': spacing._2_5,
  },
})

export const commandLabel = stylex.create({
  base: {
    srOnly: 'true',
  },
})

export const commandControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    paddingInline: 'var(--command-control-padding-x)',
    borderBottomWidth: '1px',
    borderColor: semanticColors.border,
    flexShrink: 0,
  },
})

export const commandControlSizes = stylex.create({
  lg: {
    gap: spacing._3,
  },
})

export const commandIndicator = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: semanticColors.fgSubtle,
    flexShrink: 0,
    [commandIndicatorIconVars.width]: 'var(--command-indicator-size)',
    [commandIndicatorIconVars.height]: 'var(--command-indicator-size)',
  },
})

export const commandIndicatorIcon = stylex.create({
  base: {
    width: commandIndicatorIconVars.width,
    height: commandIndicatorIconVars.height,
  },
})

export const commandInput = stylex.create({
  base: {
    flex: 1,
    width: sizes.full,
    minWidth: 0,
    height: 'var(--command-input-height)',
    backgroundColor: 'transparent',
    outline: 0,
    '::placeholder': {
      color: semanticColors.fgSubtle,
    },
  },
})

export const commandInputSizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const commandClearTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: sizes.controlXs,
    height: sizes.controlXs,
    borderRadius: semanticRadii.controlSm,
    color: semanticColors.fgSubtle,
    cursor: cursor.button,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    ':hover': {
      backgroundColor: semanticColors.interactionHover,
      color: semanticColors.fg,
    },
    [commandClearTriggerIconVars.width]: sizes._3_5,
    [commandClearTriggerIconVars.height]: sizes._3_5,
  },
})

export const commandClearTriggerIcon = stylex.create({
  base: {
    width: commandClearTriggerIconVars.width,
    height: commandClearTriggerIconVars.height,
  },
})

export const commandList = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    outline: 0,
    scrollbar: 'thin',
    padding: 'var(--command-list-padding)',
    scrollPaddingBlock: 'var(--command-list-padding)',
  },
})

export const commandListSizes = stylex.create({
  sm: {
    maxHeight: sizes._72,
  },
  md: {
    maxHeight: sizes._96,
  },
  lg: {
    maxHeight: sizes.md,
  },
})

export const commandItem = stylex.create({
  base: {
    position: 'relative',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--command-item-gap)',
    flexShrink: 0,
    cursor: cursor.option,
    textAlign: 'start',
    borderRadius: semanticRadii.control,
    minHeight: 'var(--command-item-height)',
    paddingInline: 'var(--command-item-padding-x)',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    [commandItemIconVars.width]: 'var(--command-indicator-size)',
    [commandItemIconVars.height]: 'var(--command-indicator-size)',
    [commandItemIconVars.flexShrink]: 0,
    [commandItemIconVars.color]: semanticColors.fgSubtle,
  },
})

export const commandItemIcon = stylex.create({
  base: {
    width: commandItemIconVars.width,
    height: commandItemIconVars.height,
    flexShrink: commandItemIconVars.flexShrink,
    color: commandItemIconVars.color,
  },
})

export const commandItemText = stylex.create({
  base: {
    flex: 1,
    minWidth: 0,
    truncate: 'true',
  },
})

export const commandItemCommand = stylex.create({
  base: {
    flexShrink: 0,
    ms: 'auto',
    ps: 4,
    opacity: 0.6,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    letterSpacing: letterSpacings.widest,
    whiteSpace: 'nowrap',
  },
})

export const commandItemGroup = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export const commandItemGroupLabel = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'var(--command-item-height)',
    paddingInline: 'var(--command-item-padding-x)',
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.medium,
    color: semanticColors.fgSubtle,
    userSelect: 'none',
  },
})

export const commandEmpty = stylex.create({
  base: {
    paddingBlock: spacing._10,
    paddingInline: spacing._4,
    textAlign: 'center',
    color: semanticColors.fgMuted,
  },
})

export const commandLoading = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing._2,
    paddingBlock: spacing._10,
    paddingInline: spacing._4,
    color: semanticColors.fgMuted,
  },
})

export const commandSeparator = stylex.create({
  base: {
    flexShrink: 0,
    height: '1px',
    backgroundColor: semanticColors.borderMuted,
    marginBlock: spacing._1,
    marginInline: 'calc(var(--command-list-padding) * -1)',
  },
})

export const commandFooter = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._4,
    borderTopWidth: '1px',
    borderColor: semanticColors.border,
    backgroundColor: semanticColors.bgInset,
    paddingInline: 'var(--command-control-padding-x)',
    paddingBlock: spacing._2,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    color: semanticColors.fgMuted,
    flexShrink: 0,
  },
})

export const commandFooterSizes = stylex.create({
  lg: {
    paddingBlock: spacing._2_5,
  },
})

export type CommandSize = keyof typeof commandRootSizes

export const commandSlotRecipe = {
  slots: {
    root: {
      styles: commandRoot,
      sizes: commandRootSizes,
    },
    label: {
      styles: commandLabel,
    },
    control: {
      styles: commandControl,
      sizes: commandControlSizes,
    },
    indicator: {
      styles: commandIndicator,
      icon: {
        vars: commandIndicatorIconVars,
        styles: commandIndicatorIcon,
      },
    },
    input: {
      styles: commandInput,
      sizes: commandInputSizes,
    },
    clearTrigger: {
      styles: commandClearTrigger,
      icon: {
        vars: commandClearTriggerIconVars,
        styles: commandClearTriggerIcon,
      },
    },
    list: {
      styles: commandList,
      sizes: commandListSizes,
    },
    item: {
      styles: commandItem,
      icon: {
        vars: commandItemIconVars,
        styles: commandItemIcon,
      },
    },
    itemText: {
      styles: commandItemText,
    },
    itemCommand: {
      styles: commandItemCommand,
    },
    itemGroup: {
      styles: commandItemGroup,
    },
    itemGroupLabel: {
      styles: commandItemGroupLabel,
    },
    empty: {
      styles: commandEmpty,
    },
    loading: {
      styles: commandLoading,
    },
    separator: {
      styles: commandSeparator,
    },
    footer: {
      styles: commandFooter,
      sizes: commandFooterSizes,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function commandSlotStyles(
  slot: keyof typeof commandSlotRecipe.slots,
  variants?: {
    size?: CommandSize
  },
) {
  const size = variants?.size ?? commandSlotRecipe.defaultVariants.size
  const def = commandSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
