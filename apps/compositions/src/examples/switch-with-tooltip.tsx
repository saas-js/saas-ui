'use client';
import { useId } from 'react'

import { Switch } from 'compositions/ui/switch'
import { Tooltip } from 'compositions/ui/tooltip'

export const SwitchWithTooltip = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is a tooltip">
      <Switch ids={{ root: id }}>Switch with tooltip </Switch>
    </Tooltip>
  )
}
