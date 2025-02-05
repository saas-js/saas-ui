import { ark } from '@ark-ui/react'
import { type CardVariantProps, card } from '@saas-ui/panda-preset/recipes'

import { type HTMLSuiProps, createStyleContext } from '../context'

const { withProvider, withContext } = createStyleContext(card)

export interface RootProps extends HTMLSuiProps<'div', CardVariantProps> {}

export const Root = withProvider<HTMLDivElement, RootProps>(ark.div, 'root')
export const Body = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  ark.div,
  'body',
)
export const Header = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  ark.div,
  'header',
)
export const Footer = withContext<HTMLDivElement, HTMLSuiProps<'div'>>(
  ark.div,
  'footer',
)
export const Title = withContext<HTMLHeadingElement, HTMLSuiProps<'h3'>>(
  ark.h3,
  'title',
)
