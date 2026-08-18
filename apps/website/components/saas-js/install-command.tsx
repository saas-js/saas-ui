'use client'

import { CopyButton } from '#components/copy-button'
import { Box, HStack, Text } from '@chakra-ui/react'

export function InstallCommand({
  command,
  size = 'md',
}: {
  command: string
  size?: 'sm' | 'md'
}) {
  return (
    <HStack
      gap="2"
      px={size === 'sm' ? '2.5' : '3'}
      py={size === 'sm' ? '1.5' : '2'}
      borderWidth="1px"
      borderColor="border"
      bg="bg"
      maxW="full"
      onClick={(event) => event.preventDefault()}
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
      <Box flexShrink="0" ms="auto">
        <CopyButton value={command} size="xs" variant="ghost" aria-label="Copy install command" />
      </Box>
    </HStack>
  )
}
