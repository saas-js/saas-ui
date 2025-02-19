import { CloseButton } from '@saas-ui/react'
import { RiCloseLine } from 'react-icons/ri'

export const CloseButtonWithCustomIcon = () => {
  return (
    <CloseButton variant="ghost">
      <RiCloseLine />
    </CloseButton>
  )
}
