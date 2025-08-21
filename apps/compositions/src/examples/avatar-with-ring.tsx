import { HStack, defineStyle } from '@saas-ui/react'
import { Avatar } from '@saas-ui/react'

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'colorPalette.500',
  outlineOffset: '2px',
  outlineStyle: 'solid',
})

export const AvatarWithRing = () => {
  return (
    <HStack gap="4">
      <Avatar
        name="David Wilson"
        colorPalette="pink"
        src="/avatars/1.png"
        css={ringCss}
      />
      <Avatar
        name="Marcus Chen"
        colorPalette="green"
        src="/avatars/2.png"
        css={ringCss}
      />
      <Avatar
        name="Sarah Johnson"
        colorPalette="blue"
        src="/avatars/3.png"
        css={ringCss}
      />
    </HStack>
  )
}
