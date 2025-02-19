import * as React from 'react'

import { HoverCard } from '@chakra-ui/react/hover-card'
import { Portal } from '@chakra-ui/react/portal'

interface ContentProps extends HoverCard.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  function HoverCardContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <HoverCard.Positioner>
          <HoverCard.Content ref={ref} {...rest} />
        </HoverCard.Positioner>
      </Portal>
    )
  },
)

export const Arrow = React.forwardRef<HTMLDivElement, HoverCard.ArrowProps>(
  function HoverCardArrow(props, ref) {
    return (
      <HoverCard.Arrow ref={ref} {...props}>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
    )
  },
)

export const Root = HoverCard.Root
export const Trigger = HoverCard.Trigger
