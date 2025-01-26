import { ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda/jsx'
import { badge } from '@saas-ui/panda/recipes'
import { ComponentProps, forwardRef } from 'react'

const StyledBadge = styled(ark.span, badge)

export interface BadgeProps extends ComponentProps<typeof StyledBadge> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    return <StyledBadge ref={ref} colorPalette={'gray'} {...props} />
  }
)
