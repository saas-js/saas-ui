'use client'

import { forwardRef } from 'react'

import { type ButtonProps, IconButton } from '@chakra-ui/react'

import { ArrowLeftIcon } from '../icons/icons.tsx'
import { Link } from '../link/index.ts'

export interface BackButtonProps extends ButtonProps {
  'aria-label'?: string
  href?: string
  children?: React.ReactNode
}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  (props, ref) => {
    const { href, variant = 'ghost', mr = 2, children, ...rest } = props

    let content = children || <ArrowLeftIcon />
    if (href) {
      content = <Link href={href}>{content}</Link>
    }

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
