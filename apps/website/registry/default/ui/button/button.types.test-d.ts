import type { ButtonVariantProps } from '@saas-ui/chakra-preset/recipes/button'

import type { IconButtonProps } from '../icon-button/icon-button.tsx'
import type { ButtonProps } from './button.ts'

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? true
    : false

type Expect<Value extends true> = Value

type PreservesPresetVariant = Expect<
  Equal<ButtonProps['variant'], ButtonVariantProps['variant']>
>
type PreservesPresetSize = Expect<
  Equal<ButtonProps['size'], ButtonVariantProps['size']>
>

const glassButton = {
  variant: 'glass',
  size: 'xl',
} satisfies ButtonProps

const responsiveButton = {
  variant: { base: 'glass', md: 'outline' },
  size: ['xs', null, 'md', 'lg'],
} satisfies ButtonProps

const glassIconButton = {
  'aria-label': 'Open settings',
  variant: 'glass',
  size: 'xs',
} satisfies IconButtonProps

// @ts-expect-error Button only accepts variants declared by the preset recipe.
const invalidVariant: ButtonProps = { variant: 'raised' }

// @ts-expect-error Button only accepts sizes declared by the preset recipe.
const invalidSize: ButtonProps = { size: '2xl' }

void glassButton
void responsiveButton
void glassIconButton
void invalidVariant
void invalidSize
