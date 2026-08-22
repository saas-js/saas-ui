/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { sizes } from '../tokens/sizes.stylex.ts'

export const containerStyles = stylex.create({
  base: {
    position: 'relative',
    maxWidth: '8xl',
    width: '100%',
    marginInline: 'auto',
  },
})

export const containerCenterContents = stylex.create({
  true: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const containerFluids = stylex.create({
  true: {
    maxWidth: sizes.full,
  },
})

export type ContainerCenterContent = keyof typeof containerCenterContents

export type ContainerFluid = keyof typeof containerFluids

export const containerRecipe = {
  styles: containerStyles,
  centerContent: containerCenterContents,
  fluid: containerFluids,
  defaultVariants: {},
} as const

export function containerRecipeStyles(variants?: {
  centerContent?: ContainerCenterContent
  fluid?: ContainerFluid
  colorPalette?: string
}) {
  const centerContent = variants?.centerContent ?? 'true'
  const fluid = variants?.fluid ?? 'true'

  return [
    containerStyles.base,
    containerCenterContents[centerContent],
    containerFluids[fluid],
  ]
}

export type ContainerVariantProps = Parameters<typeof containerRecipeStyles>[0]
