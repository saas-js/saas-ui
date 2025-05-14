'use client'

import { Button, Tooltip } from '@saas-ui/react'

export const TooltipBasic = () => {
  return (
    <Tooltip content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
