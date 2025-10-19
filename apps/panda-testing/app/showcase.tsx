'use client'

import { useState } from 'react'

import {
  Box,
  Flex,
  FlexProps,
  Grid,
  GridItem,
  type StyledComponent,
  Wrap,
  styled,
} from '@saas-ui/panda-preset/jsx'
import { ComponentProps } from '@saas-ui/panda-preset/types'
import { Accordion, Badge, Button, Card, Menu, Tag } from '@saas-ui/react-panda'
import { ChevronDownIcon } from 'lucide-react'
import { HiSortAscending } from 'react-icons/hi'
import { LuClipboardPaste, LuCopy, LuScissors } from 'react-icons/lu'

export function Headings() {
  return (
    <Flex direction={'column'} gap={4} w={'full'}>
      <styled.h2 textAlign={'center'} textStyle={'2xl'} fontWeight={'semibold'}>
        Saas UI + Panda CSS
      </styled.h2>
      <styled.p textAlign={'center'}>
        This is a test of the Saas UI + Panda CSS integration.
      </styled.p>
    </Flex>
  )
}

function Wrapper(props: FlexProps) {
  return (
    <Flex
      direction={'column'}
      gap={4}
      w={'full'}
      align={'flex-start'}
      {...props}
    />
  )
}

function Title(props: ComponentProps<StyledComponent<'h3'>>) {
  return <styled.h3 textStyle={'lg'} fontWeight={'semibold'} {...props} />
}

export function ButtonShowcase() {
  return (
    <Wrapper>
      <Title>Button</Title>

      <Wrap>
        <Button size={'xl'}>Extra large</Button>
        <Button size={'lg'}>Large</Button>
        <Button size={'md'}>Medium</Button>
        <Button size={'sm'}>Small</Button>
        <Button size={'xs'}>Extra Small</Button>
      </Wrap>
      <Wrap>
        <Button variant={'solid'} colorPalette={'purple'}>
          Solid
        </Button>
        <Button variant={'surface'} colorPalette={'purple'}>
          Surface
        </Button>
        <Button variant={'subtle'} colorPalette={'purple'}>
          Subtle
        </Button>
        <Button variant={'glass'} colorPalette={'purple'}>
          Glass
        </Button>
        <Button variant={'outline'} colorPalette={'purple'}>
          Outline
        </Button>
        <Button variant={'ghost'} colorPalette={'purple'}>
          Ghost
        </Button>
        <Button variant={'plain'} colorPalette={'purple'}>
          Plain
        </Button>
        <Button variant={'solid'} colorPalette={'purple'} loading>
          Loading
        </Button>
        <Button
          variant={'solid'}
          colorPalette={'purple'}
          loading
          loadingText="Loading..."
        >
          Loading Text
        </Button>
      </Wrap>
    </Wrapper>
  )
}

const items = [
  {
    title: 'What is Saas UI?',
    content: 'Saas UI is a library of components for building SaaS products.',
  },
  {
    title: 'What is Panda CSS?',
    content: 'Panda CSS is a build time CSS-in-JS styling system.',
  },
  {
    title: 'What is the Saas UI + Panda CSS integration?',
    content: 'This is a test of the Saas UI + Panda CSS integration.',
  },
]

export function AccordionShowcase() {
  return (
    <Wrapper>
      <Title>Accordion</Title>
      <Accordion.Root>
        {items.map((item, index) => (
          <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Wrapper>
  )
}

export function CardShowcase() {
  return (
    <Wrapper>
      <Title>Card</Title>
      <Grid w={'full'} gap={4} columns={2}>
        <Card.Root w={'full'} variant={'subtle'}>
          <Card.Header>
            <Card.Title>Subtle</Card.Title>
          </Card.Header>
          <Card.Body>Card Body</Card.Body>
          <Card.Footer justifyContent={'flex-end'}>
            <Button>Okay</Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root w={'full'} variant={'elevated'}>
          <Card.Header>
            <Card.Title>Elevated</Card.Title>
          </Card.Header>
          <Card.Body>Card Body</Card.Body>
          <Card.Footer justifyContent={'flex-end'}>
            <Button>Okay</Button>
          </Card.Footer>
        </Card.Root>
        <GridItem colSpan={2}>
          <Card.Root w={'full'}>
            <Card.Header>
              <Card.Title>Outline</Card.Title>
            </Card.Header>
            <Card.Body>Card Body</Card.Body>
            <Card.Footer justifyContent={'flex-end'}>
              <Button variant={'solid'}>Okay</Button>
            </Card.Footer>
          </Card.Root>
        </GridItem>
      </Grid>
    </Wrapper>
  )
}

export function BadgeShowcase() {
  return (
    <Wrapper>
      <Title>Badge</Title>
      <Flex wrap={'wrap'} gap={4}>
        <Badge variant={'solid'}>Solid</Badge>
        <Badge variant={'surface'}>Surface</Badge>
        <Badge variant={'subtle'}>Subtle</Badge>
        <Badge variant={'outline'}>Outline</Badge>
        <Badge variant={'plain'}>Plain</Badge>
      </Flex>
    </Wrapper>
  )
}

export function TagShowcase() {
  return (
    <Wrapper>
      <Title>Tag</Title>
      <Flex wrap={'wrap'} gap={4}>
        <Tag variant={'solid'}>Solid</Tag>
        <Tag variant={'surface'}>Surface</Tag>
        <Tag variant={'subtle'}>Subtle</Tag>
        <Tag variant={'outline'}>Outline</Tag>
        <Tag closable>Closable</Tag>
      </Flex>
    </Wrapper>
  )
}

export function MenuShowcase() {
  const [value, setValue] = useState('asc')

  return (
    <Wrapper>
      <Title>Menu</Title>

      <Wrap>
        <Menu.Root>
          <Menu.Trigger>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item value="new-txt-a">
              New Text File <Menu.ItemCommand>⌘E</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="new-file-a">
              New File... <Menu.ItemCommand>⌘N</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="new-win-a">
              New Window <Menu.ItemCommand>⌘⇧N</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="open-file-a">
              Open File... <Menu.ItemCommand>⌘O</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="export-a">
              Export <Menu.ItemCommand>⌘S</Menu.ItemCommand>
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger>
            <Button variant="outline" size="sm">
              <HiSortAscending /> Sort
            </Button>
          </Menu.Trigger>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={value}
              onValueChange={(e) => setValue(e.value)}
            >
              <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
              <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item value="cut" valueText="cut">
              <LuScissors />
              <Box flex="1">Cut</Box>
              <Menu.ItemCommand>⌘X</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="copy" valueText="copy">
              <LuCopy />
              <Box flex="1">Copy</Box>
              <Menu.ItemCommand>⌘C</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="paste" valueText="paste">
              <LuClipboardPaste />
              <Box flex="1">Paste</Box>
              <Menu.ItemCommand>⌘V</Menu.ItemCommand>
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </Wrap>
    </Wrapper>
  )
}
