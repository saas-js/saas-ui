'use client'

import { Button, Tooltip } from '@saas-ui/react'

export const TooltipWithPlacement = () => {
  return (
    <Tooltip
      content="This is the tooltip content"
      positioning={{ placement: 'right-end' }}
    >
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
