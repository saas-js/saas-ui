'use client'

import * as React from 'react'

import { InfoIcon } from '../../icons/info-icon'
import { IconButton } from '../icon-button/index'
import { ToggleTip, type ToggleTipProps } from '../toggle-tip/index'

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
