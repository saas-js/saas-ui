'use client'

import { forwardRef } from 'react'

import { IconButton, type IconButtonProps } from '@chakra-ui/react'

import { CloseIcon } from '../icons/index.ts'

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
