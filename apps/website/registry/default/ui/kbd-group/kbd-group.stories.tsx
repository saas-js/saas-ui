import React from 'react'

import { Button, Center, Kbd, Tooltip, VStack } from '@chakra-ui/react'

import { KbdGroup } from './kbd-group'

export default {
  title: 'Components/KbdGroup',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Story />
      </Center>
    ),
  ],
}

export const Basic = {
  render: () => (
    <VStack>
      <KbdGroup>shift+X</KbdGroup>
      <KbdGroup>A then B</KbdGroup>
      <KbdGroup>alt or option</KbdGroup>
    </VStack>
  ),
}

export const Sizes = {
  render: () => (
    <VStack>
      <KbdGroup size="xs">shift+X</KbdGroup>
      <KbdGroup size="sm">shift+X</KbdGroup>
      <KbdGroup size="md">A then B</KbdGroup>
      <KbdGroup size="lg">alt or option</KbdGroup>
    </VStack>
  ),
}

export const TooltipShortcut = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Inbox</Button>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>

          <>
            Inbox <KbdGroup size="sm">G then I</KbdGroup>
          </>
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
}

export const WithKbdChildren = {
  render: () => (
    <KbdGroup size="md">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
