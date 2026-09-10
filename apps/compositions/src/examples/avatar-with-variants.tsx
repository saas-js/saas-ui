import { HStack } from '@chakra-ui/react'
import { Avatar } from 'compositions/ui/avatar'

export const AvatarWithVariants = () => {
  return (
    <HStack gap="3">
      <Avatar variant="solid" name="David Wilson" />
      <Avatar variant="outline" name="David Wilson" />
      <Avatar variant="subtle" name="David Wilson" />
    </HStack>
  )
}
