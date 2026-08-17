import * as React from 'react'

import { Box, Button, Flex } from '@chakra-ui/react'
import type { Meta } from '@storybook/react-vite'

import { AppShell } from '../app-shell/index.ts'
import { Aside } from './index.ts'

export default {
  title: 'Components/Aside',
  component: Aside.Root,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <AppShell>
        <Flex flex="1" minH="0">
          <Box flex="1" p="4">
            Main content
          </Box>
          <Story />
        </Flex>
      </AppShell>
    ),
  ],
} as Meta

export const Basic = {
  render: () => (
    <Aside.Root
      defaultOpen
      width="320px"
      borderLeftWidth="1px"
      bg="bg.panel"
    >
      <Aside.Header>
        <Aside.Title>Details</Aside.Title>
      </Aside.Header>
      <Aside.Body>Aside content</Aside.Body>
    </Aside.Root>
  ),
}

export const Controlled = {
  render: () => {
    const [open, setOpen] = React.useState(true)

    return (
      <>
        <Box position="absolute" top="4" left="4" zIndex="docked">
          <Button size="sm" onClick={() => setOpen((prev) => !prev)}>
            Toggle aside
          </Button>
        </Box>
        <Aside.Root
          open={open}
          onOpenChange={({ open }) => setOpen(open)}
          width="320px"
          borderLeftWidth="1px"
          bg="bg.panel"
        >
          <Aside.Header>
            <Aside.Title>Details</Aside.Title>
          </Aside.Header>
          <Aside.Body>Aside content</Aside.Body>
        </Aside.Root>
      </>
    )
  },
}
