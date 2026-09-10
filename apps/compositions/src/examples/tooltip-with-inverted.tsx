'use client'

import { Button } from '@chakra-ui/react'
import { Tooltip } from 'compositions/ui/tooltip'

export const TooltipWithInverted = () => {
  return (
    <Tooltip variant="inverted" content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
