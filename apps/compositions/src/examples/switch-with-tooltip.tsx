'use client'

import { useId } from 'react'

import { Switch, Tooltip } from '@saas-ui/react'

export const SwitchWithTooltip = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is a tooltip">
      <Switch ids={{ root: id }}>Switch with tooltip </Switch>
    </Tooltip>
  )
}
