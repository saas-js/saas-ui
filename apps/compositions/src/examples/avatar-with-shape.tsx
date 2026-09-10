import { HStack } from '@chakra-ui/react'
import { Avatar } from 'compositions/ui/avatar'

export const AvatarWithShape = () => {
  return (
    <HStack gap="4">
      <Avatar
        name="David Wilson"
        src="/img/avatars/1.png"
        shape="square"
        size="lg"
      />
      <Avatar
        name="Marcus Chen"
        src="/avatars/2.png"
        shape="rounded"
        size="lg"
      />
      <Avatar
        name="Sarah Johnson"
        src="/avatars/3.png"
        shape="full"
        size="lg"
      />
    </HStack>
  )
}
