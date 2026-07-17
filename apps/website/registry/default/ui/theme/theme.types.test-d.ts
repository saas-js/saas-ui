import type { ColorPalette } from '@saas-ui/chakra-preset/colors'

import type { ThemeProps } from './theme.tsx'

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? true
    : false

type Expect<Value extends true> = Value

type PreservesAppearance = Expect<
  Equal<ThemeProps['appearance'], 'light' | 'dark' | undefined>
>
type PreservesColorPalette = Expect<
  Equal<ThemeProps['colorPalette'], ColorPalette | undefined>
>

const validProps = {
  appearance: 'dark',
  hasBackground: false,
  colorPalette: 'purple',
  scaleFactor: 1.25,
  controlRadius: 0.75,
  panelRadius: 1.5,
  indicatorRadius: 2,
  overlayEffect: 'blur(12px)',
} satisfies ThemeProps

// @ts-expect-error Theme only supports explicit light and dark appearances.
const invalidAppearance: ThemeProps = { appearance: 'system' }

// @ts-expect-error Theme color palettes come from the Saas UI preset.
const invalidPalette: ThemeProps = { colorPalette: 'brand' }

void validProps
void invalidAppearance
void invalidPalette
