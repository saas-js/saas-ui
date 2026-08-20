'use client'

import { CodeBlock, IconButton } from '@chakra-ui/react'

const file = {
  code: `const greeting = "Hello, World! I am a long line of text that will wrap to the next line."

function sayHello() {
  console.log(greeting)
}

sayHello()`,
  language: 'tsx',
  title: 'index.tsx',
}

export const CodeBlockWithWordWrap = () => {
  return (
    <CodeBlock.Root
      maxW="md"
      code={file.code}
      language={file.language}
      meta={{ wordWrap: true }}
    >
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
