import React from 'react'
import { Box, Card, CardBody, Text } from '@chakra-ui/react'
import { UiComponent } from '../../data/blocks'
import { CanvasHeader } from './canvas-header'

/**
 * Live block canvases imported the private `packages/pro` blocks package and
 * fetched source from `/api/blocks`. Neither exists in this static archive.
 */
export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  return (
    <Box overflow="hidden" mb="20">
      <CanvasHeader
        {...props}
        state="preview"
        primaryColor="primary"
        onStateChange={() => {}}
        onPrimaryColorChange={() => {}}
        onThemeChange={() => {}}
        theme="saas-ui"
      />

      <Card rounded="xl" overflow="hidden" mb="20">
        <CardBody>
          <Text color="muted">
            Live block previews are not included in this static v2 docs
            archive. Source and interactive canvases live on the current site.
          </Text>
        </CardBody>
      </Card>
    </Box>
  )
}
