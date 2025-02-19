'use client'

import { useId } from 'react'

import { Switch, Tooltip } from '@saas-ui/react'

export const TooltipWithSwitch = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is the tooltip content">
      <Switch ids={{ root: id }} />
    </Tooltip>
  )
}
