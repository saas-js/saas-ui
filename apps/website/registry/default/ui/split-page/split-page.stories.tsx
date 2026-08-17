import { Box, type BoxProps, Button, Text, useBreakpointValue } from '@chakra-ui/react'
import type { Meta } from '@storybook/react-vite'
import { FiFilter } from 'react-icons/fi'

import { AppShell } from '../app-shell/index.ts'
import { Avatar } from '../avatar/index.ts'
import { BackButton } from '../back-button/index.ts'
import { EmptyState } from '../empty-state/index.ts'
import { GridList } from '../grid-list/index.ts'
import { Page } from '../page/index.ts'
import { SplitPage, useSplitPage } from './index.ts'

export default {
  title: 'Components/SplitPage',
  decorators: [
    (Story: any) => (
      <AppShell borderWidth="1px" height="calc(100vh - 40px)">
        <Story />
      </AppShell>
    ),
  ],
} as Meta

const List = () => (
  <GridList.Root>
    <GridList.Item>
      <GridList.Cell width="14">
        <Avatar name="Elliot Alderson" size="sm" />
      </GridList.Cell>
      <GridList.Cell flex="1">
        <Text fontWeight="bold">A bug is never just a mistake.</Text>
        <Text fontSize="sm" color="fg.muted" lineClamp={2}>
          <Text as="span" color="fg">
            Elliot Alderson
          </Text>{' '}
          — It represents something bigger. An error of thinking that makes you
          who you are.
        </Text>
      </GridList.Cell>
    </GridList.Item>
    <GridList.Item>
      <GridList.Cell width="14">
        <Avatar name="Tyrell Wellick" size="sm" />
      </GridList.Cell>
      <GridList.Cell flex="1">
        <Text fontWeight="bold">Hi</Text>
        <Text fontSize="sm" color="fg.muted" lineClamp={2}>
          <Text as="span" color="fg">
            Tyrell Wellick
          </Text>{' '}
          — Unfortunately, we're all human. Except me, of course.
        </Text>
      </GridList.Cell>
    </GridList.Item>
  </GridList.Root>
)

const Content = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nibh
        sit amet nulla ultricies vehicula. Proin consequat auctor vestibulum.
        Phasellus sit amet fringilla erat, nec placerat dui. In iaculis ex non
        lacus dictum pellentesque. Pellentesque malesuada ipsum ex, ac ultricies
        nisi ornare non. Suspendisse potenti. Vestibulum hendrerit tellus elit,
        eget suscipit odio luctus ut. Nunc aliquam urna arcu, sit amet ultrices
        nunc malesuada id. Nam semper ante lectus, id egestas dolor tempus non.
      </Text>
    </Box>
  )
}

export const Basic = {
  render: () => (
    <SplitPage>
      <Page.Root borderRightWidth="1px" width="30%" maxW="300px">
        <Page.Header title="Inbox" />
        <Page.Body p="0">
          <List />
        </Page.Body>
      </Page.Root>
      <EmptyState title="Inbox zero" />
    </SplitPage>
  ),
}

export const WithContent = {
  render: () => (
    <SplitPage>
      <Page.Root borderRightWidth="1px" width="30%" maxW="300px">
        <Page.Header title="Inbox" />
        <Page.Body p="0">
          <List />
        </Page.Body>
      </Page.Root>
      <Page.Root>
        <Page.Header
          title="Elliot Alderson"
          description="A bug is never just a mistake"
        />
        <Page.Body>
          <Content />
        </Page.Body>
      </Page.Root>
    </SplitPage>
  ),
}

export const WithToolbar = {
  render: () => (
    <SplitPage>
      <Page.Root borderRightWidth="1px" width="30%" maxW="300px">
        <Page.Header
          title="Inbox"
          actions={
            <Button size="sm" variant="outline" aria-label="Filter">
              <FiFilter />
            </Button>
          }
        />
        <Page.Body p="0">
          <List />
        </Page.Body>
      </Page.Root>
      <Page.Root>
        <Page.Header
          title="Elliot Alderson"
          description="A bug is never just a mistake"
        />
        <Page.Body>
          <Content />
        </Page.Body>
      </Page.Root>
    </SplitPage>
  ),
}

const breakpoints = { base: true, lg: false }

const ResponsiveContent = () => {
  const { onClose } = useSplitPage()

  const isMobile = useBreakpointValue(breakpoints)
  const nav = isMobile ? <BackButton onClick={onClose} ms="-2" /> : undefined

  return (
    <Page.Root>
      <Page.Header
        title="Elliot Alderson"
        description="A bug is never just a mistake"
        nav={nav}
      />
      <Page.Body>
        <Content />
      </Page.Body>
    </Page.Root>
  )
}

const ResponsiveList = () => {
  const { onOpen } = useSplitPage()
  return (
    <GridList.Root>
      <GridList.Item onClick={onOpen}>Responsive item</GridList.Item>
    </GridList.Root>
  )
}

export const Responsive = {
  render: () => {
    return (
      <SplitPage defaultOpen={false} breakpoint="lg">
        <Page.Root
          borderRightWidth="1px"
          width="30%"
          maxW={{ base: 'full', lg: '300px' }}
        >
          <Page.Header title="Inbox" />
          <Page.Body p="0">
            <ResponsiveList />
          </Page.Body>
        </Page.Root>
        <ResponsiveContent />
      </SplitPage>
    )
  },
}
