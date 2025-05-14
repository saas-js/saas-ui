import { HStack } from '@chakra-ui/react'
import { Avatar } from '@saas-ui/react'

export const AvatarWithVariants = () => {
  return (
    <HStack gap="3">
      <Avatar variant="solid" name="Sage Adebayo" />
      <Avatar variant="outline" name="Sage Adebayo" />
      <Avatar variant="subtle" name="Sage Adebayo" />
    </HStack>
  )
}
