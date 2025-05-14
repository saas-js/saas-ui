'use client'

import { HStack, Span } from '@chakra-ui/react'
import { Avatar, Blockquote } from '@saas-ui/react'

export const BlockquoteWithAvatar = () => {
  return (
    <Blockquote
      bg="bg.subtle"
      padding="8"
      cite={
        <HStack mt="2" gap="3">
          <Avatar
            size="sm"
            name="Emily Jones"
            src="https://i.pravatar.cc/150?u=re"
          />
          <Span fontWeight="medium">Emily Jones</Span>
        </HStack>
      }
    >
      If anyone thinks he is something when he is nothing, he deceives himself.
      Each one should test his own actions. Then he can take pride in himself,
      without comparing himself to anyone else.
    </Blockquote>
  )
}
