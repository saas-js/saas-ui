import * as React from 'react'

import {
  type HTMLChakraProps,
  UnstyledProp,
  createRecipeContext,
} from '@chakra-ui/react/styled-system'

import type { RecipeProps } from '#types'

import { Kbd, type KbdProps } from '../kbd/index.ts'
import type { CommandVariantProps } from './command.recipe.ts'

const { withContext } = createRecipeContext({
  key: 'suiCommand',
})

export interface CommandBaseProps
  extends RecipeProps<'suiCommand', CommandVariantProps>,
    UnstyledProp {}

export interface CommandProps
  extends HTMLChakraProps<'span'>,
    CommandBaseProps,
    CommandVariantProps {
  /**
   * The modifiers to use for the command.
   * @default ['then', 'or', '+']
   */
  modifiers?: Array<string>
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
        <Key key={key} modifiers={modifiers} size={props.size}>
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
