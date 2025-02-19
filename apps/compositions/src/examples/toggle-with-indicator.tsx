import { Toggle, ToggleIndicator } from '@saas-ui/react'
import { LuVolume2, LuVolumeX } from 'react-icons/lu'

export const ToggleWithIndicator = () => {
  return (
    <Toggle variant="solid">
      <ToggleIndicator fallback={<LuVolume2 />}>
        <LuVolumeX />
      </ToggleIndicator>
      <ToggleIndicator fallback="Mute">Unmute</ToggleIndicator>
    </Toggle>
  )
}
