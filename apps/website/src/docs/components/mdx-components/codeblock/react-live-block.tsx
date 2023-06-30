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
import { useState } from 'react'

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

const LiveCodePreview = chakra(LivePreview, {
  baseStyle: {
    fontFamily: 'body',
    mt: 5,
    p: 3,
    borderWidth: 1,
    borderRadius: '12px',
    fontSize: 'md',
  },
})

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
  overflow,
  center,
  ...rest
}) {
  const [editorCode, setEditorCode] = useState(rawCode.trim())
  const onChange = (newCode) => setEditorCode(newCode.trim())
  const liveProviderProps = {
    code: editorCode,
    scope,
    theme,
    ...rest,
  }

  let sx: object = {
    overflow,
  }

  if (center) {
    sx = {
      display: 'flex',
      justifyContent: 'center',
      ...sx,
    }
  }

  return (
    <FeaturesProvider value={features}>
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview
          zIndex="1"
          height={height}
          position="relative"
          fontSize="sm"
          sx={sx}
        />
        {editable && <LiveError style={liveErrorStyle} />}
        <Box position="relative" zIndex="0">
          {editable && (
            <CodeContainer
              bg={theme.plain.backgroundColor}
              sx={{
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
