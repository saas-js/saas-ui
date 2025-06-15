'use client'

import { useState } from 'react'

import { Button, Tooltip } from '@saas-ui/react'

export const TooltipControlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <Tooltip
      content="Tooltip Content"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Button size="sm">{open ? 'Hide' : 'Show'} tooltip</Button>
    </Tooltip>
  )
}
