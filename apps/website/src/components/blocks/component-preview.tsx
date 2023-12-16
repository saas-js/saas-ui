import { Box } from '@chakra-ui/react'
import { CanvasAttributes } from '../../data/blocks'

interface ComponentPreviewProps {
  children: React.ReactNode
  canvas: CanvasAttributes['canvas']
  withSpacing?: boolean
}

export function ComponentPreview({ children, canvas }: ComponentPreviewProps) {
  return (
    <Box
      sx={{
        padding: canvas?.center ? 12 : 0,
        maxWidth: canvas?.maxWidth
          ? canvas.maxWidth
          : canvas?.center
          ? 'container.lg'
          : '100%',
        marginLeft: canvas?.center ? 'auto' : 'unset',
        marginRight: canvas?.center ? 'auto' : 'unset',
        height: canvas?.height ?? 'auto',
      }}
    >
      {children}
    </Box>
  )
}
