import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { card } from '@saas-ui/panda-preset/recipes'

import { createStyleContext } from '../context'

const { withProvider, withContext } = createStyleContext(card)

export type CardProps = ComponentProps<typeof Root>

export const Root = withProvider(ark.div, 'root')
export const Body = withContext(ark.div, 'body')
export const Header = withContext(ark.div, 'header')
export const Footer = withContext(ark.div, 'footer')
export const Title = withContext(ark.h3, 'title')
