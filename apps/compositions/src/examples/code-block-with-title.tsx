'use client'

import { CodeBlock, Icon } from '@chakra-ui/react'
import { FaHtml5 } from 'react-icons/fa'

const file = {
  code: `<div class="container">
  <h1>Hello, world!</h1>
</div>`,
  language: 'html',
  title: 'index.html',
}

export const CodeBlockWithTitle = () => {
  return (
    <CodeBlock.Root code={file.code} language={file.language}>
      <CodeBlock.Header>
        <CodeBlock.Title>
          <Icon as={FaHtml5} color="orange.400" />
          {file.title}
        </CodeBlock.Title>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}
