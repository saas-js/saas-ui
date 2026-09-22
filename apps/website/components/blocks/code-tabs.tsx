'use client'

import { useState } from 'react'

import { CopyButton } from '@/components/copy-button'
import { Box, Spacer, Tabs } from '@chakra-ui/react'

export type BlockCodeFile = {
  fileName: string
  language: string
  code: string
  highlighted?: string
}

export const CodeTabs = (props: { code: BlockCodeFile[] }) => {
  const files = props.code
  const [fileName, setFileName] = useState(files[0]?.fileName)
  const current = files.find((file) => file.fileName === fileName) ?? files[0]

  if (!files.length) return null

  return (
    <Tabs.Root
      variant="outline"
      size="sm"
      value={fileName}
      onValueChange={({ value }) => setFileName(value)}
    >
      <Tabs.List
        w="full"
        display="flex"
        alignItems="center"
        px="2"
        pt="2"
        bg="bg.subtle"
        overflow="visible"
      >
        {files.map((file) => (
          <Tabs.Trigger
            key={file.fileName}
            value={file.fileName}
            fontFamily="mono"
            fontSize="xs"
            _selected={{
              bg: 'bg.muted',
              borderBottomColor: 'transparent',
            }}
          >
            {file.fileName}
          </Tabs.Trigger>
        ))}
        <Spacer />
        {current ? (
          <CopyButton
            value={current.code}
            size="xs"
            alignSelf="flex-end"
            mb="1"
            color="fg.muted"
            _hover={{ bg: 'bg.emphasized' }}
            aria-label={`Copy ${current.fileName}`}
          />
        ) : null}
      </Tabs.List>
      <Tabs.ContentGroup>
        {files.map((file) => (
          <Tabs.Content
            key={file.fileName}
            value={file.fileName}
            p="0"
            mt="0!"
            pt="0!"
            bg="bg.muted"
          >
            <Box
              className="code-highlight"
              overflow="auto"
              css={{
                '& pre.shiki': {
                  my: '0',
                  px: '6',
                  py: '5',
                  bg: 'transparent!',
                },
                '& pre.shiki, & pre.shiki span': {
                  bg: 'transparent!',
                },
              }}
              dangerouslySetInnerHTML={{
                __html: file.highlighted ?? file.code,
              }}
            />
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
