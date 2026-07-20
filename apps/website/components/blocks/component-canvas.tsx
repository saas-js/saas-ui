'use client'

import { useCallback, useEffect, useState } from 'react'

import { UiComponent } from '@/blocks'
import { Box, Card, Stack, Text } from '@chakra-ui/react'

import { LoadingOverlay } from '#components/ui/loading-overlay'

import { CanvasHeader } from './canvas-header'
import { CodeTabs } from './code-tabs'
import { Resizer } from './resizer'

export function ComponentCanvas(props: UiComponent & { zIndex: number }) {
  const [state, setState] = useState('preview')
  const [code, setCode] = useState(props.code)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchCode = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(`/api/pro/blocks/${props.slug}`, {
        credentials: 'same-origin',
        cache: 'no-store',
      })
      if (!response.ok) throw new Error('Failed to fetch block source')
      const data = await response.json()
      setCode(data.code ?? [])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [props.slug])

  useEffect(() => {
    if (state === 'code' && !code.length && !loading && !error) {
      void fetchCode()
    }
  }, [code.length, error, fetchCode, loading, state])

  const canvas = props.attributes.canvas
  const preview = props.attributes.previewUrl
  const canvasHeight = canvas?.height ?? 400
  const height =
    typeof canvasHeight === 'number' ? `${canvasHeight}px` : canvasHeight

  return (
    <Box overflow="hidden" mb="20">
      <CanvasHeader {...props} state={state} onStateChange={setState} />

      <Card.Root rounded="xl" overflow="hidden" mb="20">
        <Card.Body bg="component-canvas-bg" padding="0">
          {state === 'preview' ? (
            <Resizer>
              <Stack
                style={{ zIndex: props.zIndex }}
                minH={height}
                alignItems="stretch"
                justifyContent="stretch"
                fontSize="md"
              >
                {preview ? (
                  <iframe
                    title={props.attributes.title}
                    src={preview}
                    loading="lazy"
                    sandbox="allow-forms allow-modals allow-popups allow-scripts"
                    style={{
                      border: 0,
                      display: 'block',
                      height,
                      width: '100%',
                    }}
                  />
                ) : (
                  <Box p="8">
                    <Text color="fg.muted">Preview unavailable.</Text>
                  </Box>
                )}
              </Stack>
            </Resizer>
          ) : (
            <Box pos="relative" minH="400px">
              {code.length ? (
                <CodeTabs code={code} />
              ) : loading ? (
                <LoadingOverlay.Root
                  position="absolute"
                  inset="0"
                  bg="currentBg/50"
                >
                  <LoadingOverlay.Spinner />
                </LoadingOverlay.Root>
              ) : error ? (
                <Box p="8">
                  <Text color="fg.muted">
                    Source is unavailable. Sign in with a Pro entitlement to
                    view this block&apos;s code.
                  </Text>
                </Box>
              ) : null}
            </Box>
          )}
        </Card.Body>
      </Card.Root>
    </Box>
  )
}
