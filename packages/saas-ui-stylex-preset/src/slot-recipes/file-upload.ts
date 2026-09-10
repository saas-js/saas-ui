/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const fileUploadRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._4,
    width: '100%',
    alignItems: 'flex-start',
  },
})

export const fileUploadLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const fileUploadDropzone = stylex.create({
  base: {
    backgroundColor: semanticColors.bg,
    borderRadius: semanticRadii.panel,
    borderWidth: '1px',
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: spacing._4,
    justifyContent: 'center',
    padding: spacing._4,
    transition: 'backgrounds',
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
})

export const fileUploadDropzoneContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: spacing._4,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const fileUploadItem = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    animationName: 'fade-in',
    animationDuration: 'moderate',
    backgroundColor: semanticColors.bg,
    borderRadius: semanticRadii.panel,
    borderWidth: '1px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: spacing._3,
    paddingInline: spacing._4,
    paddingBlock: spacing._2,
  },
})

export const fileUploadItemGroup = stylex.create({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._3,
  },
})

export const fileUploadItemName = stylex.create({
  base: {
    color: semanticColors.fg,
    fontWeight: fontWeights.medium,
    lineClamp: 1,
  },
})

export const fileUploadItemContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._0_5,
    flex: 1,
  },
})

export const fileUploadItemSizeText = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
})

export const fileUploadItemDeleteTrigger = stylex.create({
  base: {
    alignSelf: 'flex-start',
  },
})

export const fileUploadItemPreviewImage = stylex.create({
  base: {
    width: sizes._10,
    height: sizes._10,
    objectFit: 'scale-down',
  },
})

export const fileUploadSlotRecipe = {
  slots: {
    root: {
      styles: fileUploadRoot,
    },
    label: {
      styles: fileUploadLabel,
    },
    dropzone: {
      styles: fileUploadDropzone,
    },
    dropzoneContent: {
      styles: fileUploadDropzoneContent,
    },
    item: {
      styles: fileUploadItem,
    },
    itemGroup: {
      styles: fileUploadItemGroup,
    },
    itemName: {
      styles: fileUploadItemName,
    },
    itemContent: {
      styles: fileUploadItemContent,
    },
    itemSizeText: {
      styles: fileUploadItemSizeText,
    },
    itemDeleteTrigger: {
      styles: fileUploadItemDeleteTrigger,
    },
    itemPreviewImage: {
      styles: fileUploadItemPreviewImage,
    },
  },
  defaultVariants: {},
} as const

export function fileUploadSlotStyles(
  slot: keyof typeof fileUploadSlotRecipe.slots,
  variants?: {},
) {
  const def = fileUploadSlotRecipe.slots[slot]

  return [def.styles.base]
}
