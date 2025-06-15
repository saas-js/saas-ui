'use client'

import { Button, Popover } from '@saas-ui/react'

export const PopoverWithSameWidth = () => {
  return (
    <Popover.Root positioning={{ sameWidth: true }}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline" minW="xs">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content width="auto">
        <Popover.Arrow />
        <Popover.Body>
          This is a popover with the same width as the trigger button
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
