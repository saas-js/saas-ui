import { HStack } from '@saas-ui/react'
import { Avatar } from '@saas-ui/react'

export const AvatarWithVariants = () => {
  return (
    <HStack gap="3">
      <Avatar variant="solid" name="David Wilson" />
      <Avatar variant="outline" name="David Wilson" />
      <Avatar variant="subtle" name="David Wilson" />
    </HStack>
  )
}
