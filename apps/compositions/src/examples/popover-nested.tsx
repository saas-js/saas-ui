'use client'

import { Text } from '@chakra-ui/react'
import { Button, Popover } from '@saas-ui/react'

export const PopoverNested = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>
          <Text mb="4">
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="outline" size="xs">
                Open Nested Popover
              </Button>
            </Popover.Trigger>
            <Popover.Content portalled={false}>
              <Popover.Arrow />
              <Popover.Body>Some nested popover content</Popover.Body>
            </Popover.Content>
          </Popover.Root>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
