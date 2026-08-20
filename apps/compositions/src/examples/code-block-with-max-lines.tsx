'use client'

import { CodeBlock, IconButton } from '@chakra-ui/react'

const file = {
  code: `{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A simple web application",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "next dev",
    "build": "next build",
    "test": "vitest"
  },
  "dependencies": {
    "@chakra-ui/react": "^3.36.1",
    "@saas-ui/react": "^3.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "author": "Developer",
  "license": "MIT"
}`,
  language: 'json',
  title: 'package.json',
}

export const CodeBlockWithMaxLines = () => {
  return (
    <CodeBlock.Root code={file.code} language={file.language} maxLines={10}>
      <CodeBlock.Header>
        <CodeBlock.Title>{file.title}</CodeBlock.Title>
        <CodeBlock.Control>
          <CodeBlock.CollapseTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CollapseIndicator />
            </IconButton>
          </CodeBlock.CollapseTrigger>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </CodeBlock.Control>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>

        <CodeBlock.Overlay>
          <CodeBlock.CollapseTrigger>
            <CodeBlock.CollapseText textStyle="sm" />
          </CodeBlock.CollapseTrigger>
        </CodeBlock.Overlay>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}
