import { HStack } from '@chakra-ui/react'
import { Avatar } from '@saas-ui/react'

export const AvatarWithSizes = () => {
  return (
    <HStack gap="3">
      <Avatar size="xs" name="David Wilson" src="/avatars/1.png" />
      <Avatar size="sm" name="David Wilson" src="/avatars/1.png" />
      <Avatar size="md" name="David Wilson" src="/avatars/1.png" />
      <Avatar size="lg" name="David Wilson" src="/avatars/1.png" />
      <Avatar size="xl" name="David Wilson" src="/avatars/1.png" />
      <Avatar size="2xl" name="David Wilson" src="/avatars/1.png" />
    </HStack>
  )
}
