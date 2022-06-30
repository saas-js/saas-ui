import dynamic from 'next/dynamic'
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
import {
  FrameworkLinks,
  FrameworkLinksPro,
} from '@/docs/components/framework-link'
import { VideoPlayer } from '@/docs/components/mdx-components/video-player'
import * as React from 'react'
import CodeBlock from './codeblock/codeblock'
import ComponentLinks from './component-links'
import IconsList from './icons-list'
import { LinkCard } from '../link-card'
import { QuickLink } from '../quick-link'
import { FiArrowRight } from 'react-icons/fi'

const PropsTable = dynamic(() => import('../props-table'))

const {
  Alert,
  AlertIcon,
  AlertTitle,
  AspectRatio,
  Box,
  Flex,
  chakra,
  Kbd,
  HStack,
  UnorderedList,
  ListItem,
} = Chakra

const BestPractises = ({ does = [], donts = [] }) => {
  return (
    <HStack my="1.5em" alignItems="stretch">
      <Do>
        <UnorderedList spacing="2">
          {does.map((item, i) => (
            <ListItem key={i}>{item}</ListItem>
          ))}
        </UnorderedList>
      </Do>
      <Dont>
        <UnorderedList spacing="2">
          {donts.map((item, i) => (
            <ListItem key={i}>{item}</ListItem>
          ))}
        </UnorderedList>
      </Dont>
    </HStack>
  )
}

const BestPractice = ({ children, title, ...props }) => {
  return (
    <Alert
      mt="4"
      role="none"
      variant="top-accent"
      as="blockquote"
      rounded="4px"
      my="0"
      flexDirection="column"
      alignItems="flex-start"
      {...props}
    >
      <Flex mb="4">
        <AlertIcon /> <AlertTitle>{title}</AlertTitle>
      </Flex>
      {children}
    </Alert>
  )
}

const Do = (props) => {
  return <BestPractice {...props} status="success" title="Do" />
}

const Dont = (props) => {
  return <BestPractice {...props} status="error" title="Don't" />
}

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
  Info: ({ children, ...props }) => (
    <Alert
      mt="4"
      role="none"
      status="info"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    >
      <AlertIcon />
      {children}
    </Alert>
  ),
  Do,
  Dont,
  BestPractises,
  HStack,
  ComponentLinks,
  IconsList,
  PropsTable,
  FrameworkLinks,
  FrameworkLinksPro,
  VideoPlayer,
  AspectRatio,
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
  LinkCard,
  QuickLink,
  FiArrowRight,
}
