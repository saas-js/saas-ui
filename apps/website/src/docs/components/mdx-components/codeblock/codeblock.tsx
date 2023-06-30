import { Box, useBoolean, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import prismTheme from 'prism-react-renderer/themes/shadesOfPurple'
import React, { useEffect } from 'react'
import CodeContainer from './code-container'
import CopyButton from './copy-button'
import Highlight from './highlight'

const ReactLiveBlock = dynamic(() => import('./react-live-block'))

function CodeBlock(props) {
  const [isMounted, { on }] = useBoolean()
  useEffect(
    /**
     * Lazily-load <ReactLiveBlock /> to save bundle size.
     */
    on,
    [on]
  )
  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewlines,
    ln,
    mountStylesheet = false,
    height,
    overflow,
    center,
  } = props.children.props

  const _live = live === 'true' || live === true

  const language = className?.replace(/language-/, '')
  const rawCode = children.trim()

  const theme = {
    ...prismTheme,
    plain: {
      backgroundColor: 'codeBackground',
      color: prismTheme.plain.color,
    },
  }

  const reactLiveBlockProps = {
    rawCode,
    language,
    theme,
    noInline: manual,
    mountStylesheet,
    height,
    overflow,
    center,
  }

  if (isMounted && language === 'jsx' && _live === true) {
    return <ReactLiveBlock editable {...reactLiveBlockProps} />
  }

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0" overflow="hidden" bg={theme.plain.backgroundColor}>
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      <CopyButton top="4" code={rawCode} />
    </Box>
  )
}

export default CodeBlock
