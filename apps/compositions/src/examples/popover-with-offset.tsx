'use client'

import { Button, Popover } from '@saas-ui/react'

export const PopoverWithOffset = () => {
  return (
    <Popover.Root positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }} open>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Open
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Body>
          This is a popover with the same width as the trigger button
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
