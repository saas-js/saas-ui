/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const sectionRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export const sectionRootVariants = stylex.create({
  annotated: {
    marginTop: spacing._4,
  },
})

export const sectionHeader = stylex.create({
  base: {
    flexShrink: 0,
    marginBottom: spacing._4,
  },
})

export const sectionHeaderVariants = stylex.create({
  annotated: {},
})

export const sectionTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    lineHeight: '110%',
    letterSpacing: '-1%',
    marginBottom: spacing._1,
  },
})

export const sectionDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.md,
  },
})

export const sectionBody = stylex.create({
  base: {
    flex: 1,
    minWidth: 0,
  },
})

export type SectionVariant = keyof typeof sectionRootVariants

export const sectionSlotRecipe = {
  slots: {
    root: {
      styles: sectionRoot,
      variants: sectionRootVariants,
    },
    header: {
      styles: sectionHeader,
      variants: sectionHeaderVariants,
    },
    title: {
      styles: sectionTitle,
    },
    description: {
      styles: sectionDescription,
    },
    body: {
      styles: sectionBody,
    },
  },
  defaultVariants: {},
} as const

export function sectionSlotStyles(
  slot: keyof typeof sectionSlotRecipe.slots,
  variants?: {},
) {
  const def = sectionSlotRecipe.slots[slot]

  return [def.styles.base]
}
