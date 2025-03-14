'use client'

import { useRef } from 'react'

import { Box, Group } from '@chakra-ui/react'
import { Button, Popover } from '@saas-ui/react'

export const PopoverWithInitialFocus = () => {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <Popover.Root initialFocusEl={() => ref.current}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>Manage Your Channels</Popover.Header>
        <Popover.Arrow />
        <Popover.Body>
          This is a popover with the same width as the trigger button
        </Popover.Body>
        <Popover.Footer>
          <Box fontSize="sm" flex="1">
            Step 2 of 4
          </Box>
          <Group>
            <Button size="sm" ref={ref}>
              Prev
            </Button>
            <Button size="sm">Next</Button>
          </Group>
        </Popover.Footer>
        <Popover.CloseTrigger />
      </Popover.Content>
    </Popover.Root>
  )
}
