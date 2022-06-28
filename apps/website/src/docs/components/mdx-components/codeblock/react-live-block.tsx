// doesn't support React 17 yet

import { Box, BoxProps, chakra } from '@chakra-ui/react'
import { FeaturesOptions, FeaturesProvider } from '@saas-ui/features'
import React, { useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import CodeContainer from './code-container'
import CopyButton from './copy-button'
import scope from './react-live-scope'
import { liveEditorStyle, liveErrorStyle } from './styles'
// import { t } from 'utils/i18n'

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

function ReactLiveBlock({ editable, rawCode, theme, ...rest }) {
  const [editorCode, setEditorCode] = useState(rawCode.trim())
  const onChange = (newCode) => setEditorCode(newCode.trim())
  const liveProviderProps = {
    code: editorCode,
    scope,
    theme,
    ...rest,
  }
  return (
    <FeaturesProvider value={features}>
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview zIndex="1" />
        <Box position="relative" zIndex="0">
          {editable && (
            <CodeContainer bg={theme.plain.backgroundColor}>
              <LiveEditor onChange={onChange} style={liveEditorStyle} />
            </CodeContainer>
          )}
          <CopyButton code={editorCode} />
          {editable && <EditableNotice bg={theme.plain.backgroundColor} />}
        </Box>
        {editable && <LiveError style={liveErrorStyle} />}
      </LiveProvider>
    </FeaturesProvider>
  )
}

export default ReactLiveBlock
