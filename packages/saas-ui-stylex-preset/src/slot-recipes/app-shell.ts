/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

export const appShellRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
  },
})

export const appShellRootFullscreens = stylex.create({
  true: {
    position: 'fixed',
    inset: 0,
  },
})

export const appShellContent = stylex.create({
  base: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
})

export const appShellMain = stylex.create({
  base: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
  },
})

export type AppShellFullscreen = keyof typeof appShellRootFullscreens

export const appShellSlotRecipe = {
  slots: {
    root: {
      styles: appShellRoot,
      fullscreen: appShellRootFullscreens,
    },
    content: {
      styles: appShellContent,
    },
    main: {
      styles: appShellMain,
    },
  },
  defaultVariants: {
    fullscreen: 'false',
    variant: 'plain',
  },
} as const

export function appShellSlotStyles(
  slot: keyof typeof appShellSlotRecipe.slots,
  variants?: {
    fullscreen?: AppShellFullscreen
    variant?: AppShellVariant
  },
) {
  const fullscreen =
    variants?.fullscreen ?? appShellSlotRecipe.defaultVariants.fullscreen
  const variant =
    variants?.variant ?? appShellSlotRecipe.defaultVariants.variant
  const def = appShellSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'fullscreen' in def
      ? def.fullscreen[fullscreen as keyof typeof def.fullscreen]
      : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
