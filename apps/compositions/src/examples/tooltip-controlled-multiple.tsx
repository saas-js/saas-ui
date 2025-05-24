'use client'

import { useState } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { Tooltip } from '@saas-ui/react'

function DemoTooltip() {
  const [open, setOpen] = useState(false)
  return (
    <Tooltip
      open={open}
      positioning={{ placement: 'left' }}
      content="Tooltip content"
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Box px="2" py="1" layerStyle="fill.surface" textStyle="sm">
        Hover me
      </Box>
    </Tooltip>
  )
}

export const TooltipControlledMultiple = () => {
  return (
    <Box spaceY="2">
      {[...Array.from({ length: 10 })].map((_, index) => (
        <Flex key={index}>
          <DemoTooltip />
        </Flex>
      ))}
    </Box>
  )
}
