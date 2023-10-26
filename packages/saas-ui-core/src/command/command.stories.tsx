import { Button, Center, Tooltip, VStack } from '@chakra-ui/react'

import { Command } from './command'

export default {
  title: 'Components/Data Display/Command',
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

export const TooltipCommand = {
  render: () => (
    <Tooltip
      label={
        <>
          Inbox <Command>G then I</Command>
        </>
      }
    >
      <Button>Inbox</Button>
    </Tooltip>
  ),
}
