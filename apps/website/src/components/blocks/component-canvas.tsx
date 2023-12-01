import React, { useState } from 'react'
import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import * as UiComponents from '../../../../../packages/pro/saas-ui/templates'
import { UiComponent } from '../../data/blocks'
import { ComponentPreview } from './component-preview'
import { CanvasHeader } from './canvas-header'
import { CodeTabs } from './code-tabs'
import { useFetch } from 'use-http'
import { useCurrentUser } from '@saas-ui/auth'
import { LoadingOverlay, LoadingSpinner, SaasProvider } from '@saas-ui/react'
import { User } from '@supabase/supabase-js'

import { theme } from '@saas-ui-pro/react'
import { ChakraFrame } from '../code-panel/chakra-frame'

export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  const user = useCurrentUser<User>()
  const [state, setState] = useState('preview')
  const [primaryColor, setPrimaryColor] = useState('blue')
  const [error, setError] = useState(false)
  const Component: any =
    UiComponents[props.component as keyof typeof UiComponents]

  const isUnlocked =
    user?.user_metadata.licenses?.length || props.attributes.public

  const [code, setCode] = useState(props.code)
  const { get, response } = useFetch(
    `/api/blocks/${props.attributes.category}/${props.slug}?version=${props.attributes.version}`
  )

  const fetchCode = async () => {
    const data = await get()
    if (response.ok) {
      setCode(data.code)
    } else {
      setError(true)
    }
  }

  React.useEffect(() => {
    if (isUnlocked) {
      fetchCode()
    } else {
      setError(true)
    }
  }, [isUnlocked])

  const [frameHeight, setFrameHeight] = useState<string | undefined>()

  return (
    <Box overflow="hidden" mb="20">
      <CanvasHeader
        {...props}
        state={state}
        primaryColor={primaryColor}
        onStateChange={setState}
        onPrimaryColorChange={setPrimaryColor}
      />

      <Card rounded="xl" overflow="hidden" mb="20">
        <CardBody bg="component-canvas-bg" padding="0">
          {state === 'preview' ? (
            <Stack
              style={{ zIndex: props.zIndex }}
              minHeight="400px"
              height={frameHeight}
              alignItems="stretch"
              justifyContent="stretch"
              fontSize="md"
            >
              <ChakraFrame onHeightChange={(height) => setFrameHeight(height)}>
                <ComponentPreview canvas={props.attributes.canvas}>
                  <Component {...props.attributes.props} />
                </ComponentPreview>
              </ChakraFrame>
            </Stack>
          ) : (
            <Box pos="relative" minH="400px">
              {code?.length ? (
                <CodeTabs code={code} />
              ) : (
                <LoadingOverlay variant="overlay">
                  <LoadingSpinner />
                </LoadingOverlay>
              )}
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  )
}
