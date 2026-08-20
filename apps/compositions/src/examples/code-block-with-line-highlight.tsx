'use client'

import { CodeBlock, createShikiAdapter } from '@chakra-ui/react'
import type { HighlighterGeneric } from 'shiki'

const file = {
  code: `const config = {
  name: "saas-ui",
  version: "3.0.0",
  private: true,
}`,
  language: 'tsx',
  title: 'config.ts',
}

export const CodeBlockWithLineHighlight = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        code={file.code}
        language={file.language}
        meta={{ highlightLines: [2, 3] }}
      >
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import('shiki')
    return createHighlighter({
      langs: ['tsx'],
      themes: ['github-dark'],
    })
  },
  theme: 'github-dark',
})
