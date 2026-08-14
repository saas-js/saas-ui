import type { IconBadgeVariantProps } from '@saas-ui/chakra-preset/recipes/icon-badge'

import type { IconBadgeProps } from './icon-badge.tsx'

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? true
    : false

type Expect<Value extends true> = Value

type PreservesSize = Expect<
  Equal<IconBadgeProps['size'], IconBadgeVariantProps['size']>
>
type PreservesVariant = Expect<
  Equal<IconBadgeProps['variant'], IconBadgeVariantProps['variant']>
>

const validProps = {
  size: 'lg',
  variant: 'outline',
} satisfies IconBadgeProps

// @ts-expect-error IconBadge only accepts variants declared by its preset recipe.
const invalidVariant: IconBadgeProps = { variant: 'ghost' }

void validProps
void invalidVariant
