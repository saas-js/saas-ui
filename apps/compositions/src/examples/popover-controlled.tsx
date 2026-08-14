'use client';
import { useState } from 'react'

import { Button } from '@chakra-ui/react'
import { Popover } from 'compositions/ui/popover'

export const PopoverControlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>
          This is a popover with the same width as the trigger button
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
