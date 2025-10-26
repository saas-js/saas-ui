'use client'

import { forwardRef } from 'react'

import { type ButtonProps, IconButton } from '@chakra-ui/react'

import { ArrowLeftIcon } from '#registry/default/icons'

export interface BackButtonProps extends ButtonProps {
  'aria-label'?: string
  children?: React.ReactNode
}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  (props, ref) => {
    const { variant = 'ghost', mr = 2, children, ...rest } = props

    let content = children || <ArrowLeftIcon />

    return (
      <IconButton
        ref={ref}
        aria-label="Go back"
        variant={variant}
        mr={mr}
        {...rest}
      >
        {content}
      </IconButton>
    )
  },
)
