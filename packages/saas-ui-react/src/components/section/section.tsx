'use client'

import * as React from 'react'

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  chakra,
} from '@chakra-ui/react'

import { withContext, withProvider } from './section.context.ts'

interface SectionRootProps
  extends HTMLChakraProps<'div'>,
    SlotRecipeProps<'suiSection'> {}

const SectionRoot = withProvider<HTMLDivElement, SectionRootProps>(
  'div',
  'root',
)

interface SectionBodyProps extends HTMLChakraProps<'div'> {}

const SectionBody = withContext<HTMLDivElement, SectionBodyProps>('div', 'body')

interface SectionHeaderProps extends Omit<HTMLChakraProps<'div'>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
}

const SectionHeader = withContext<HTMLDivElement, SectionHeaderProps>(
  (props) => {
    const { title, description, children, ...rest } = props

    return (
      <chakra.div {...rest}>
        {typeof title === 'string' ? (
          <SectionTitle>{title}</SectionTitle>
        ) : (
          title
        )}
        {typeof description === 'string' ? (
          <SectionDescription>{description}</SectionDescription>
        ) : (
          description
        )}
        {children}
      </chakra.div>
    )
  },
  'header',
)

const SectionTitle = withContext<HTMLHeadingElement, HTMLChakraProps<'h3'>>(
  'h3',
  'title',
)

const SectionDescription = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'description',
)

export {
  SectionRoot as Root,
  SectionHeader as Header,
  SectionTitle as Title,
  SectionDescription as Description,
  SectionBody as Body,
}
export type {
  SectionRootProps as RootProps,
  SectionHeaderProps as HeaderProps,
  SectionBodyProps as BodyProps,
}
