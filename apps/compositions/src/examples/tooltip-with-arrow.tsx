'use client'

import { Button } from '@chakra-ui/react'
import { Tooltip } from '@saas-ui/react'

export const TooltipWithArrow = () => {
  return (
    <Tooltip showArrow content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
