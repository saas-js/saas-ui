import React from 'react'

import { Button, Center, Tooltip, VStack } from '@chakra-ui/react'

import { Command } from './command'

export default {
  title: 'Components/Command',
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
      <Command>shift+X</Command>
      <Command>A then B</Command>
      <Command>alt or option</Command>
    </VStack>
  ),
}

export const Sizes = {
  render: () => (
    <VStack>
      <Command size="sm">shift+X</Command>
      <Command size="md">A then B</Command>
      <Command size="lg">alt or option</Command>
    </VStack>
  ),
}

export const TooltipCommand = {
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
            Inbox <Command size="sm">G then I</Command>
          </>
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
}
