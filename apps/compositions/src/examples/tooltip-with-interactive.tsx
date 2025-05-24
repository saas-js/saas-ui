'use client'

import { Button, Tooltip } from '@saas-ui/react'

export const TooltipWithInteractive = () => {
  return (
    <Tooltip content="This is the tooltip content" interactive>
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
