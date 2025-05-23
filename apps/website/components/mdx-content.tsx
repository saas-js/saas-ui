import * as TypographyDocs from 'compositions/lib/typography-token-doc'
import { Kbd, SimpleGrid } from '@chakra-ui/react'
import { useMDXComponent } from '@content-collections/mdx/react'
import { AspectRatioTokenDoc } from 'compositions/lib/aspect-ratio-token-doc'
import { BorderRadiusTokenDoc } from 'compositions/lib/border-radius-token-doc'
import { BreakpointDoc } from 'compositions/lib/breakpoint-doc'
import {
  ColorSemanticTokenDoc,
  ColorTokenDoc,
} from 'compositions/lib/color-token-doc'
import { DurationTokenDoc, KeyframeDoc } from 'compositions/lib/keyframe-doc'
import { ShadowTokenDoc } from 'compositions/lib/shadow-token-doc'
import { SizesTokenDoc } from 'compositions/lib/sizes-token-doc'
import { SpacingTokenDoc } from 'compositions/lib/spacing-token-doc'
import { ZIndexTokenDoc } from 'compositions/lib/z-index-token-doc'

import { Example, ExampleTabs } from './example'
import { ExamplePreview } from './example-preview'
import { Anchor } from './mdx/anchor'
import { Blockquote } from './mdx/blockquote'
import { Callout } from './mdx/callout'
import { Card, CardGroup } from './mdx/card'
import { Code, Pre } from './mdx/code'
import { CodeBlock } from './mdx/code-block'
import { CodeGroup } from './mdx/code-group'
import { ComponentGrid } from './mdx/component-grid'
import { H1, H2, H3, H4 } from './mdx/heading'
import { Img } from './mdx/image'
import { Li, Ol, Ul } from './mdx/list'
import { PropTable } from './mdx/prop-table'
import { QuickLink } from './mdx/quick-link'
import { ResourceCard } from './mdx/resource-card'
import { Steps } from './mdx/steps'
import { Table } from './mdx/table'
import { P, Strong } from './mdx/text'

const sharedComponents = {
  a: Anchor,
  blockquote: Blockquote,
  img: Img,
  p: P,
  strong: Strong,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  kbd: Kbd,
  pre: Pre,
  code: Code,
  ol: Ol,
  ul: Ul,
  li: Li,
  table: Table,
  steps: Steps,
  callout: Callout,
  'code-group': CodeGroup,
  SimpleGrid,
  Info: Callout,
  Example: Example,
  ExampleTabs: ExampleTabs,
  ExamplePreview: ExamplePreview,
  card: Card,
  'card-group': CardGroup,
  Card,
  QuickLink,
  PropTable,
  ComponentGrid,
  ResourceCard: ResourceCard,
  'code-block': CodeBlock,
  ColorTokenDoc,
  ColorSemanticTokenDoc,
  ShadowTokenDoc,
  BorderRadiusTokenDoc,
  ...TypographyDocs,
  SpacingTokenDoc,
  KeyframeDoc,
  BreakpointDoc,
  DurationTokenDoc,
  AspectRatioTokenDoc,
  SizesTokenDoc,
  ZIndexTokenDoc,
}

// const useMDXComponent = (code: string) => {
//   const fn = new Function(code)
//   return fn({ ...runtime }).default
// }

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContent = (props: MDXProps) => {
  const { code, components = {} } = props
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
