import { Box, Stack } from '@chakra-ui/react'
import { CanvasAttributes } from '../../data/blocks'

interface ComponentPreviewProps {
  children: React.ReactNode
  canvas: CanvasAttributes['canvas']
  withSpacing?: boolean
}

export function ComponentPreview({
  children,
  canvas,
  withSpacing = false,
}: ComponentPreviewProps) {
  if (canvas?.center) {
    return (
      <Box maxW={canvas?.maxWidth ?? 'container.lg'} margin="0 auto" p="12">
        {children}
      </Box>
    )
  }
  return (
    <Box
      style={{
        paddingTop: canvas?.maxWidth && withSpacing ? 4 : 0,
        maxWidth: canvas?.maxWidth ? canvas.maxWidth : '100%',
        marginLeft: canvas?.center ? 'auto' : 'unset',
        marginRight: canvas?.center ? 'auto' : 'unset',
      }}
    >
      {children}
    </Box>
  )
}
