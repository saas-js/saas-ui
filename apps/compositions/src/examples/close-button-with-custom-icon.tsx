'use client'

import { CloseButton } from 'compositions/ui/close-button'
import { RiCloseLine } from 'react-icons/ri'

export const CloseButtonWithCustomIcon = () => {
  return (
    <CloseButton variant="ghost">
      <RiCloseLine />
    </CloseButton>
  )
}
