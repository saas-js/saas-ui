import React, { useState } from 'react'
import { Box, Card, CardBody, ChakraProvider, useTheme } from '@chakra-ui/react'
import * as UiComponents from '../../../../../packages/pro/saas-ui/templates'
import { UiComponent } from '../../data/blocks'
import { ComponentPreview } from './component-preview'
import { CanvasHeader } from './canvas-header'
import { CodeTabs } from './code-tabs'
import { useFetch } from 'use-http'
import { useAuth } from '@saas-ui/auth'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'

export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  const { isAuthenticated } = useAuth()
  const [state, setState] = useState('preview')
  const [primaryColor, setPrimaryColor] = useState('blue')
  const Component: any =
    UiComponents[props.component as keyof typeof UiComponents]

  const theme = useTheme()

  const [code, setCode] = useState(props.code)
  const { get, response } = useFetch(`/api/blocks/${props.slug}`)

  const fetchCode = async () => {
    const data = await get()
    if (response.ok) {
      setCode(data.code)
    }
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchCode()
    }
  }, [isAuthenticated])

  return (
    <Card rounded="xl" overflow="hidden" mb="20">
      <CanvasHeader
        {...props}
        state={state}
        primaryColor={primaryColor}
        onStateChange={setState}
        onPrimaryColorChange={setPrimaryColor}
      />

      <CardBody bg="app-background" padding="0">
        {state === 'preview' ? (
          <Box style={{ zIndex: props.zIndex }} minH="400px">
            <ComponentPreview canvas={props.attributes.canvas}>
              <ChakraProvider theme={theme}>
                <Component {...props.attributes.props} />
              </ChakraProvider>
            </ComponentPreview>
          </Box>
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
  )
}
