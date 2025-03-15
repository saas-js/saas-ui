import React, { forwardRef, useCallback, useState } from 'react'
import { Box, Card, CardBody, Stack, extendTheme } from '@chakra-ui/react'
import * as UiComponents from '../../../../../packages/pro/packages/blocks'
import { UiComponent } from '../../data/blocks'
import { ComponentPreview } from './component-preview'
import { CanvasHeader } from './canvas-header'
import { CodeTabs } from './code-tabs'
import { useCurrentUser } from '@saas-ui/auth'
import { LoadingOverlay, LoadingSpinner, useLocalStorage } from '@saas-ui/react'
import { User } from '@supabase/supabase-js'

import { theme } from '@saas-ui-pro/react'
import { theme as glassTheme } from '@saas-ui-pro/theme-glass'

const LinkStub = forwardRef((props: any, ref) => {
  return (
    <a
      ref={ref}
      {...props}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    />
  )
})

LinkStub.displayName = 'LinkStub'

const themes = {
  'saas-ui': theme,
  glass: glassTheme,
}

import { ChakraFrame } from '../code-panel/chakra-frame'
import { Resizer } from './resizer'

export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  const user = useCurrentUser<User>()
  const [state, setState] = useState('preview')
  const [primaryColor, setPrimaryColor] = useLocalStorage(
    'theme.primaryColor',
    'primary'
  )
  const [themeId, setTheme] = useLocalStorage('theme.id', 'saas-ui')
  const [error, setError] = useState(false)
  const Component: any =
    UiComponents[props.component as keyof typeof UiComponents]

  const isUnlocked =
    user?.user_metadata.licenses?.length || props.attributes.public

  const [code, setCode] = useState(props.code)

  const [data, setData] = useState()

  const get = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/blocks/${props.attributes.category}/${props.slug}?version=${props.attributes.version}`
      )
      if (!response.ok) throw new Error('Failed to fetch code')

      return await response.json()
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }, [props])

  const fetchCode = useCallback(async () => {
    const data = await get()

    if (data) {
      setData(data)
      setCode(data.code)
    } else {
      setError(true)
    }
  }, [get])

  React.useEffect(() => {
    if (isUnlocked && !data) {
      fetchCode()
    }
  }, [isUnlocked, fetchCode, data])

  const [frameHeight, setFrameHeight] = useState<string | undefined>()
  const frameRef = React.useRef<HTMLIFrameElement | null>(null)
  const containerRef = React.useRef<HTMLBodyElement | null>(null)

  const selectedTheme = React.useMemo(() => {
    return extendTheme(
      {
        colors: {
          primary: themes[themeId].colors[primaryColor],
        },
      },
      themes[themeId]
    )
  }, [themeId, primaryColor])

  return (
    <Box overflow="hidden" mb="20">
      <CanvasHeader
        {...props}
        state={state}
        primaryColor={primaryColor}
        onStateChange={setState}
        onPrimaryColorChange={setPrimaryColor}
        onThemeChange={setTheme}
        theme={themeId}
      />

      <Card rounded="xl" overflow="hidden" mb="20">
        <CardBody bg="component-canvas-bg" padding="0">
          {state === 'preview' ? (
            <Resizer>
              <Stack
                style={{ zIndex: props.zIndex }}
                height={frameHeight}
                alignItems="stretch"
                justifyContent="stretch"
                fontSize="md"
              >
                <ChakraFrame
                  frameRef={(el) => {
                    frameRef.current = el
                  }}
                  onHeightChange={(height) => setFrameHeight(String(height))}
                  theme={selectedTheme}
                  linkComponent={LinkStub}
                >
                  <ComponentPreview canvas={props.attributes.canvas}>
                    <Component
                      {...props.attributes.props}
                      getRootNode={() =>
                        frameRef.current?.contentWindow?.document
                      }
                    />
                  </ComponentPreview>
                </ChakraFrame>
              </Stack>
            </Resizer>
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
