'use client'

import { useId } from 'react'

import { Checkbox, Tooltip } from '@saas-ui/react'

export const TooltipWithCheckbox = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is the tooltip content">
      <Checkbox ids={{ root: id }}>Welcome</Checkbox>
    </Tooltip>
  )
}
