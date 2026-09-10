'use client'

import { forwardRef } from 'react'

import { Portal } from '@chakra-ui/react/portal'
import { Tooltip as ChakraTooltip } from '@chakra-ui/react/tooltip'
import type { TooltipVariantProps } from '@saas-ui/chakra-preset/slot-recipes/tooltip'

type ChakraTooltipRootPropsWithoutPresetVariants = Omit<
  ChakraTooltip.RootProps,
  keyof TooltipVariantProps
>

export interface TooltipProps
  extends ChakraTooltipRootPropsWithoutPresetVariants, TooltipVariantProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

    if (disabled) return children

    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
