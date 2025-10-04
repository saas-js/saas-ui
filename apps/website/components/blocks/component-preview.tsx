'use client'

import { CanvasAttributes } from '@/blocks'
import { Box } from '@saas-ui/react'

interface ComponentPreviewProps {
  children: React.ReactNode
  canvas: CanvasAttributes['canvas']
  withSpacing?: boolean
}

export function ComponentPreview({ children, canvas }: ComponentPreviewProps) {
  return (
    <Box
      css={{
        padding: canvas?.center ? 12 : 0,
        maxWidth: canvas?.maxWidth
          ? canvas.maxWidth
          : canvas?.center
            ? 'container.lg'
            : '100%',
        marginLeft: canvas?.center ? 'auto' : 'unset',
        marginRight: canvas?.center ? 'auto' : 'unset',
        height: canvas?.height ?? 'auto',
        overflow: canvas?.height ? 'auto' : 'visible',
      }}
    >
      {children}
    </Box>
  )
}
