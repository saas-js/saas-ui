import * as React from 'react'

import { IconButton } from '../icon-button/index.ts'
import { InfoIcon } from '../icons/index.ts'
import { ToggleTip, type ToggleTipProps } from '../toggle-tip/index.ts'

export interface InfoTipProps extends Omit<ToggleTipProps, 'content'> {
  children: React.ReactNode
  icon?: React.ReactNode
  'aria-label'?: string
}

export const InfoTip = React.forwardRef<HTMLDivElement, InfoTipProps>(
  function InfoTip(props, ref) {
    const { children, icon, 'aria-label': ariaLabel = 'Info', ...rest } = props
    return (
      <ToggleTip content={children} {...rest} ref={ref}>
        <IconButton variant="ghost" aria-label={ariaLabel} size="2xs">
          {icon ?? <InfoIcon />}
        </IconButton>
      </ToggleTip>
    )
  },
)
