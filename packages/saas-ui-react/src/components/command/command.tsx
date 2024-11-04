import * as React from 'react'

import { Kbd } from '@chakra-ui/react'
import {
  type HTMLChakraProps,
  type RecipeProps,
  UnstyledProp,
  createRecipeContext,
} from '@chakra-ui/react'

const { withContext } = createRecipeContext({
  key: 'command',
})

export interface CommandBaseProps extends RecipeProps<'span'>, UnstyledProp {}

export interface CommandProps
  extends HTMLChakraProps<'span', CommandBaseProps> {}

const Key: React.FC<HTMLChakraProps<'span'>> = ({ children }) => {
  if (typeof children !== 'string') {
    return <>{children}</>
  }

  if (['then', 'or', '+'].includes(children)) {
    return <span>{children}</span>
  }

  return <Kbd>{children}</Kbd>
}

export const Command: React.FC<HTMLChakraProps<'span'>> = (props) => {
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
