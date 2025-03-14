'use client'

import { useId } from 'react'

import { Avatar, Tooltip } from '@saas-ui/react'

export const TooltipWithAvatar = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="Segun Adebayo is online">
      <Avatar
        ids={{ root: id }}
        name="Segun Adebayo"
        src="https://bit.ly/sage-adebayo"
      />
    </Tooltip>
  )
}
