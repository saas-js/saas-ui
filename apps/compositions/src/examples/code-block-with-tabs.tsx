'use client'

import {
  CodeBlock,
  IconButton,
  Tabs,
  createShikiAdapter,
  useTabs,
} from '@chakra-ui/react'
import type { HighlighterGeneric } from 'shiki'

const files = [
  {
    value: 'npm',
    title: 'npm',
    language: 'bash',
    code: 'npm install @saas-ui/react',
  },
  {
    value: 'pnpm',
    title: 'pnpm',
    language: 'bash',
    code: 'pnpm add @saas-ui/react',
  },
  {
    value: 'yarn',
    title: 'yarn',
    language: 'bash',
    code: 'yarn add @saas-ui/react',
  },
]

export const CodeBlockWithTabs = () => {
  const tabs = useTabs({
    defaultValue: files[0].value,
  })

  const activeTab = files.find((file) => file.value === tabs.value) ?? files[0]

  const otherTabs = files.filter((file) => file.value !== activeTab.value)

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <Tabs.RootProvider value={tabs} size="sm" variant="line">
        <CodeBlock.Root code={activeTab.code} language={activeTab.language}>
          <CodeBlock.Header borderBottomWidth="1px">
            <Tabs.List w="full" border="0" ms="-1">
              {files.map((file) => (
                <Tabs.Trigger
                  key={file.value}
                  value={file.value}
                  textStyle="xs"
                >
                  {file.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </CodeBlock.Header>
          <CodeBlock.Content>
            {otherTabs.map((file) => (
              <Tabs.Content key={file.value} value={file.value} />
            ))}
            <Tabs.Content pt="1" value={activeTab.value}>
              <CodeBlock.Code>
                <CodeBlock.CodeText />
              </CodeBlock.Code>
            </Tabs.Content>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </Tabs.RootProvider>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import('shiki')
    return createHighlighter({
      langs: ['bash'],
      themes: ['github-dark'],
    })
  },
  theme: 'github-dark',
})
