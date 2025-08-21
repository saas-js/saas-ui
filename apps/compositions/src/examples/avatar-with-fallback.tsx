'use client'

import { HStack } from '@saas-ui/react'
import { Avatar } from '@saas-ui/react'

export const AvatarWithFallback = () => {
  return (
    <HStack>
      <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
      <Avatar
        name="Sasuke Uchiha"
        src="https://bit.ly/broken-link"
        colorPalette="teal"
      />
      <Avatar src="https://bit.ly/broken-link" colorPalette="red" />
    </HStack>
  )
}
