'use client'

import { CodeBlock } from '@chakra-ui/react'

const file = {
  code: `<div class="container">
  <h1>Hello, world!</h1>
</div>`,
  language: 'html',
  title: 'index.html',
}

export const CodeBlockBasic = () => {
  return (
    <CodeBlock.Root code={file.code} language={file.language}>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}
