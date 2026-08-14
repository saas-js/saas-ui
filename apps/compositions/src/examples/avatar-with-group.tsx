import { Avatar, AvatarGroup } from 'compositions/ui/avatar'

export const AvatarWithGroup = () => {
  return (
    <AvatarGroup size="lg">
      <Avatar src="/img/avatars/1.png" name="David Wilson" />
      <Avatar src="/avatars/2.png" name="Marcus Chen" />
      <Avatar src="/avatars/3.png" name="Sarah Johnson" />
      <Avatar variant="solid" fallback="+3" />
    </AvatarGroup>
  )
}
