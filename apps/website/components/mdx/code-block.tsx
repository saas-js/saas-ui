'use client'

import { CopyButton } from '@/components/copy-button'
import { Box, HStack, Spacer, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import type { CodeLang } from './code-lang-icon'
import { CodeLangIcon } from './code-lang-icon'

interface CodeBlockProps {
  title?: string
  lang?: CodeLang
  children: React.ReactNode
  [key: string]: any
}

export const CodeBlock = (props: CodeBlockProps) => {
  const { title, lang, children, ...rest } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(rootRef.current?.querySelector('pre')?.textContent ?? '')
  }, [children])

  return (
    <Box
      ref={rootRef}
      {...rest}
      data-lang={lang}
      spaceY="0!"
      marginY="1.6em"
      borderWidth="1px"
      rounded="10px"
      borderColor="border"
      css={{
        '& pre.shiki': {
          roundedTop: '0!',
          roundedBottom: 'lg!',
          shadow: 'none!',
        },
      }}
    >
      <HStack
        bg="bg.subtle"
        px="4"
        py="2"
        color="fg.muted"
        roundedTop="lg"
        borderBottomWidth="1px"
        borderBottomColor="border"
      >
        {lang && <CodeLangIcon type={lang} />}
        <Text fontSize="xs" fontFamily="mono" fontWeight="semibold">
          {title}
        </Text>
        <Spacer />
        {value ? (
          <CopyButton
            value={value}
            size="xs"
            color="fg.muted"
            _hover={{ bg: 'bg.emphasized' }}
          />
        ) : null}
      </HStack>
      {children}
    </Box>
  )
}
