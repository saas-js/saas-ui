'use client'

import * as React from 'react'

import {
  type HTMLChakraProps,
  Kbd,
  type KbdProps,
  KbdPropsProvider,
  UnstyledProp,
  createRecipeContext,
} from '@chakra-ui/react'
import type { RecipeProps } from '@saas-ui/chakra-preset'
import {
  type KbdGroupVariantProps,
  kbdGroupRecipe,
} from '@saas-ui/chakra-preset/recipes/kbd-group'

const { withContext } = createRecipeContext({
  recipe: kbdGroupRecipe,
})

export interface KbdGroupBaseProps
  extends RecipeProps<'suiKbdGroup', KbdGroupVariantProps>, UnstyledProp {}

export interface KbdGroupProps
  extends HTMLChakraProps<'span'>, KbdGroupBaseProps, KbdGroupVariantProps {
  /**
   * The variant passed to each `Kbd` in the group.
   */
  variant?: KbdProps['variant']
  /**
   * Words in a shortcut string that render as plain text instead of a key.
   * @default ['then', 'or', '+']
   */
  modifiers?: Array<string>
}

type ConditionalScalar<T> = T extends readonly unknown[]
  ? never
  : T extends object
    ? never
    : T

type KbdGroupSize = Exclude<
  ConditionalScalar<NonNullable<KbdGroupVariantProps['size']>>,
  undefined
>
type KbdSize = Exclude<
  ConditionalScalar<NonNullable<KbdProps['size']>>,
  undefined
>

const kbdGroupSizeToKbdSize = {
  xs: 'sm',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const satisfies Record<KbdGroupSize, KbdSize>

function mapScalarSize(size: KbdGroupSize): KbdSize {
  return kbdGroupSizeToKbdSize[size]
}

/** Maps a `KbdGroup` size, including responsive values, to a `Kbd` size. */
export function getKbdGroupKbdSize(
  size: KbdGroupVariantProps['size'],
): KbdProps['size'] {
  if (Array.isArray(size)) {
    return size.map((value) => (value == null ? null : mapScalarSize(value)))
  }

  if (size && typeof size === 'object') {
    return Object.fromEntries(
      Object.entries(size).map(([condition, value]) => [
        condition,
        getKbdGroupKbdSize(value),
      ]),
    ) as KbdProps['size']
  }

  return size ? mapScalarSize(size as KbdGroupSize) : undefined
}

/**
 * Displays a keyboard shortcut. Pass a string like `shift+X`, `G then I` or
 * `alt or option` to render each key, or pass `Kbd` elements as children.
 * `size` and `variant` are passed to every `Kbd` in the group.
 */
export const KbdGroup: React.FC<KbdGroupProps> = (props) => {
  const { children, modifiers, variant, ...rest } = props

  const kbdProps = React.useMemo(
    () => ({ size: getKbdGroupKbdSize(props.size), variant }),
    [props.size, variant],
  )

  return (
    <StyledKbdGroup {...rest}>
      <KbdPropsProvider value={kbdProps}>
        {typeof children === 'string'
          ? children
              .split(/\s|\+/)
              .filter(Boolean)
              .map((key, index) => (
                <Key key={index} modifiers={modifiers}>
                  {key}
                </Key>
              ))
          : children}
      </KbdPropsProvider>
    </StyledKbdGroup>
  )
}

const StyledKbdGroup = withContext<HTMLSpanElement, KbdGroupBaseProps>('span')

const Key: React.FC<KbdProps & { modifiers?: Array<string> }> = (props) => {
  const { modifiers = ['then', 'or', '+'], children, ...rest } = props

  if (typeof children === 'string' && modifiers.includes(children)) {
    return <span>{children}</span>
  }

  return <Kbd {...rest}>{children}</Kbd>
}
