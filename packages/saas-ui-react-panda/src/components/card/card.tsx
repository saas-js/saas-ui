import { styled } from '@saas-ui/panda/jsx'
import { card } from '@saas-ui/panda/recipes'
import { ComponentProps } from 'react'
import { createStyleContext } from '../context'

const { withProvider, withContext } = createStyleContext(card)

export type CardProps = ComponentProps<typeof Root>

export const Root = withProvider(styled.div, 'root')
export const Body = withContext(styled.div, 'body')
export const Header = withContext(styled.div, 'header')
export const Footer = withContext(styled.div, 'footer')
export const Title = withContext(styled.h3, 'title')
