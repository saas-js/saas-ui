import * as React from 'react'

import { Popover } from '#components/popover'

export interface ToggleTipProps extends Popover.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content?: React.ReactNode
}

export const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const {
      showArrow,
      children,
      portalled = true,
      content,
      portalRef,
      ...rest
    } = props

    return (
      <Popover.Root {...rest} positioning={{ ...rest.positioning, gutter: 4 }}>
        <Popover.Trigger asChild>{children}</Popover.Trigger>

        <Popover.Content
          width="auto"
          px="2"
          py="1"
          textStyle="xs"
          rounded="sm"
          portalled={portalled}
          ref={ref}
        >
          {showArrow && <Popover.Arrow />}
          {content}
        </Popover.Content>
      </Popover.Root>
    )
  },
)
