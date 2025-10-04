'use client'

import React, { forwardRef, useCallback, useState } from 'react'

import { UiComponent } from '@/blocks'
import { Box, Card, LoadingOverlay, Stack, defaultSystem } from '@saas-ui/react'

import * as UiComponents from '../../../../packages/pro/packages/blocks'
import { ChakraFrame } from '../chakra-frame/chakra-frame'
import { CanvasHeader } from './canvas-header'
import { CodeTabs } from './code-tabs'
import { ComponentPreview } from './component-preview'
// const themes = {
//   'saas-ui': theme,
//   glass: glassTheme,
// }

// import { ChakraFrame } from '../code-panel/chakra-frame'
import { Resizer } from './resizer'

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

export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  // const user = useCurrentUser<User>()
  const [state, setState] = useState('preview')

  const user = {
    user_metadata: {
      licenses: ['saas-ui'],
    },
  }

  // const [primaryColor, setPrimaryColor] = useLocalStorage(
  //   'theme.primaryColor',
  //   'primary'
  // )
  // const [themeId, setTheme] = useLocalStorage('theme.id', 'saas-ui')

  const [error, setError] = useState(false)

  const Component: any =
    UiComponents[props.component as keyof typeof UiComponents] ??
    (() => 'Not found')

  const isUnlocked =
    user?.user_metadata.licenses?.length || props.attributes.public

  const [code, setCode] = useState(props.code)

  const [data, setData] = useState()

  const get = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/blocks/${props.attributes.category}/${props.slug}?version=${props.attributes.version}`,
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
  console.log(frameHeight)
  // const selectedTheme = React.useMemo(() => {
  //   return extendTheme(
  //     {
  //       colors: {
  //         primary: themes[themeId].colors[primaryColor],
  //       },
  //     },
  //     themes[themeId]
  //   )
  // }, [themeId, primaryColor])

  return (
    <Box overflow="hidden" mb="20">
      <CanvasHeader
        {...props}
        state={state}
        // primaryColor={primaryColor}
        onStateChange={setState}
        // onPrimaryColorChange={setPrimaryColor}
        // onThemeChange={setTheme}
        // theme={themeId}
      />

      <Card.Root rounded="xl" overflow="hidden" mb="20">
        <Card.Body bg="component-canvas-bg" padding="0">
          {state === 'preview' ? (
            <Resizer>
              <Stack
                style={{ zIndex: props.zIndex }}
                height={frameHeight + 'px'}
                alignItems="stretch"
                justifyContent="stretch"
                fontSize="md"
              >
                <ChakraFrame
                  frameRef={(el) => {
                    frameRef.current = el
                  }}
                  onHeightChange={(height) => setFrameHeight(String(height))}
                  value={defaultSystem}
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
                <LoadingOverlay.Root variant="overlay">
                  <LoadingOverlay.Spinner />
                </LoadingOverlay.Root>
              )}
            </Box>
          )}
        </Card.Body>
      </Card.Root>
    </Box>
  )
}
