import * as React from 'react'

import { Kbd } from '@chakra-ui/react'

import {
  type HTMLSystemProps,
  type RecipeProps,
  UnstyledProp,
  createRecipeContext,
} from '#system'

const { withContext } = createRecipeContext({
  key: 'command',
})

export interface CommandBaseProps extends RecipeProps<'span'>, UnstyledProp {}

export interface CommandProps
  extends HTMLSystemProps<'span', CommandBaseProps> {}

const Key: React.FC<HTMLSystemProps<'span'>> = ({ children }) => {
  if (typeof children !== 'string') {
    return <>{children}</>
  }

  if (['then', 'or', '+'].includes(children)) {
    return <span>{children}</span>
  }

  return <Kbd>{children}</Kbd>
}

export const Command: React.FC<HTMLSystemProps<'span'>> = (props) => {
  const { children, ...rest } = props

  if (typeof children !== 'string') {
    return <>{children}</>
  }

  const keys = children.split(/\s|\+/)

  return (
    <CommandRoot {...rest}>
      {keys.map((key) => (
        <Key key={key}>{key}</Key>
      ))}
    </CommandRoot>
  )
}

const CommandRoot = withContext('span')
