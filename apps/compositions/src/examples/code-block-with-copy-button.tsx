'use client'

import { CodeBlock, IconButton } from '@chakra-ui/react'

const file = {
  code: `<div class="container">
  <h1>Hello, world!</h1>
</div>`,
  language: 'html',
  title: 'index.html',
}

export const CodeBlockWithCopyButton = () => {
  return (
    <CodeBlock.Root code={file.code} language={file.language}>
      <CodeBlock.Header>
        <CodeBlock.Title>{file.title}</CodeBlock.Title>
        <CodeBlock.CopyTrigger asChild>
          <IconButton variant="ghost" size="2xs">
            <CodeBlock.CopyIndicator />
          </IconButton>
        </CodeBlock.CopyTrigger>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}
