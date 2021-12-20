import * as Chakra from '@chakra-ui/react'
import {
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
} from '@/docs/components/color-palette'
import { Anchor } from '@/docs/components/mdx-components/anchor'
import { InlineCode } from '@/docs/components/mdx-components/inline-code'
import { LinkedHeading } from '@/docs/components/mdx-components/linked-heading'
import { Pre } from '@/docs/components/mdx-components/pre'
import { Table, TData, THead } from '@/docs/components/mdx-components/table'
import { FrameworkLinks } from '@/docs/components/framework-link'
import { VideoPlayer } from '@/docs/components/mdx-components/video-player'
import * as React from 'react'
import PropsTable from '../props-table'
import CodeBlock from './codeblock/codeblock'
import ComponentLinks from './component-links'
import IconsList from './icons-list'

const { Alert, AspectRatio, Box, chakra, Kbd } = Chakra

export const MDXComponents = {
  ...Chakra,
  h1: (props) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props) => <LinkedHeading apply="mdx.h2" {...props} />,
  h3: (props) => <LinkedHeading as="h3" apply="mdx.h3" {...props} />,
  h4: (props) => <LinkedHeading as="h4" apply="mdx.h4" {...props} />,
  hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  code: InlineCode,
  pre: (props) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    return <CodeBlock {...props} />
  },
  kbd: Kbd,
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? 'br' : undefined}
      height={reset ? undefined : '24px'}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: (props) => <chakra.p apply="mdx.p" {...props} />,
  ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
  li: (props) => <chakra.li pb="4px" {...props} />,
  blockquote: (props) => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  ComponentLinks,
  IconsList,
  PropsTable,
  FrameworkLinks,
  VideoPlayer,
  AspectRatio,
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
}
