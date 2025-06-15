'use client'

import { Button, Popover } from '@saas-ui/react'

export const PopoverWithPlacement = () => {
  return (
    <Popover.Root positioning={{ placement: 'bottom-end' }}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>Some content</Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
