'use client'

import { Clipboard } from '@ark-ui/react/clipboard'
import { Box, Text, chakra } from '@chakra-ui/react'
import { LuCheck, LuClipboard } from 'react-icons/lu'

export function InstallCommand({
  command,
  size = 'md',
}: {
  command: string
  size?: 'sm' | 'md'
}) {
  return (
    <Clipboard.Root value={command}>
      <Clipboard.Trigger asChild>
        <chakra.button
          type="button"
          bg="transparent"
          cursor="pointer"
          display="flex"
          alignItems="center"
          textAlign="start"
          gap="2"
          px={size === 'sm' ? '2.5' : '3'}
          py={size === 'sm' ? '1.5' : '2'}
          borderWidth="1px"
          borderColor="border"
          borderRadius="control.md"
          maxW="full"
          width="full"
          aria-label="Copy install command"
          _hover={{ borderColor: 'border.emphasized' }}
          onClick={(event) => event.stopPropagation()}
        >
          <Text
            as="code"
            fontFamily="mono"
            textStyle={size === 'sm' ? 'xs' : 'sm'}
            color="fg"
            truncate
          >
            {command}
          </Text>
          <Box flexShrink="0" ms="auto" display="inline-flex">
            <Clipboard.Indicator copied={<LuCheck />}>
              <LuClipboard />
            </Clipboard.Indicator>
          </Box>
        </chakra.button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
