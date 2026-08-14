'use client'

import { forwardRef } from 'react'

import { CloseIcon } from '../../icons/close-icon'
import { IconButton, type IconButtonProps } from '../icon-button/index'

export interface CloseButtonProps extends IconButtonProps {}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <IconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
        {props.children ?? <CloseIcon />}
      </IconButton>
    )
  },
)
