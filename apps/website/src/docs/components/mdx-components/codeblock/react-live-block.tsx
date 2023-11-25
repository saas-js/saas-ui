// doesn't support React 17 yet

import { Box, BoxProps, chakra } from '@chakra-ui/react'
import { FeaturesOptions, FeaturesProvider } from '@saas-ui-pro/feature-flags'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-runner'
import CodeContainer from './code-container'
import CopyButton from './copy-button'
import scope from './react-live-scope'
import { liveEditorStyle, liveErrorStyle } from './styles'
import { useEffect, useRef, useState } from 'react'
import { Splitter } from '@ark-ui/react'
import Frame from 'react-frame-component'
import { FrameProvider } from './frame-provider'

const features: FeaturesOptions = {
  segments: [
    {
      id: 'admin',
      attr: [
        {
          key: 'role',
          value: 'admin',
        },
      ],
      features: ['settings', { id: 'value-feature', value: 'enabled' }],
    },
    {
      id: 'proPlan',
      attr: [
        {
          key: 'plan',
          value: 'pro',
        },
      ],
      features: ['inbox'],
    },
  ],
}

const LiveCodePreview = chakra(LivePreview, {})

const LiveCodePreviewWrapper = (props: BoxProps) => {
  return (
    <Box
      fontFamily="body"
      mt={5}
      borderWidth="1px"
      borderRadius="12px"
      fontSize="md"
      overflow="hidden"
      {...props}
    >
      {props.children}
    </Box>
  )
}

const EditableNotice = (props: BoxProps) => {
  return (
    <Box
      position="absolute"
      width="full"
      top="-1.25em"
      roundedTop="8px"
      bg="#2a2734"
      py="2"
      zIndex="0"
      letterSpacing="wide"
      color="gray.400"
      fontSize="xs"
      fontWeight="semibold"
      textAlign="center"
      textTransform="uppercase"
      pointerEvents="none"
      {...props}
    >
      Live edit
    </Box>
  )
}

const ViewAll = (props: BoxProps) => {
  return (
    <Box
      position="absolute"
      width="full"
      bottom="-1.25em"
      roundedTop="8px"
      bg="#2a2734"
      py="2"
      zIndex="0"
      letterSpacing="wide"
      color="gray.400"
      fontSize="xs"
      fontWeight="semibold"
      textAlign="center"
      textTransform="uppercase"
      pointerEvents="none"
      cursor="pointer"
      {...props}
    >
      View all
    </Box>
  )
}

function ReactLiveBlock({
  editable,
  rawCode,
  theme,
  height,
  inline,
  overflow,
  overflowY,
  center,
  padding = 4,
  ...rest
}) {
  const [editorCode, setEditorCode] = useState(rawCode.trim())
  const onChange = (newCode) => setEditorCode(newCode.trim())

  const [frameHeight, setFrameHeight] = useState<string | undefined>()

  const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null)

  const liveProviderProps = {
    code: editorCode,
    scope,
    theme,
    ...rest,
  }

  let sx: object = {
    overflow,
    overflowY,
    padding,
  }

  if (center) {
    sx = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...sx,
    }
  }

  const [isResizing, setResizing] = useState(false)

  useEffect(() => {
    if (frameRef && !inline) {
      setInterval(() => {
        const height = frameRef.contentWindow?.document.body.scrollHeight ?? 240
        setFrameHeight(height + 'px')
      }, 500)
    }
  }, [frameRef, inline])

  const frame = inline ? (
    <LiveCodePreview fontSize="md" sx={sx} minH="200px" />
  ) : (
    <Frame ref={(ref) => setFrameRef(ref)} width="100%" height="100%">
      <FrameProvider>
        <LiveCodePreview fontSize="md" sx={sx} minHeight="$100vh" />
      </FrameProvider>
    </Frame>
  )

  return (
    <FeaturesProvider value={features}>
      <LiveProvider {...liveProviderProps}>
        <Box
          as={Splitter.Root}
          display="flex"
          alignItems="center"
          defaultSize={[
            { id: 'a', size: 100, minSize: 40 },
            { id: 'b', size: 0 },
          ]}
          onSizeChangeStart={() => setResizing(true)}
          onSizeChangeEnd={() => setResizing(false)}
        >
          <Splitter.Panel id="a">
            <LiveCodePreviewWrapper
              pointerEvents={isResizing ? 'none' : undefined}
              height={height || frameHeight}
              boxSizing="content-box"
            >
              {frame}
            </LiveCodePreviewWrapper>
          </Splitter.Panel>
          <Box
            as={Splitter.ResizeTrigger}
            id="a:b"
            width="4px"
            bg="muted"
            mx="2"
            height="80px"
            rounded="full"
            _hover={{
              bg: 'primary.500',
            }}
            _focus={{
              outline: 'none',
              bg: 'primary.500',
            }}
          />
          <Splitter.Panel id="b"></Splitter.Panel>
        </Box>
        {editable && <LiveError style={liveErrorStyle} />}
        <Box position="relative" zIndex="0">
          {editable && (
            <CodeContainer
              bg={theme.plain.backgroundColor}
              sx={{
                maxHeight: '400px',
                textarea: {
                  _focus: {
                    outline: 'none',
                  },
                },
              }}
              overflow="auto"
            >
              <LiveEditor style={liveEditorStyle} />
            </CodeContainer>
          )}
          <CopyButton code={editorCode} />
          {editable && <EditableNotice bg={theme.plain.backgroundColor} />}
        </Box>
      </LiveProvider>
    </FeaturesProvider>
  )
}

export default ReactLiveBlock
