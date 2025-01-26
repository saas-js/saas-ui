import { ComponentProps } from 'react'

import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda/jsx'
import { card } from '@saas-ui/panda/recipes'

import { createStyleContext } from '../context'

const { withProvider, withContext } = createStyleContext(card)

export type CardProps = ComponentProps<typeof Root>

export const Root = withProvider(styled(ark.div), 'root')
export const Body = withContext(styled(ark.div), 'body')
export const Header = withContext(styled(ark.div), 'header')
export const Footer = withContext(styled(ark.div), 'footer')
export const Title = withContext(styled(ark.h3), 'title')
