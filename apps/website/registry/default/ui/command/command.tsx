'use client'

import * as React from 'react'

import {
  type HTMLChakraProps,
  Kbd,
  type KbdProps,
  UnstyledProp,
  createRecipeContext,
} from '@chakra-ui/react'
import type { RecipeProps } from '@saas-ui/chakra-preset'
import {
  type CommandVariantProps,
  commandRecipe,
} from '@saas-ui/chakra-preset/recipes/command'

const { withContext } = createRecipeContext({
  recipe: commandRecipe,
})

export interface CommandBaseProps
  extends RecipeProps<'suiCommand', CommandVariantProps>, UnstyledProp {}

export interface CommandProps
  extends HTMLChakraProps<'span'>, CommandBaseProps, CommandVariantProps {
  /**
   * The modifiers to use for the command.
   * @default ['then', 'or', '+']
   */
  modifiers?: Array<string>
}

type ConditionalScalar<T> = T extends readonly unknown[]
  ? never
  : T extends object
    ? never
    : T

type CommandSize = Exclude<
  ConditionalScalar<NonNullable<CommandVariantProps['size']>>,
  undefined
>
type KbdSize = Exclude<
  ConditionalScalar<NonNullable<KbdProps['size']>>,
  undefined
>

const commandSizeToKbdSize = {
  xs: 'sm',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const satisfies Record<CommandSize, KbdSize>

function mapCommandScalarSize(size: CommandSize): KbdSize {
  return commandSizeToKbdSize[size]
}

export function getCommandKbdSize(
  size: CommandVariantProps['size'],
): KbdProps['size'] {
  if (Array.isArray(size)) {
    return size.map((value) =>
      value == null ? null : mapCommandScalarSize(value),
    )
  }

  if (size && typeof size === 'object') {
    return Object.fromEntries(
      Object.entries(size).map(([condition, value]) => [
        condition,
        getCommandKbdSize(value),
      ]),
    ) as KbdProps['size']
  }

  return size ? mapCommandScalarSize(size as CommandSize) : undefined
}

export const Command: React.FC<CommandProps> = (props) => {
  const { children, modifiers, ...rest } = props

  if (typeof children !== 'string') {
    return <>{children}</>
  }

  const keys = children.split(/\s|\+/)

  return (
    <StyledCommand {...rest}>
      {keys.map((key) => (
        <Key
          key={key}
          modifiers={modifiers}
          size={getCommandKbdSize(props.size)}
        >
          {key}
        </Key>
      ))}
    </StyledCommand>
  )
}

const StyledCommand = withContext<HTMLDivElement, CommandBaseProps>('span')

const Key: React.FC<KbdProps & { modifiers?: Array<string> }> = (props) => {
  const { modifiers = ['then', 'or', '+'], children, ...rest } = props
  if (typeof children !== 'string') {
    return <>{children}</>
  }

  if (modifiers.includes(children)) {
    return <span>{children}</span>
  }

  return <Kbd {...rest}>{children}</Kbd>
}
